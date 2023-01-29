import { TreeNodeBase } from './TreeNodeBase.js';

export class Exit extends TreeNodeBase
{
    constructor(symbol, exitExpression)
    {
        super(symbol);
        this.exitExpression = exitExpression;
    }
}