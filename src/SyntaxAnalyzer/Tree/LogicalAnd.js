import { BinaryOperation } from './BinaryOperation.js';

export class LogicalAnd extends BinaryOperation
{
    constructor(symbol, left, right)
    {
        super(symbol, left, right)
    }
}