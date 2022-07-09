import { ScalarType } from './ScalarType.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';

export class NumericType extends ScalarType
{
    constructor(symbol, typeId)
    {
        super(symbol, typeId);
    }
}