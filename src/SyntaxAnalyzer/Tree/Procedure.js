import { ProgramBase } from './ProgramBase.js';

export class Procedure extends ProgramBase
{
    constructor(symbol, type = null, parentFunction = null)
    {
        super(symbol, parentFunction);
        this.type = type;
    }
};