import { ProcedureItem } from '../ProcedureItem';
import { EnumVariable } from '../Variables/EnumVariable';
import { ScalarVariable } from '../Variables/ScalarVariable';
import { UnboundedParametersList } from '../Signatures/UnboundedParametersList';
import { ProcedureType } from '../../SyntaxAnalyzer/Tree/Types/ProcedureType';
import { TypesIds } from '../../Semantics/Variables/TypesIds';
import { ErrorsCodes } from '../../Errors/ErrorsCodes';
import { ScalarType } from '../../SyntaxAnalyzer/Tree/Types/ScalarType';

export class ReadLn extends ProcedureItem
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

    innerRun(scope, engine)
    {
        let parametersList = scope.getParametersList();

        let parametersTypes = [];
        let parametersTypesIds = [];
        parametersList.forEach(function(parameter) {
            parametersTypesIds.push(engine.evaluateIdentifierBranch(parameter).typeId);
            parametersTypes.push(engine.evaluateIdentifierBranch(parameter).type);
        });

        let words = this.getWords(parametersTypesIds, this.ouputNewLineSymbol);
        let self = this;

        words.forEach(function(word, index) {

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
            engine.setIdentifierBranchValue(parametersList[index], scalarVariable);
        });

        this.outputStream.write(this.ouputNewLineSymbol);
    }

    getWords(parametersTypesIds)
    {
        let words = [];

        let self = this;
        parametersTypesIds.forEach(function(typeId) {
            words.push(self.getWord(typeId));
        });

        return words;
    }

    getWord(typeId)
    {
        let words = [];
        let char = '';
        let currentWord = '';

        switch (typeId) {
            case TypesIds.CHAR:
                if (this.char === null) {
                    currentWord = this.input.getChar();
                } else {
                    currentWord = this.char;
                    this.char = null;
                }
                break;

            case TypesIds.INTEGER:
            case TypesIds.REAL:
                while (this.char === null ||
                        /[\r\n\s\t]/.exec(this.char) !== null) {;
                    this.nextChar();
                }
                do {
                    currentWord += this.char;
                    this.nextChar();
                } while (/[\r\n\s\t]/.exec(this.char) === null);
                break;
            case TypesIds.STRING:
            default:
                if (this.char === null) {
                    this.nextChar();
                }
                while (this.char !== this.ouputNewLineSymbol) {
                    currentWord += this.char;
                    this.nextChar();
                }
                break;
        }

        return currentWord;
    }

    nextChar()
    {
        this.char = this.input.getChar();
    }
};
