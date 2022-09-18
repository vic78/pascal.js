import { ProcedureItem } from '../ProcedureItem.js';
import { EnumVariable } from '../Variables/EnumVariable.js';
import { ScalarVariable } from '../Variables/ScalarVariable.js';
import { UnboundedParametersList } from '../Signatures/UnboundedParametersList.js';
import { ProcedureType } from '../../SyntaxAnalyzer/Tree/Types/ProcedureType.js';
import { StringType } from '../../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js';
import { IntegerType } from '../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js';
import { NumericType } from '../../SyntaxAnalyzer/Tree/Types/NumericType.js';
import { TypeApplied } from '../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { Identifier } from '../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../LexicalAnalyzer/Symbols/Symbol.js'

export class Val extends ProcedureItem
{
    constructor()
    {
        super('val');
        this.type = new ProcedureType(
            null,
            [   new TypeApplied(
                    null,
                    true,
                    new StringType,
                    [ new Identifier( new Symbol(null, null, 's') ) ]
                ),
                new TypeApplied(
                    null,
                    true,
                    new NumericType,
                    [ new Identifier( new Symbol(null, null, 'v') ) ]
                ),
                new TypeApplied(
                    null,
                    false,
                    new IntegerType,
                    [ new Identifier( new Symbol(null, null, 'code') ) ]
                )
            ]
        );
    }

    async innerRun(scope)
    {
        let stringVariable = scope.getVariable('s');
        let valueVariable = scope.getVariable('v');
        let codeVariable = scope.getVariable('code');
        console.log(stringVariable);
        console.log(valueVariable);
        console.log(codeVariable);

    }
};