import { GeneralizedTypeBase } from '../SyntaxAnalyzer/Tree/Types/Generalized/GeneralizedTypeBase.js';
import { TypeAsData } from '../SyntaxAnalyzer/Tree/Types/Generalized/TypeAsData.js';
import { TypeBase } from '../SyntaxAnalyzer/Tree/Types/TypeBase.js';

export class FunctionsStore
{
    /**
     * @param {FunctionsStore|null} [parentFunctionsStore=null]
     */
    constructor(parentFunctionsStore = null)
    {
        this.parentFunctionsStore = parentFunctionsStore;
        this.items = {};
    }

    addFunction(name, procedure)
    {
        let lcName = name.toLowerCase();
        if (this.items.hasOwnProperty(lcName)) {
            if (Array.isArray(this.items[lcName]))
                this.items[lcName].push(procedure);
            else {
                let found = this.items[lcName];
                this.items[lcName] = [
                    found,
                    procedure
                ];
            }
        } else
            this.items[lcName] = procedure;
    }

    getFunction(name, scope, parametersValues)
    {
        let lowerCaseName = name.toLowerCase();

        let found = this.items.hasOwnProperty(lowerCaseName) ?
            this.items[lowerCaseName] :
            ( this.parentFunctionsStore ? this.parentFunctionsStore.getFunction(name) : null);

        if (Array.isArray(found)) {
            let filtered = found.filter((func) => {
                let signature = func.type.signature;
                let identsSeqLen = signature.map( elem => elem.identifiers.length);
                let parametersNumber = identsSeqLen.reduce((partialSum, n) => partialSum + n, 0);

                if (parametersNumber !== parametersValues.length)
                    return false;
                else if (signature.length === 0)
                    return true;

                let typesArray = [];
                for (let i = 0; i < signature.length; i++) {
                    for (let j = 0; j < signature[i].identifiers.length; j++) {
                        typesArray[i + j] = signature[i].type;
                    }
                }

                for (let i = 0; i < typesArray.length; i++) {

                    if ( typesArray[i] instanceof GeneralizedTypeBase &&
                        !scope.typeIncluded(typesArray[i], parametersValues[i].type)) {
                        return false;
                    } else if(typesArray[i] instanceof TypeBase &&
                        !scope.sameType(typesArray[i], parametersValues[i])) {
                        return false;
                    } else if (typesArray[i] instanceof TypeAsData &&
                        !scope.typeIncluded(typesArray[i].type, parametersValues[i].valueType)) {
                        return false;
                    }
                }
                return true;
            });
            return filtered.length > 0 ? filtered[0] :
                (this.parentFunctionStore ? this.parentFunctionsStore.getFunction(name) : null);
        } else {
            return found;
        }
    }
};