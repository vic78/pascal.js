import { BaseIO } from './BaseIO';

export class StringIO extends BaseIO
{
    constructor(programText, printer)
    {
        super(printer);
        this.setLines(programText);
    }
}