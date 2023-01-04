import { FunctionItem } from '../../FunctionItem.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../../SyntaxAnalyzer/Tree/Types/ScalarType.js'
import { IntegerType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js'
import { CharType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/CharType.js'
import { StringType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js'
import { BooleanType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/BooleanType.js'
import { UnindexedArrayType } from '../../../SyntaxAnalyzer/Tree/Types/Generalized/UnindexedArrayType.js'
import { TypeAsData } from '../../../SyntaxAnalyzer/Tree/Types/Generalized/TypeAsData.js'
import { RangeableType } from '../../../SyntaxAnalyzer/Tree/Types/Generalized/RangeableType.js'
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { FunctionType } from '../../../SyntaxAnalyzer/Tree/Types/FunctionType.js'
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'

export class OrdChar extends FunctionItem
{
    constructor()
    {
        super('ord');
        this.type = new FunctionType(
            null,
            [ new TypeApplied(
                    null,
                    false,
                    new StringType,
                    [ new Identifier( new Symbol(null, null, 'inputChar') ) ]
                )
            ],
            new IntegerType
        );
    }

    async innerRun(scope)
    {
        let stringVariable = scope.getVariable('inputChar');

        let char = stringVariable.value;
        let code = char.charCodeAt(0);

        let name = 'ord';
        scope.addVariable(name, new IntegerType, code, null, true);
        scope.callableName = name;
    }
};