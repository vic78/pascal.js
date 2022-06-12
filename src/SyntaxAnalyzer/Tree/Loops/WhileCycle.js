import { TreeNodeBase } from '../TreeNodeBase.js';

export class WhileCycle extends TreeNodeBase
{
    constructor(symbol, condition, body)
    {
        super(symbol);
        this.condition = condition;
        this.body = body;
    }
}