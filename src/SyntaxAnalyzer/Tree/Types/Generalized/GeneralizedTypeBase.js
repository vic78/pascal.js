import { TreeNodeBase } from '../../TreeNodeBase.js';

export class GeneralizedTypeBase extends TreeNodeBase
{
    constructor(symbol = null, typeId = null)
    {
        super(symbol);
        this.typeId = typeId;
    }
}