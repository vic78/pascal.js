import { TreeNodeBase } from './TreeNodeBase.js';
import { SymbolsCodes } from '../../LexicalAnalyzer/SymbolsCodes.js';
import { TypesIds } from '../../Semantics/Variables/TypesIds.js';

export class Constant extends TreeNodeBase
{
    constructor(symbol)
    {
        super(symbol);

        let typeId = null;

        switch(symbol.symbolCode) {
            case SymbolsCodes.intC:
                typeId = TypesIds.INTEGER;
                break;
            case SymbolsCodes.floatC:
                typeId = TypesIds.REAL;
                break;
            case SymbolsCodes.charC:
                typeId = TypesIds.CHAR;
                break;
            case SymbolsCodes.stringC:
                typeId = TypesIds.STRING;
                break;
            case SymbolsCodes.booleanC:
                typeId = TypesIds.BOOLEAN;
                break;
            case SymbolsCodes.ident:
                typeId = TypesIds.ENUM;
                break;
        }

        this.typeId = typeId;
    }
}