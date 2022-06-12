import { ProcedureItem } from './ProcedureItem.js';
import { WriteLn } from './Procedures/WriteLn.js';
import { Write } from './Procedures/Write.js';
import { ReadLn } from './Procedures/ReadLn.js';

export class ProceduresStore
{
    constructor(input, outputStream, ouputNewLineSymbol)
    {
        this.items = {
            writeln: new WriteLn(outputStream, ouputNewLineSymbol),
            write: new Write(outputStream),
            readln: new ReadLn(input, outputStream, ouputNewLineSymbol),
        };
    }

    addProcedure(name, procedure)
    {
        this.items[name.toLowerCase()] = procedure;
    }

    getProcedure(name)
    {
        let lowerCaseName = name.toLowerCase();

        return this.items.hasOwnProperty(lowerCaseName) ?
            this.items[lowerCaseName] :
            null;
    }
};