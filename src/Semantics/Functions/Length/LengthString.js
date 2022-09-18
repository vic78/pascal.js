import { FunctionItem } from '../../FunctionItem.js';
import { IntegerType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js'
import { StringType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js'
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { FunctionType } from '../../../SyntaxAnalyzer/Tree/Types/FunctionType.js'
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'

export class LengthString extends FunctionItem
{
    constructor()
    {
        super('length');
        this.type = new FunctionType(
            null,
            [ new TypeApplied(
                    null,
                    false,
                    new StringType(),
                    [ new Identifier( new Symbol(null, null, 'inputString') ) ]
                )
            ],
            new IntegerType
        );
    }

    async innerRun(scope)
    {
        let inputStringVariable = scope.getVariable('inputString');
        let value = inputStringVariable.value;

        let stringLength  = typeof value === 'string' ? value.length : 0;

        let type = new IntegerType;

        let name = 'length';
        scope.addVariable(name, type, stringLength, null, true);
        scope.callableName = name;
    }
};