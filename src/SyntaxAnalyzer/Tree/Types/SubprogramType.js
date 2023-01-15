import { TypeBase } from './TypeBase.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';

export class SubprogramType extends TypeBase
{
    constructor(symbol = null, signature = null, typeId = null, returnType = null)
    {
        super(symbol, typeId);
        this.signature = signature;
        this.returnType = returnType;
    }
};