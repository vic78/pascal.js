import { TreeNodeBase } from '../TreeNodeBase.js';

export class RepeatCycle extends TreeNodeBase
{
    constructor(symbol, condition, body)
    {
        super(symbol);
        this.condition = condition;
        this.body = body;
    }
}