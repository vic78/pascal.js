import { FunctionItem } from '../FunctionItem.js';
import { TypesIds } from '../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../SyntaxAnalyzer/Tree/Types/ScalarType.js'
import { CharType } from '../../SyntaxAnalyzer/Tree/Types/Scalar/CharType.js'

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

        let name = 'chr';
        scope.addVariable(name, this.type.returnType, null, null, true);
        scope.callableName = name;
        scope.setValue(new Identifier(new Symbol(null, null, name)), new CharType, char);
    }
};