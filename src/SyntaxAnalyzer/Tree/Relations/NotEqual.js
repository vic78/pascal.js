import { BinaryOperation } from '../BinaryOperation.js';

export class NotEqual extends BinaryOperation
{
    constructor(symbol, left, right)
    {
        super(symbol, left, right)
    }
}