import { SubprogramType } from './SubprogramType.js';
import { TypesIds } from '../../../Semantics/Variables/TypesIds.js';

export class ProcedureType extends SubprogramType
{
    constructor(symbol, signature)
    {
        super(symbol, signature, TypesIds.PROCEDURE);
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

        return `procedure(${signatureText})`;
    }
};