import { TreeNodeBase } from './TreeNodeBase.js';

export class Implication extends TreeNodeBase
{
    constructor(symbol, condition, left, right)
    {
        super(symbol);
        this.condition = condition;
        this.left = left;
        this.right = right;
    }
}