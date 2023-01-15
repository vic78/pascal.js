import { ProcedureItem } from '../../ProcedureItem.js';
import { IntegerType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js'
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { ProcedureType } from '../../../SyntaxAnalyzer/Tree/Types/ProcedureType.js'
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'

export class IncIntegerTwo extends ProcedureItem
{
    constructor()
    {
        super('inc');
        this.type = new ProcedureType(
            null,
            [ new TypeApplied(
                    null,
                    true,
                    new IntegerType,
                    [ new Identifier( new Symbol(null, null, 'inputInteger') ) ]
                ),
                new TypeApplied(
                    null,
                    false,
                    new IntegerType,
                    [ new Identifier( new Symbol(null, null, 'offsetInteger') ) ]
                )
            ]
        );
    }

    async innerRun(scope)
    {
        let integerVariable = scope.getVariable('inputInteger');
        let offsetInteger = scope.getVariable('offsetInteger');

        let num = integerVariable.value;
        let offset = offsetInteger.value;

        num += offset;

        integerVariable.value = num;
    }
};