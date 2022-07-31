import { FunctionItem } from '../../FunctionItem.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../../SyntaxAnalyzer/Tree/Types/ScalarType.js'
import { IntegerType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js'
import { CharType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/CharType.js'
import { BooleanType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/BooleanType.js'
import { UnindexedArrayType } from '../../../SyntaxAnalyzer/Tree/Types/Generalized/UnindexedArrayType.js'
import { RangeableType } from '../../../SyntaxAnalyzer/Tree/Types/Generalized/RangeableType.js'
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { FunctionType } from '../../../SyntaxAnalyzer/Tree/Types/FunctionType.js'
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'

export class HighArray extends FunctionItem
{
    constructor()
    {
        super('high');
        this.type = new FunctionType(
            null,
            [ new TypeApplied(
                    null,
                    false,
                    new UnindexedArrayType,
                    [ new Identifier( new Symbol(null, null, 'array') ) ]
                )
            ],
            new RangeableType
        );
    }

    async innerRun(scope)
    {
        let arrayVariable = scope.getVariable('array');
        let highIndex = arrayVariable.type.rightIndex;

        let type = null;
        let typeId = highIndex.typeId;
        let value = highIndex.symbol.value;
        switch (typeId) {
            case TypesIds.BOOLEAN:
                type = new BooleanType(null);
                break;
            case TypesIds.CHAR:
                type = new CharType(null);
                break;
            case TypesIds.INTEGER:
                type = new IntegerType(null);
                break;
        }

        let name = 'high';
        scope.addVariable(name, type, value, null, true);
        scope.callableName = name;
    }
};