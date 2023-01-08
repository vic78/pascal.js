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

export class DeleteString extends ProcedureItem
{
    constructor()
    {
        super('delete');
        this.type = new ProcedureType(
            null,
            [
                new TypeApplied(
                    null,
                    true,
                    new StringType,
                    [ new Identifier( new Symbol(null, null, 'S') ) ]
                ),
                new TypeApplied(
                    null,
                    false,
                    new IntegerType,
                    [ new Identifier( new Symbol(null, null, 'Index') ) ]
                ),
                new TypeApplied(
                    null,
                    false,
                    new IntegerType,
                    [ new Identifier( new Symbol(null, null, 'Count') ) ]
                )
            ]
        );
    }

    async innerRun(scope)
    {
        let stringVariable = scope.getVariable('S');
        let index = scope.getVariable('Index').value;
        let count = scope.getVariable('Count').value;

        if (index > 0 && count > 0) {
            let inputValue = stringVariable.value;
            let stringValue = inputValue.slice(0, index-1) + inputValue.slice(index - 1 + count);
            stringVariable.value = stringValue;
        }
    }
};