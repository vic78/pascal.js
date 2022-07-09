import { BaseVariable } from './BaseVariable.js';
import { TypesIds }     from '../../Semantics/Variables/TypesIds.js';
import { ScalarType }   from '../../SyntaxAnalyzer/Tree/Types/ScalarType.js';
import { BooleanType }  from '../../SyntaxAnalyzer/Tree/Types/Scalar/BooleanType.js';
import { CharType }     from '../../SyntaxAnalyzer/Tree/Types/Scalar/CharType.js';
import { IntegerType }  from '../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js';
import { RealType }     from '../../SyntaxAnalyzer/Tree/Types/Scalar/RealType.js';
import { StringType }   from '../../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js';

export class ScalarVariable extends BaseVariable
{
    constructor(value, typeId)
    {
        super();
        this.value = value;
        this.typeId = typeId;

        if (typeId instanceof ScalarType)
            this.type = typeId;
        else
            switch (typeId) {
                case TypesIds.BOOLEAN:
                    this.type = new BooleanType(null);
                    break;
                case TypesIds.CHAR:
                    this.type = new CharType(null);
                    break;
                case TypesIds.INTEGER:
                    this.type = new IntegerType(null);
                    break;
                case TypesIds.REAL:
                    this.type = new RealType(null);
                    break;
                case TypesIds.STRING:
                    this.type = new StringType(null);
                    break;
            }

//        this.type = false;
    }

    clone()
    {
        return new ScalarVariable(this.value, this.typeId);
    }
}