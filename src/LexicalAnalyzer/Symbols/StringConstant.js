import { SymbolBase } from './SymbolBase.js';

export class StringConstant extends SymbolBase
{
    constructor(textPosition, symbolCode, stringValue)
    {
        super(textPosition, symbolCode, stringValue, stringValue.replace(/'/g, ''));
    }
};