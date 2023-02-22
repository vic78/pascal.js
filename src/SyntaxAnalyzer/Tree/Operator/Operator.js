import { TreeNodeBase } from '../TreeNodeBase.js';

export class Operator extends TreeNodeBase
{
    constructor(symbol, withPrefix = [])
    {
        super(symbol);
        this.withPrefix = withPrefix;
    }
}

