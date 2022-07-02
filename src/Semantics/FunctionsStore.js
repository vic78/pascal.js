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

    getFunction(name)
    {
        let lowerCaseName = name.toLowerCase();

        return this.items.hasOwnProperty(lowerCaseName) ?
            this.items[lowerCaseName] :
            ( this.parentFunctionsStore ? this.parentFunctionsStore.getFunction(name) : null);
    }
};