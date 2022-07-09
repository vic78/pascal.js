import { ScalarType } from '../ScalarType.js';
import { TypesIds } from '../../../../Semantics/Variables/TypesIds.js';

export class CharType extends ScalarType
{
    constructor(symbol = null)
    {
        super(symbol, TypesIds.CHAR);
    }
}