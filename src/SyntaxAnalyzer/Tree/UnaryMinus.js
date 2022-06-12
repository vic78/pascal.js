import { TreeNodeBase } from './TreeNodeBase.js';

export class UnaryMinus extends TreeNodeBase
{
    constructor(symbol, value)
    {
        super(symbol);
        this.value = value;
    }
}