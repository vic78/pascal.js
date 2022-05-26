import { ProcedureItem } from './ProcedureItem';
import { WriteLn } from './Procedures/WriteLn';
import { Write } from './Procedures/Write';
import { ReadLn } from './Procedures/ReadLn';

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