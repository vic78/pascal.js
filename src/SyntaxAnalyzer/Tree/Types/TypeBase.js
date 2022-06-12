import { TreeNodeBase } from '../TreeNodeBase.js';

export class TypeBase extends TreeNodeBase
{
    constructor(symbol, typeId)
    {
        super(symbol);
        this.typeId = typeId;
    }
}
