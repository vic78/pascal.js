import { TypeBase } from './../TypeBase.js';
import { TypesIds } from '../../../../Semantics/Variables/TypesIds.js';
import { AccessModifiers } from './AccessModifiers.js';

export class ClassElementAccessAttrs
{
    constructor(type, identifiers = [], accessModifier = AccessModifiers.PUBLIC, isStrict = false, isStatic = false)
    {
        this.type = type;
        this.accessModifier = accessModifier;
        this.isStrict = isStrict;
        this.identifiers = [];
        this.isClass = false;
        this.isStatic = false;
    }

    toString()
    {
        return '';
    }
}
