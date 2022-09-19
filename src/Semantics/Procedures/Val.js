import { ProcedureItem } from '../ProcedureItem.js';
import { EnumVariable } from '../Variables/EnumVariable.js';
import { ScalarVariable } from '../Variables/ScalarVariable.js';
import { UnboundedParametersList } from '../Signatures/UnboundedParametersList.js';
import { ProcedureType } from '../../SyntaxAnalyzer/Tree/Types/ProcedureType.js';
import { StringType } from '../../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js';
import { IntegerType } from '../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js';
import { NumericType } from '../../SyntaxAnalyzer/Tree/Types/NumericType.js';
import { TypeApplied } from '../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { Identifier } from '../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../LexicalAnalyzer/Symbols/Symbol.js'
import { TypesIds } from '../../Semantics/Variables/TypesIds.js'

export class Val extends ProcedureItem
{
    constructor()
    {
        super('val');
        this.type = new ProcedureType(
            null,
            [   new TypeApplied(
                    null,
                    false,
                    new StringType,
                    [ new Identifier( new Symbol(null, null, 's') ) ]
                ),
                new TypeApplied(
                    null,
                    true,
                    new NumericType,
                    [ new Identifier( new Symbol(null, null, 'v') ) ]
                ),
                new TypeApplied(
                    null,
                    true,
                    new IntegerType,
                    [ new Identifier( new Symbol(null, null, 'code') ) ]
                )
            ]
        );

        this.char = null;
        this.letters = [];
        this.charCounter = 0;
    }

    async innerRun(scope)
    {
        let stringVariable = scope.getVariable('s');
        let valueVariable = scope.getVariable('v');
        let codeVariable = scope.getVariable('code');

        let v = 0;
        let code = 1;
        let signum = 1;

        let char = null;
        let isError = false;

        this.letters = stringVariable.value.split('');
        this.charCounter = 0;
        let currentWord = '';

        let typeId = valueVariable.type.typeId;
        this.char = this.nextCh();
        this.skipWhiteSpaces();

        if (/[+-]/.exec(this.char) !== null) {
            signum = this.char === '-' ? -1 : 1;

            this.char = this.nextCh();
            this.skipWhiteSpaces();
        }

        if (this.char !== null) {
            switch (typeId) {
                case TypesIds.INTEGER:

                    while (/\d/.exec(this.char)) {
                        currentWord += this.char;
                        this.char = this.nextCh();
                    }

                    if (currentWord === '') {
                        isError = true;
                        code = this.charCounter;
                        break;
                    }

                    this.skipWhiteSpaces();

                    if (!isError && this.charCounter === this.letters.length) {
                        v = Number.parseInt(currentWord) * signum;
                        code = 0;
                    } else if (this.charCounter !== this.letters.length) {
                        code = this.charCounter;
                    }

                    break;
                case TypesIds.REAL:
                    let pointPresence = false;
                    while (/[\d\.]/.exec(this.char) !== null) {
                        if (this.char === '.') {
                            if (pointPresence) {
                                isError = true;
                                code = this.charCounter;
                                break;
                            } else {
                                pointPresence = true;
                            }
                        }
                        currentWord += this.char;
                        this.char = this.nextCh();
                    }

                    if (currentWord === '.') {
                        currentWord += '0';
                    } else if (currentWord === '') {
                        isError = true;
                        break;
                    }

                    if (/e/i.exec(this.char)) {
                        currentWord += this.char;
                        this.char = this.nextCh();
                        if (/[\d+-]/.exec(this.char)) {
                            if (/[+-]/.exec(this.char)) {
                                currentWord += this.char;
                                this.char = this.nextCh();
                            }
                            if (/\d/.exec(this.char)) {
                                while (/\d/.exec(this.char)) {
                                    currentWord += this.char;
                                    this.char = this.nextCh();
                                }
                            } else {
                                code = this.charCounter;
                                isError = true;
                                break;
                            }
                        } else {
                            code = this.charCounter;
                            isError = true;
                            break;
                        }

                    }

                    this.skipWhiteSpaces();
                    if (!isError && this.charCounter === this.letters.length) {
                        v = parseFloat(currentWord) * signum;
                        code = 0;
                    } else if (this.charCounter !== this.letters.length) {
                        code = this.charCounter;
                    }

                    break;
            }
        }

        valueVariable.value = v;
        codeVariable.value = code;
    }

    nextCh()
    {
        return this.charCounter < this.letters.length ? this.letters[this.charCounter++] : null;
    }

    skipWhiteSpaces()
    {
        while (this.char !== null && /\s/.exec(this.char) !== null) {
            this.char = this.nextCh();
        }
    }
};