import { SymbolsCodes } from './SymbolsCodes.js';
import { KeyWords } from './KeyWords.js';
import { Symbol } from './Symbols/Symbol.js';
import { NmbFloat } from './Symbols/NmbFloat.js';
import { NmbInt } from './Symbols/NmbInt.js';
import { OneSymbol } from './Symbols/OneSymbol.js';
import { StringConstant } from './Symbols/StringConstant.js';
import { BoolConstant } from './Symbols/BoolConstant.js';
import { ErrorsCodes } from '../Errors/ErrorsCodes.js';

export class LexicalAnalyzer
{
    constructor(fileIO)
    {
        this.fileIO = fileIO;
        this.errorsCodes = ErrorsCodes;

        this.token = null;
        this.currentWord = null;
        this.char = ' ';
        this.symbol = null;

        this.MAX_IDENT = 64;
        this.keyWords = new KeyWords();
        this.wordBuffer = null;
    }

    nextSym()
    {
        if (this.char === null) {
            return null;
        }

        this.skipWhiteSpaces();
        this.token = this.fileIO.getCurrentPosition();

        return this.scanSymbol();
    }

    scanSymbol()
    {
        if (this.char === null) {
            return null;
        }

        if (this.wordBuffer === null) {
            this.currentWord = '';
        } else {
            this.currentWord = this.wordBuffer;
            this.wordBuffer = null;
        }

        // <letter>
        if (/[a-z]/i.exec(this.char) !== null) {

            while (/\w/i.exec(this.char) !== null) {
                this.currentWord += this.char;
                this.char = this.fileIO.nextCh();
            }

            return this.getSymbol(this.keyWords.getSymbolCodeByKeyWord(this.currentWord));

        // <digit>
        } else if (/[\d.]/.exec(this.char) !== null) {

            this.currentWord += this.char;
            this.char = this.fileIO.nextCh();

            if (this.currentWord === '..') {
                this.symbol = SymbolsCodes.twoPoints;
                return this.getSymbol(this.symbol);
            } else if (this.currentWord === '.' && this.char === '.') {

                this.currentWord += this.char;
                this.char = this.fileIO.nextCh();
                return this.getSymbol(SymbolsCodes.twoPoints);

            } else if (this.currentWord === '.' && /\d/.exec(this.char) === null) {

                this.symbol = SymbolsCodes.point;
                return this.getSymbol(this.symbol);
            } else {
                let pointPresence = this.currentWord === '.';
                let previousChar = null;
                while (/[\d.]/.exec(this.char) !== null) {
                    if (this.char === '.') {
                        if (!pointPresence) {
                            pointPresence = true;
                        } else {
                            if (previousChar === '.') {
                                this.wordBuffer = '.';
                                return new NmbInt(this.token, SymbolsCodes.intC, this.currentWord);
                            }
                            break;
                        }
                    }
                    previousChar = this.char;
                    this.currentWord += this.char;
                    this.char = this.fileIO.nextCh();
                }

                return pointPresence ?
                    new NmbFloat(this.token, SymbolsCodes.floatC, this.currentWord) :
                    new NmbInt(this.token, SymbolsCodes.intC, this.currentWord);
            }

        } else {
            this.currentWord += this.char;
            switch (this.char) {
                case ':':
                    this.char = this.fileIO.nextCh();
                    if (this.char === '=') {
                        this.currentWord += this.char;
                        this.char = this.fileIO.nextCh();
                        return this.getSymbol(SymbolsCodes.assign);
                    } else {
                        return this.getSymbol(SymbolsCodes.colon);
                    }
                case '<':
                    this.char = this.fileIO.nextCh();
                    switch (this.char) {
                        case '=':
                            this.currentWord += this.char;
                            this.char = this.fileIO.nextCh();
                            return this.getSymbol(SymbolsCodes.laterEqual);
                        case '>':
                            this.currentWord += this.char;
                            this.char = this.fileIO.nextCh();
                            return this.getSymbol(SymbolsCodes.laterGreater);
                        default:
                            return this.getSymbol(SymbolsCodes.later);
                    }
                case '>':
                    this.char = this.fileIO.nextCh();
                    if (this.char === '=') {
                        this.currentWord += this.char;
                        this.char = this.fileIO.nextCh();
                        return this.getSymbol(SymbolsCodes.greaterEqual);
                    } else {
                        return this.getSymbol(SymbolsCodes.greater);
                    }

                case '-':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.minus);

                case '+':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.plus);

                case '*':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.star);

                case '/':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.slash);

                case '=':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.equal);

                case ',':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.comma);

                case ';':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.semicolon);

                case '^':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.arrow);

                case '(':
                    this.char = this.fileIO.nextCh();

                    var previousChar = null;
                    var currentChar = this.currentWord;
                    // skip comments
                    if (this.char === '*') {
                        do {
                            previousChar = currentChar;
                            currentChar = this.fileIO.nextCh();
                        } while (
                            !(previousChar === '*' &&
                            currentChar === ')')
                        )

                        this.char = this.fileIO.nextCh();
                        this.skipWhiteSpaces();
                        return this.scanSymbol();
                    } else {
                        return this.getSymbol(SymbolsCodes.leftPar);
                    }

                case ')':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.rightPar);

                case '[':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.lBracket);

                case ']':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.rBracket);

                case '{':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.flPar);

                case '}':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.frPar);

                case '<':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.later);

                case '>':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.greater);
                case '@':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.at);
                case "'":
                    do {
                        this.char = this.fileIO.nextCh();
                        this.currentWord += this.char;
                    } while (this.char !== "'")

                    this.char = this.fileIO.nextCh();

                    return this.currentWord.length === 3 ?
                        new OneSymbol(this.token, SymbolsCodes.charC, this.currentWord) :
                        new StringConstant(this.token, SymbolsCodes.stringC, this.currentWord);
            }
        }

        this.addForbiddenCharacterError(this.char);
        this.char = this.fileIO.nextCh();
        return null;
    }

    getSymbol(symbolCode)
    {
        return symbolCode === SymbolsCodes.trueSy || symbolCode === SymbolsCodes.falseSy ?
            new BoolConstant(this.token, SymbolsCodes.booleanC, this.currentWord) :
            new Symbol(this.token, symbolCode, this.currentWord);
    }

    skipWhiteSpaces()
    {
        var ws = /\s/;

        while (ws.exec(this.char) !== null) {
            this.char = this.fileIO.nextCh();
        }
    }

    addForbiddenCharacterError(character)
    {
        this.fileIO.addError(this.errorsCodes.forbiddenCharacter, ` '${character}'`, this.token)
    }
};