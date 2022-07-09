import { TreeNodeBase } from '../TreeNodeBase.js';

export class TypeApplied extends TreeNodeBase
{
    constructor(symbol, byReference = false, type = null, identifiers = [])
    {
        super(symbol);
        this.byReference = byReference;
        this.type = type;
        this.identifiers = identifiers;
    }
};