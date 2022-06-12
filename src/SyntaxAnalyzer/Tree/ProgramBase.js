import { TreeNodeBase } from './TreeNodeBase.js';

export class ProgramBase extends TreeNodeBase
{
    constructor(symbol)
    {
        super(symbol);
        this.name = null;
        this.vars = [];
        this.procedures = {};
        this.functions = {};
        this.sentences = [];
        this.types = [];
    }

    getType()
    {
        return this.type;
    }
};