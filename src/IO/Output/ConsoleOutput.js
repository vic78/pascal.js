import { BaseOutput } from './BaseOutput';

export class ConsoleOutput extends BaseOutput
{
    constructor()
    {
        super();
    }

    listLine(line, number)
    {
        var output = this.getLinePrefix(number + 1) + line;
        console.log(output.replace(/[\n\r]/g, ''));
    }

    listError(error)
    {
        console.log(this.getErrorText(error, ++this.errorsCounter));
    }
}