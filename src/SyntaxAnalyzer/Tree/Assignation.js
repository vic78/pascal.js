import { Operator } from './Operator/Operator.js';

export class Assignation extends Operator
{
    constructor(symbol, destination, sourceExpression, withPrefix = [])
    {
        super(symbol, withPrefix);
        this.destination = destination;
        this.sourceExpression = sourceExpression;
    }
}