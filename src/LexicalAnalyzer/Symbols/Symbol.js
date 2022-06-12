import { SymbolBase } from './SymbolBase.js';

export class Symbol extends SymbolBase
{
    constructor(textPosition, symbolCode, stringValue)
    {
        super(textPosition, symbolCode, stringValue, stringValue);
    }
}