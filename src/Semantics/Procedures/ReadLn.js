import { ProcedureItem } from '../ProcedureItem';
import { EnumVariable } from '../Variables/EnumVariable';
import { ScalarVariable } from '../Variables/ScalarVariable';
import { UnboundedParametersList } from '../Signatures/UnboundedParametersList';
import { ProcedureType } from '../../SyntaxAnalyzer/Tree/Types/ProcedureType';
import { TypesIds } from '../../Semantics/Variables/TypesIds';

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
        parametersList.forEach(function(parameter) {
            parametersTypes.push(engine.evaluateIdentifierBranch(parameter).typeId);
        });

        let words = this.getWords(parametersTypes, this.ouputNewLineSymbol);

        words.forEach(function(word, index) {
            let scalarVariable = new ScalarVariable(word, parametersTypes[index]);
            engine.setIdentifierBranchValue(parametersList[index], scalarVariable);
        });

        this.outputStream.write(this.ouputNewLineSymbol);
    }

    getWords(parametersTypes)
    {
        let words = [];

        let self = this;
        parametersTypes.forEach(function(typeId) {
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
