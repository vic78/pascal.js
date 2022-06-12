import { TreeNodeBase } from './TreeNodeBase.js';

export class Not extends TreeNodeBase
{
    constructor(symbol, value)
    {
        super(symbol);
        this.value = value;
    }
}