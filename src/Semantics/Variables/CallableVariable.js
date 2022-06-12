import { BaseVariable } from './BaseVariable.js';

export class CallableVariable extends BaseVariable
{
    constructor(type, value = null)
    {
        super();
        this.type = type;
        this.typeId = type.typeId;
        this.value = value;
    }

    clone()
    {
        return new CallableVariable(this.type, this.value);
    }
}