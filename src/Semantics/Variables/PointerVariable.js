import { TypesIds } from './TypesIds.js';
import { BaseVariable } from './BaseVariable.js';
import { ArrayType } from '../../SyntaxAnalyzer/Tree/Types/ArrayType.js';
import { IndexRing } from '../../SyntaxAnalyzer/Tree/Arrays/IndexRing.js';
import { ErrorsCodes } from '../../Errors/ErrorsCodes.js';
import { PointerType } from '../../SyntaxAnalyzer/Tree/Types/PointerType.js';

export class PointerVariable extends BaseVariable
{
    constructor(variable, targetType)
    {
        super();
        this.typeId = TypesIds.POINTER;
        this.type = new PointerType(null, targetType);
        this.variable = variable;
    }

    clone()
    {
        return new PointerVariable(this.variable, this.type);
    }
}