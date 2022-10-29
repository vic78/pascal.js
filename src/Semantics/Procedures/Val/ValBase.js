import { ProcedureItem } from '../../ProcedureItem.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js'

export class ValBase extends ProcedureItem
{
    constructor()
    {
        super('val');

        this.char = null;
        this.letters = [];
        this.charCounter = 0;
        this.code = null;
    }

    async baseRun(scope)
    {
        let stringVariable = scope.getVariable('s');
        let valueVariable = scope.getVariable('v');

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
        this.code = code;
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