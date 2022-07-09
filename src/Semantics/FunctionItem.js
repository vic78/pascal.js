import { ProcedureItem } from './ProcedureItem.js';

export class FunctionItem extends ProcedureItem
{
    constructor(name = null)
    {
        super();
        this.name = name;
    }
};