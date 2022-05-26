import { BaseIO } from './BaseIO';

export class StringIO extends BaseIO
{
    constructor(programText, printer, reader = null)
    {
        super(printer, reader);
        this.setLines(programText);
    }
}