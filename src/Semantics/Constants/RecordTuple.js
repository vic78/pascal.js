export class RecordTuple
{
    constructor(leftBraceSymbol, items = {})
    {
        this.leftBraceSymbol = leftBraceSymbol;
        this.items = items;
    }
}