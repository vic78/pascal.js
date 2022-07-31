import { FunctionItem } from '../FunctionItem.js';
import { TypesIds } from '../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../SyntaxAnalyzer/Tree/Types/ScalarType.js'
import { IntegerType } from '../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js'

export class Ord extends FunctionItem
{
    constructor()
    {
        super();
    }

    async innerRun(scope)
    {
        let parametersList = scope.getParametersList();
        let charParameter = parametersList[0];
        let char = charParameter.value;
        let code = char.charCodeAt(0);

        let name = 'ord';
        scope.addVariable(name, this.type.returnType, null, null, true);
        scope.callableName = name;
        scope.setValue(new Identifier(new Symbol(null, null, name)), new CharType, code);
    }
};