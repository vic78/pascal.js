import { SymbolBase } from './SymbolBase.js';

export class NmbInt extends SymbolBase
{
    constructor(textPosition, symbolCode, stringValue)
    {
        super(textPosition, symbolCode, stringValue, Number.parseInt(stringValue));
    }
}