import { FunctionItem } from '../../FunctionItem.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';
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
            new RealType
        );
    }

    async innerRun(scope)
    {
        let randomValue = Math.random();
        scope.setValue(new Identifier(new Symbol(null, null, 'random')), this.type.returnType, randomValue);
    }
};