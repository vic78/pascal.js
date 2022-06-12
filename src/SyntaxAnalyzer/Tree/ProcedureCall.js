import { TreeNodeBase } from './TreeNodeBase.js';

export class ProcedureCall extends TreeNodeBase
{
    constructor(symbol, identifier, parameters = [])
    {
        super(symbol);
        this.identifier = identifier;
        this.parameters = parameters;
    }
}