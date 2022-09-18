import { StringType } from './StringType.js';
import { TypesIds } from '../../../../Semantics/Variables/TypesIds.js';

export class CharType extends StringType
{
    constructor(symbol = null)
    {
        super(symbol, TypesIds.CHAR);
    }
}