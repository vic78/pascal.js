import { FunctionItem } from '../FunctionItem.js';
import { TypesIds } from '../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../SyntaxAnalyzer/Tree/Types/ScalarType.js'

export class Chr extends FunctionItem
{
    constructor()
    {
        super();
    }

    async innerRun(scope)
    {
        let parametersList = scope.getParametersList();
        let codeParameter = parametersList[0];
        let code = codeParameter.value;
        let char = String.fromCharCode(code);

        scope.setValue('Chr', TypesIds.CHAR, char);
    }
};