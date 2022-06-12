import { TreeNodeBase } from '../TreeNodeBase.js';

export class Case extends TreeNodeBase
{
    constructor(symbol, constants = [], operator = null)
    {
        super(symbol);
        this.constants = constants;
        this.operator = operator;
    }
}