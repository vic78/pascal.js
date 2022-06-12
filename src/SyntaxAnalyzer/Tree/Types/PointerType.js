import { TypeBase } from './TypeBase.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';

export class PointerType extends TypeBase
{
    constructor(symbol, type)
    {
        super(symbol, TypesIds.POINTER);
        this.type = type;
    }

    toString()
    {
        return `^${this.type}`;
    }
}