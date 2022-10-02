import { ProcedureItem } from '../ProcedureItem.js';
import { EnumVariable } from '../Variables/EnumVariable.js';
import { ScalarVariable } from '../Variables/ScalarVariable.js';
import { UnboundedParametersList } from '../Signatures/UnboundedParametersList.js';
import { ProcedureType } from '../../SyntaxAnalyzer/Tree/Types/ProcedureType.js';

export class WriteLn extends ProcedureItem
{
    constructor(outputStream, ouputNewLineSymbol)
    {
        super();
        this.outputStream = outputStream;
        this.ouputNewLineSymbol = ouputNewLineSymbol;
        this.type = new ProcedureType(null, new UnboundedParametersList(), null);
    }

    async innerRun(scope)
    {
        let parametersList = scope.getParametersList();

        this.outputStream.write((parametersList === null ? '' :
        parametersList.map(function(elem){
            if (elem instanceof EnumVariable) {
                return elem.value.symbol.stringValue;
            } else if (elem instanceof ScalarVariable) {
                return elem.value;
            }
        }).join('')) + this.ouputNewLineSymbol);
    }
};