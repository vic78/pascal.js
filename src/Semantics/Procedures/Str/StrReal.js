import { ProcedureItem } from '../../ProcedureItem.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../../SyntaxAnalyzer/Tree/Types/ScalarType.js'
import { IntegerType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js'
import { RealType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/RealType.js'
import { CharType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/CharType.js'
import { StringType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js'
import { BooleanType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/BooleanType.js'
import { UnindexedArrayType } from '../../../SyntaxAnalyzer/Tree/Types/Generalized/UnindexedArrayType.js'
import { TypeAsData } from '../../../SyntaxAnalyzer/Tree/Types/Generalized/TypeAsData.js'
import { RangeableType } from '../../../SyntaxAnalyzer/Tree/Types/Generalized/RangeableType.js'
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { ProcedureType } from '../../../SyntaxAnalyzer/Tree/Types/ProcedureType.js'
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'

export class StrReal extends ProcedureItem
{
    constructor()
    {
        super('str');
        this.type = new ProcedureType(
            null,
            [ new TypeApplied(
                    null,
                    false,
                    new RealType,
                    [ new Identifier( new Symbol(null, null, 'inputReal') ) ]
                ),
            new TypeApplied(
                    null,
                    true,
                    new StringType,
                    [ new Identifier( new Symbol(null, null, 'outputString') ) ]
                )
            ]
        );
    }

    async innerRun(scope)
    {
        let realVariable = scope.getVariable('inputReal');
        let stringVariable = scope.getVariable('outputString');

        let num = realVariable.value;
        let stringValue = `${num}`;

        stringVariable.value = stringValue;
    }
};