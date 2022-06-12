import { TreeNodeBase } from './TreeNodeBase.js';

export class FunctionCall extends TreeNodeBase
{
    constructor(symbol, identifierBranch, parameters = [])
    {
        super(symbol);
        this.identifierBranch = identifierBranch;
        this.parameters = parameters;
    }
}