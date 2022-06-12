import { TreeNodeBase } from './TreeNodeBase.js';

export class VariablesDeclaration extends TreeNodeBase
{
    constructor(symbol, identifiers, variablesType, initialValue)
    {
        super(symbol);
        this.identifiers = identifiers;
        this.variablesType = variablesType;
        this.initialValue = initialValue;
    }
}

