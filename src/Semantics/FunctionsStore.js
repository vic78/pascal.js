export class FunctionsStore
{
    constructor(parentFunctionsStore = null)
    {
        this.parentFunctionsStore = parentFunctionsStore;
        this.items = {};
    }

    addFunction(name, procedure)
    {
        this.items[name.toLowerCase()] = procedure;
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
                    if (!scope.sameType(typesArray[i], parametersValues[i])) {
                        return false;
                    }
                }
                return true;
            });
            return filtered.length > 0 ? filtered[0] : this.parentFunctionsStore.getFunction(name);
        } else {
            return found;
        }
    }
};