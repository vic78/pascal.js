import { FunctionItem } from '../FunctionItem.js';
import { TypesIds } from '../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../SyntaxAnalyzer/Tree/Types/ScalarType.js'

export class Ord extends FunctionItem
{
    constructor()
    {
        super();
        this.returnType = new ScalarType(null, TypesIds.INTEGER);
    }

    innerRun(scope)
    {
        let parametersList = scope.getParametersList();
        let charParameter = parametersList[0];
        let char = charParameter.value;
        let code = char.charCodeAt(0);

        scope.setValue('Ord', TypesIds.INTEGER, code);
    }
};