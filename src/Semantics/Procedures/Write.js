import { ProcedureItem } from '../ProcedureItem.js';
import { EnumVariable } from '../Variables/EnumVariable.js';
import { ScalarVariable } from '../Variables/ScalarVariable.js';
import { UnboundedParametersList } from '../Signatures/UnboundedParametersList.js';
import { ProcedureType } from '../../SyntaxAnalyzer/Tree/Types/ProcedureType.js';

export class Write extends ProcedureItem
{
    constructor(outputStream)
    {
        super();
        this.outputStream = outputStream;
        this.type = new ProcedureType(null, new UnboundedParametersList(), null);
    }

    innerRun(scope)
    {
        let parametersList = scope.getParametersList();

        this.outputStream.write(parametersList.map(function(elem){
            if (elem instanceof EnumVariable) {
                return elem.value.symbol.stringValue;
            } else if (elem instanceof ScalarVariable) {
                return elem.value;
            }
        }).join(''));
    }
};