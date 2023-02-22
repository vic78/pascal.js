import { Operator } from './Operator/Operator.js';

export class Implication extends Operator
{
    constructor(symbol, condition, left, right, withPrefix = [])
    {
        super(symbol, withPrefix);
        this.condition = condition;
        this.left = left;
        this.right = right;
    }
}