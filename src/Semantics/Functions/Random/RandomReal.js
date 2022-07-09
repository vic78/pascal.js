import { FunctionItem } from '../../FunctionItem.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';
import { ScalarType } from '../../../SyntaxAnalyzer/Tree/Types/ScalarType.js'
import { TypeApplied } from '../../../SyntaxAnalyzer/Tree/ParametersList/TypeApplied.js';
import { FunctionType } from '../../../SyntaxAnalyzer/Tree/Types/FunctionType.js'
import { Identifier } from '../../../SyntaxAnalyzer/Tree/Identifier.js'
import { Symbol } from '../../../LexicalAnalyzer/Symbols/Symbol.js'
import { RealType } from '../../../SyntaxAnalyzer/Tree/Types/Scalar/RealType.js';

export class RandomReal extends FunctionItem
{
    constructor()
    {
        super('random');
        this.type = new FunctionType(
            null,
            [],
            new ScalarType(null, TypesIds.INTEGER)
        );
    }

    async innerRun(scope)
    {
        let parametersList = scope.getParametersList();

        let limit = scope.getVariable('limit');

        if (limit) {
            let sign = Math.sign(limit.value);
            let positive = Math.abs(limit.value);
            let res = Math.floor( Math.random() * positive );

            scope.setValue(new Identifier(new Symbol(null, null, 'random')), TypesIds.INTEGER, res === 0 ? 0 : sign * res);
        } else {
            let randomValue = Math.random();
            scope.setValue('random', TypesIds.REAL, randomValue);
        }
    }
};