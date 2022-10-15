import { BaseOutput } from './BaseOutput.js';

export class StringOutput extends BaseOutput
{
    constructor()
    {
        super();
        this.outputLines = [];
    }

    listLine(line, number)
    {
        var output = this.getLinePrefix(number + 1) + line;
        this.outputLines.push(output.replace(/[\n\r]/g, ''));
    }

    listError(error)
    {
        this.outputLines.push(this.getErrorText(error, ++this.errorsCounter));
    }

    clearLines()
    {
        this.outputLines = [];
    }
}