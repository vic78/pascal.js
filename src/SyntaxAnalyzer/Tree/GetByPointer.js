import { TreeNodeBase } from './TreeNodeBase.js';

export class GetByPointer extends TreeNodeBase
{
    constructor(symbol, pointer)
    {
        super(symbol);
        this.pointer = pointer;
    }
}

