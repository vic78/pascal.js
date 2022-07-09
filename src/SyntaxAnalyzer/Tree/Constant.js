import { TreeNodeBase } from './TreeNodeBase.js';
import { SymbolsCodes } from '../../LexicalAnalyzer/SymbolsCodes.js';
import { TypesIds } from '../../Semantics/Variables/TypesIds.js';

import { BooleanType }  from '../../SyntaxAnalyzer/Tree/Types/Scalar/BooleanType.js';
import { CharType }     from '../../SyntaxAnalyzer/Tree/Types/Scalar/CharType.js';
import { IntegerType }  from '../../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js';
import { RealType }     from '../../SyntaxAnalyzer/Tree/Types/Scalar/RealType.js';
import { StringType }   from '../../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js';

export class Constant extends TreeNodeBase
{
    constructor(symbol)
    {
        super(symbol);

        switch(symbol.symbolCode) {
            case SymbolsCodes.intC:
                this.type = new IntegerType(null);
                this.typeId = TypesIds.INTEGER;
                break;
            case SymbolsCodes.floatC:
                this.type = new RealType(null);
                this.typeId = TypesIds.REAL;
                break;
            case SymbolsCodes.charC:
                this.type = new CharType(null);
                this.typeId = TypesIds.CHAR;
                break;
            case SymbolsCodes.stringC:
                this.type = new StringType(null);
                this.typeId = TypesIds.STRING;
                break;
            case SymbolsCodes.booleanC:
                this.type = new BooleanType(null);
                this.typeId = TypesIds.BOOLEAN;
                break;
            case SymbolsCodes.ident:
                this.typeId = TypesIds.ENUM;
        }
    }
}