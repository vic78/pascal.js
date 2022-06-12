import { TypeBase } from './TypeBase.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';

export class AppliedNamedType extends TypeBase
{
    /**
     * Symbol must be an identifier
     */
    constructor(symbol)
    {
        super(symbol, TypesIds.APPLIED_NAMED);
    }

    toString()
    {
        return this.symbol.stringValue;
    }
}