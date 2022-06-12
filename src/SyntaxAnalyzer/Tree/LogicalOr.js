import { BinaryOperation } from './BinaryOperation.js';

export class LogicalOr extends BinaryOperation
{
    constructor(symbol, left, right)
    {
        super(symbol, left, right)
    }
}