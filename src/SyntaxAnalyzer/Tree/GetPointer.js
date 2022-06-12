import { TreeNodeBase } from './TreeNodeBase.js';

export class GetPointer extends TreeNodeBase
{
    constructor(symbol, identifier)
    {
        super(symbol);
        this.identifier = identifier;
    }
}