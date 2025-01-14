import { TreeNodeBase } from './TreeNodeBase.js';
import { FunctionsStore } from '../../Semantics/FunctionsStore.js';

export class ProgramBase extends TreeNodeBase
{
    constructor(symbol, parentFunction = null)
    {
        super(symbol);
        this.name = null;
        this.vars = [];
        this.functionsStore = new FunctionsStore(parentFunction instanceof ProgramBase ? parentFunction.functionsStore : null);
        this.sentences = [];
        this.types = [];
        this.constants = [];
        this.parentFunction = parentFunction;
        this.exit = false;
    }

    getType()
    {
        return this.type;
    }
};