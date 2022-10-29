import { ProcedureType } from '../../../SyntaxAnalyzer/Tree/Types/ProcedureType.js';
import { IntegerType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js';
import { NumericType } from '../../../SyntaxAnalyzer/Tree/Types/NumericType.js';
import { StringType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js';
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'
import { ValBase } from './ValBase.js'

export class ValCode extends ValBase
{
    constructor()
    {
        super();
        this.type = new ProcedureType(
            null,
            [   new TypeApplied(
                    null,
                    false,
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
                    true,
                    new IntegerType,
                    [ new Identifier( new Symbol(null, null, 'code') ) ]
                )
            ]
        );
    }

    async innerRun(scope)
    {
        let codeVariable = scope.getVariable('code');
        await this.baseRun(scope);
        codeVariable.value = this.code;
    }
};