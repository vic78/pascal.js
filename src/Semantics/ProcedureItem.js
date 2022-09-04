import { ProgramBase } from '../SyntaxAnalyzer/Tree/ProgramBase.js';

export class ProcedureItem extends ProgramBase
{
    constructor(symbol = null)
    {
        super(symbol);
        this.vars = [];
        this.signature = [];
        this.sentences = [];
        this.name = null;
    }

    async innerRun()
    {
    }
};