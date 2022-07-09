import { ProcedureItem } from '../ProcedureItem.js';
import { EnumVariable } from '../Variables/EnumVariable.js';
import { ScalarVariable } from '../Variables/ScalarVariable.js';
import { UnboundedParametersList } from '../Signatures/UnboundedParametersList.js';
import { ProcedureType } from '../../SyntaxAnalyzer/Tree/Types/ProcedureType.js';

export class Randomize extends ProcedureItem
{
    constructor()
    {
        super();
        this.type = new ProcedureType(null, [], null);
    }

    async innerRun(scope)
    {
    }
};