import { BaseIO } from './BaseIO';
import fs from 'fs'

export class FileIO extends BaseIO
{
    constructor(fileName, printer)
    {
        super(printer);

        var data = fs.readFileSync(fileName, 'utf-8');
        this.setLines(data);
    }
}