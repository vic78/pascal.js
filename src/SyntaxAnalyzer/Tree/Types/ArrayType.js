import { TypeBase } from './TypeBase.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';

export class ArrayType extends TypeBase
{
    constructor(symbol, leftIndex = null, rightIndex = null, typeOfElements = null)
    {
        super(symbol, TypesIds.ARRAY);
        this.typeOfElements = typeOfElements;
        this.leftIndex = leftIndex;
        this.rightIndex = rightIndex;
    }

    toString()
    {
        return `array [${this.leftIndex.symbol.value}..${this.rightIndex.symbol.value}] of ${this.typeOfElements}`;
    }
}