import { TreeNodeBase } from './TreeNodeBase.js';

export class CompoundOperator extends TreeNodeBase
{
    constructor(symbol)
    {
        super(symbol);
        this.sentences = [];
    }
}