import { TreeNodeBase } from '../TreeNodeBase.js';

export class ForCycle extends TreeNodeBase
{
    constructor(symbol, variableIdentifier, initExpression, lastExpression, countDown, body)
    {
        super(symbol);

        this.variableIdentifier = variableIdentifier;
        this.initExpression = initExpression;
        this.lastExpression = lastExpression;
        this.countDown = countDown;
        this.body = body;
    }
}