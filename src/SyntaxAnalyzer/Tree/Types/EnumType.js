import { TypeBase } from './TypeBase.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';

export class EnumType extends TypeBase
{
    constructor(symbol)
    {
        super(symbol, TypesIds.ENUM);
        this.items = [];
    }

    toString()
    {
        let items = this.items.map(elem => elem.symbol.stringValue).join(', ');
        return `enum(${items})`;
    }
}