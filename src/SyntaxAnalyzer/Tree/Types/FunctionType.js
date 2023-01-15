import { SubprogramType } from './SubprogramType.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';
import { CallableVariable } from '../../../Semantics/Variables/CallableVariable.js';

export class FunctionType extends SubprogramType
{
    constructor(symbol, signature = null, returnType = null)
    {
        super(symbol, signature, TypesIds.FUNCTION, returnType);
    }

    toString()
    {
        let signatureTexts = [];

        if (this.signature.length > 0) {
            this.signature.forEach(function (elem, index) {
                let idents = elem.identifiers.map((identifier) => identifier.symbol.stringValue).join(', ');
                signatureTexts[index] = idents + ': ' + elem.type.toString();
            });
        }

        let signatureText = signatureTexts.join('; ');

        return `function(${signatureText}): ${this.returnType.toString()}`;
    }
};