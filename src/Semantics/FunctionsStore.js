import { Ord } from './Functions/Ord.js';
import { Chr } from './Functions/Chr.js';

export class FunctionsStore
{
    constructor()
    {
        this.items = {
            chr: new Chr(),
            ord: new Ord()
        };
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
            null;
    }
};