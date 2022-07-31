import { GeneralizedTypeBase } from './GeneralizedTypeBase.js';
import {CharType} from '../Scalar/CharType.js';
import {IntegerType} from '../Scalar/IntegerType.js';
import {BooleanType} from '../Scalar/BooleanType.js';
import {EnumType} from '../EnumType.js';

export class RangeableType extends GeneralizedTypeBase
{
    /**
     * @param {CharType|IntegerType|BooleanType|EnumType} indexType
     */
    constructor(indexType = null)
    {
        super(null, null);
    }
}