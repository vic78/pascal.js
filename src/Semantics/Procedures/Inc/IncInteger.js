import { ProcedureItem } from '../../ProcedureItem.js';
import { IntegerType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js'
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { ProcedureType } from '../../../SyntaxAnalyzer/Tree/Types/ProcedureType.js'
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'

export class IncInteger extends ProcedureItem
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
                )
            ]
        );
    }

    async innerRun(scope)
    {
        let integerVariable = scope.getVariable('inputInteger');

        let num = integerVariable.value;
        num++;
        let stringValue = `${num}`;

        integerVariable.value = num;
    }
};