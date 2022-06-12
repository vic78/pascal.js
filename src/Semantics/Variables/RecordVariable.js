import { TypesIds } from './TypesIds.js';
import { BaseVariable } from './BaseVariable.js';
import { ArrayVariable } from './ArrayVariable.js';
import { ArrayType } from '../../SyntaxAnalyzer/Tree/Types/ArrayType.js';
import { IndexRing } from '../../SyntaxAnalyzer/Tree/Arrays/IndexRing.js';
import { ErrorsCodes } from '../../Errors/ErrorsCodes.js';

export class RecordVariable extends BaseVariable
{
    constructor(type, scope)
    {
        super();
        this.typeId = TypesIds.RECORD;
        this.type = type;
        this.items = {};
        this.scope = scope;
    }

    setPropertyByPropertyIdentifier(propertyIdentifier, variable)
    {
        let propertyName = propertyIdentifier.symbol.value;

        if (this.type.typesList.hasOwnProperty(propertyName)) {
            this.items[propertyName] = variable;
        } else {
            this.scope.addError(ErrorsCodes.indexIsOutOfRange, `Property ${propertyName} is not defined.`, propertyIdentifier);
        }
    }

    getByPropertyIdentifier(propertyIdentifier)
    {
        let propertyName = propertyIdentifier.symbol.value;

        if (this.type.typesList.hasOwnProperty(propertyName)) {
            if (!this.items.hasOwnProperty(propertyName)) {
                let propertyType = this.type.typesList[propertyName];

                this.items[propertyName] = this.scope.createDefaultVariable(propertyType);
            }
            return this.items[propertyName];
        } else {
            this.scope.addError(ErrorsCodes.indexIsOutOfRange, `Property ${propertyName} is not defined.`, propertyIdentifier);
        }
    }

    clone()
    {
        let copyRecordVariable = new RecordVariable(this.type, this.scope);

        let copyItems = {};
        let property = null;

        for (property in this.items) {
            copyRecordVariable.items[property] = this.items[property].clone(this.scope);
        }

        return copyRecordVariable;
    }


}