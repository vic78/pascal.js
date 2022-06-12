import { ProcedureItem } from './ProcedureItem.js';

export class FunctionItem extends ProcedureItem
{
    constructor()
    {
        super();
        this.returnType = null;
    }
};