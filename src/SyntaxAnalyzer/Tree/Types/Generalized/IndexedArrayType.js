import { GeneralizedTypeBase } from './GeneralizedTypeBase.js';

export class IndexedArrayType extends GeneralizedTypeBase
{
    constructor(indexType)
    {
        super(null, null);
        this.indexType = indexType;
    }
}