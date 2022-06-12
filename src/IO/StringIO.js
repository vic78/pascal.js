import { BaseIO } from './BaseIO.js';

export class StringIO extends BaseIO
{
    constructor(programText, printer, reader = null)
    {
        super(printer, reader);
        this.setLines(programText);
    }
}