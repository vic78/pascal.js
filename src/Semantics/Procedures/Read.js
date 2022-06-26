import { ProcedureItem } from '../ProcedureItem.js';
import { EnumVariable } from '../Variables/EnumVariable.js';
import { ScalarVariable } from '../Variables/ScalarVariable.js';
import { UnboundedParametersList } from '../Signatures/UnboundedParametersList.js';
import { ProcedureType } from '../../SyntaxAnalyzer/Tree/Types/ProcedureType.js';
import { TypesIds } from '../../Semantics/Variables/TypesIds.js';
import { ErrorsCodes } from '../../Errors/ErrorsCodes.js';
import { ScalarType } from '../../SyntaxAnalyzer/Tree/Types/ScalarType.js';

export class Read extends ProcedureItem
{
    constructor(input, outputStream, ouputNewLineSymbol)
    {
        super();
        this.input = input;
        this.outputStream = outputStream;
        this.ouputNewLineSymbol = ouputNewLineSymbol;
        this.type = new ProcedureType(null, new UnboundedParametersList(true), null);
        this.char = null;
    }

    async innerRun(scope, engine)
    {
        let parametersList = scope.getParametersList();
        let parametersTypes = [];
        let parametersTypesIds = [];

        await parametersList.forEach(async function(parameter) {
            let evaluatedParameter = await engine.evaluateIdentifierBranch(parameter);
            parametersTypesIds.push(evaluatedParameter.typeId);
            parametersTypes.push(evaluatedParameter.type);
        });

        let words = await this.getWords(parametersTypesIds, this.ouputNewLineSymbol);
        let self = this;
        await words.forEach(async function(word, index) {
            let value = null;
            switch (parametersTypesIds[index]) {
                case TypesIds.INTEGER:
                    value = Number.parseInt(word);
                    if (isNaN(value)) {
                        scope.addError(ErrorsCodes.typesMismatch, `Integer value expected, but '${word}' found.`, parametersList[index]);
                    }
                    break;
                case TypesIds.REAL:
                    value = parseFloat(word);
                    if (isNaN(value)) {
                        scope.addError(ErrorsCodes.typesMismatch, `Float value expected, but '${word}' found.`, parametersList[index]);
                    }
                    break;
                case TypesIds.CHAR:
                case TypesIds.STRING:
                    value = word;
                    break;
                default:
                    let type = parametersTypes[index];
                    if (!type) {
                        type = new ScalarType(null, parametersTypesIds[index]);
                    }
                    scope.addError(ErrorsCodes.typesMismatch, `Cannot input value of this type: ${type}`, parametersList[index]);
            }
            let scalarVariable = new ScalarVariable(value, parametersTypesIds[index]);

            await engine.setIdentifierBranchValue(parametersList[index], scalarVariable);
        });
    }

    async getWords(parametersTypesIds)
    {
        let words = [];

        for (let i = 0; i < parametersTypesIds.length; i++) {
            let res  = await this.getWord(parametersTypesIds[0]);
            words[i] = res;
        }

        return words;
    }

    async getWord(typeId)
    {
        let currentWord = '';

        switch (typeId) {
            case TypesIds.CHAR:
                if (this.char === null) {
                    currentWord = await this.input.getChar();
                } else {
                    currentWord = this.char;
                    this.char = null;
                }
                break;

            case TypesIds.INTEGER:
            case TypesIds.REAL:
                while (this.char === null ||
                        /[\r\n\s\t]/.exec(this.char) !== null) {
                    await this.nextChar();
                }
                do {
                    currentWord += this.char;
                    await this.nextChar();
                } while (/[\r\n\s\t]/.exec(this.char) === null);
                break;
            case TypesIds.STRING:
            default:
                if (this.char === null) {
                    await this.nextChar();
                }
                while (this.char !== this.ouputNewLineSymbol) {
                    currentWord += this.char;
                    await this.nextChar();
                }
                break;
        }

        return currentWord;
    }

    async nextChar()
    {
        let charPr = await this.input.getChar();

        this.char =  charPr;
    }
};
