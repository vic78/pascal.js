import { ScalarType } from '../ScalarType.js';
import { TypesIds } from '../../../../Semantics/Variables/TypesIds.js';

export class StringType extends ScalarType
{
    constructor(symbol = null, typeId = TypesIds.STRING)
    {
        super(symbol, typeId);
    }
}