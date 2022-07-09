import { NumericType } from '../NumericType.js';
import { TypesIds } from '../../../../Semantics/Variables/TypesIds.js';

export class RealType extends NumericType
{
    constructor(symbol = null)
    {
        super(symbol, TypesIds.REAL);
    }
}