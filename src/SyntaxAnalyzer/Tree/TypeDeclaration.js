import { TreeNodeBase } from './TreeNodeBase.js';

export class TypeDeclaration extends TreeNodeBase
{
    constructor(symbol, identifier, type)
    {
        super(symbol);
        this.identifier = identifier;
        this.type = type;
    }
}

