import { TypesIds } from './TypesIds.js';
import { BaseVariable } from './BaseVariable.js';
import { TypeAsData } from '../../SyntaxAnalyzer/Tree/Types/Generalized/TypeAsData.js';
import { GeneralizedTypeBase } from '../../SyntaxAnalyzer/Tree/Types/Generalized/GeneralizedTypeBase.js';
import { ErrorsCodes } from '../../Errors/ErrorsCodes.js';
import { TypeBase } from '../../SyntaxAnalyzer/Tree/Types/TypeBase.js';

export class TypeVariable extends BaseVariable
{
    /**
     * @param {GeneralizedTypeBase} variableType
     * @param {TypeBase|null} valueType
     */
    constructor(variableType, valueType = null)
    {
        super();
        this.typeId = TypesIds.TYPE;
        this.variableType = variableType;
        this.valueType = valueType;
        this.type = variableType;
    }

    clone()
    {
        return new TypeVariable(this.valueType, this.type.type);
    }
}