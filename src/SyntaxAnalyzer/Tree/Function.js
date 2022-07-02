import { ProgramBase } from './ProgramBase.js';

export class Function extends ProgramBase
{
    constructor(symbol, type = null, parentFunction = null)
    {
        super(symbol, parentFunction);
        this.type = type;
    }
}