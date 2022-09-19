import { TextPosition } from './TextPosition.js';
import { ErrorsDescription } from '../Errors/ErrorsDescription.js';
import { RuntimeError } from '../Errors/RuntimeError.js';

export class BaseIO
{
    constructor(printer, reader)
    {
        this.errorsDescription = new ErrorsDescription();

        this.positionNow = new TextPosition();
        this.printer = printer;
        this.reader = reader;
        this.currentLine;
        this.currentLineErrors = [];
        this.lines = [];
        this.linePointer = 0;
        this.currentLine;
        this.endOfFile = false;
    }

    setLines(programText)
    {
        this.lines = programText.split(/\r?\n/);
        this.readNextLine();
    }

    getCurrentPosition()
    {
        return new TextPosition(
            this.positionNow.lineNumber,
            this.positionNow.charNumber
        );
    }

    nextCh()
    {
        if (this.endOfFile && this.positionNow.charNumber >= this.currentLine.length) {
            return null;
        } else {
            if (this.positionNow.charNumber === this.currentLine.length) {
//                this.printer.listLine(this.currentLine.join(''), this.positionNow.lineNumber);
                if (this.currentLineErrors.length > 0) {
                    this.printer.listErrors(this.currentLineErrors);
                }
                this.readNextLine();
                this.currentLineErrors = [];
                this.positionNow.lineNumber++;
                this.positionNow.charNumber = 0;
            }

            return this.currentLine[this.positionNow.charNumber++];
        }
    }

    prevCh()
    {
        if (this.linePointer === 0 && this.positionNow.charNumber === 0) {
            return null;
        } else {
            if (this.positionNow.charNumber === 0) {

                this.readPrevLine();
                this.currentLineErrors = [];
                this.positionNow.lineNumber--;
                this.positionNow.charNumber = this.currentLine.length;
            }

            this.positionNow.charNumber--;
            return this.currentLine[this.positionNow.charNumber - 1];
        }
    }

    readNextLine()
    {
       var currentLine = this.lines[this.linePointer++];
       this.currentLine = currentLine.split('');
       this.currentLine.push('\n');
       this.endOfFile = this.linePointer === this.lines.length;
    }

    readPrevLine()
    {
       if (this.linePointer > 0) {
           var currentLine = this.lines[--this.linePointer];
           this.currentLine = currentLine.split('');
           this.currentLine.push('\n');
       }
    }

    addError(errorCode, errorText = null, textPosition = null)
    {
        let message = this.errorsDescription.getErrorTextByCode(errorCode) +
                (errorText === null ? '' : ('. ' + errorText));
        let currentPosition = textPosition === null ? this.getCurrentPosition() : textPosition;
        throw new RuntimeError(errorCode, message, currentPosition);
    }

    printListing(error = null)
    {
        let lineNumber = error.textPosition.lineNumber;

        for (let i = 0; i <= lineNumber; i++) {
            this.printer.listLine(this.lines[i], i);
        }

        this.printer.listError(error);

        for (let i = lineNumber + 1; i <= this.lines.length - 1; i++) {
            this.printer.listLine(this.lines[i], i);
        }
    }

    readWords(expectedNumberOfWords)
    {
        this.reader.readWords(expectedNumberOfWords);
    }
}