import { TypeBase } from './../TypeBase.js';
import { TypesIds } from '../../../../Semantics/Variables/TypesIds.js';

export class ClassType extends TypeBase
{
    constructor(symbol, typesArray)
    {
        super(symbol, TypesIds.CLASS);

        let self = this;
        this.typesList = {};

        typesArray.forEach(elem => {
            let type = elem.type;
            elem.identifiers.forEach(identifier => {
                let propertyName = identifier.symbol.value;
                self.typesList[propertyName] = type;
            });
        })
    }

    toString()
    {
        let properties = [];
        let propertyName = null;

        for (propertyName in this.typesList) {
            properties.push(`${propertyName}: ` + this.typesList[propertyName].toString());
        }

        let types = properties.join(', ');
        return `class(${types})`;
    }
}
