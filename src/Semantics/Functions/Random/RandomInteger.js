import { FunctionItem } from '../../FunctionItem.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../../SyntaxAnalyzer/Tree/Types/ScalarType.js'
import { IntegerType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js'
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { FunctionType } from '../../../SyntaxAnalyzer/Tree/Types/FunctionType.js'
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'

export class RandomInteger extends FunctionItem
{
    constructor()
    {
        super('random');
        this.type = new FunctionType(
            null,
            [ new TypeApplied(
                    null,
                    false,
                    new IntegerType,
                    [ new Identifier( new Symbol(null, null, 'limit') ) ]
                )
            ],
            new IntegerType
        );
    }

    async innerRun(scope)
    {
        let limit = scope.getVariable('limit');

        let sign = Math.sign(limit.value);
        let positive = Math.abs(limit.value);
        let res = Math.floor( Math.random() * positive );

        let name = 'random';
        scope.addVariable(name, this.type.returnType, null, null, true);
        scope.callableName = name;
        scope.setValue(new Identifier(new Symbol(null, null, name)), this.type.returnType, res === 0 ? 0 : sign * res);
    }
};