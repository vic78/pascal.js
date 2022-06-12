import { ProgramBase } from './ProgramBase.js';

export class Procedure extends ProgramBase
{
    constructor(symbol, type = null)
    {
        super(symbol);
        this.type = type;
    }
};