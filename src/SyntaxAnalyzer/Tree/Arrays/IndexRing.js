import { TreeNodeBase } from '../TreeNodeBase.js';

export class IndexRing extends TreeNodeBase
{
    constructor(symbol, indexExpression, indexRing = null)
    {
        super(symbol);
        this.indexExpression = indexExpression;
        this.indexRing = indexRing;
        this.evaluatedIndexExpression = null;
    }

    appendIndexRing(indexRing)
    {
        if (this.indexRing === null) {
            this.indexRing = indexRing;
        } else {
            this.indexRing.appendIndexRing(indexRing);
        }
    }
}