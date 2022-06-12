import { ProgramBase } from './ProgramBase.js';

export class Function extends ProgramBase
{
    constructor(symbol, type = null)
    {
        super(symbol);
        this.type = type;
    }
}