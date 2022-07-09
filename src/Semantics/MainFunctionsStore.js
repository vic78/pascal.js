import { FunctionsStore } from './FunctionsStore.js';

import { Ord } from './Functions/Ord.js';
import { Chr } from './Functions/Chr.js';
import { RandomInteger } from './Functions/Random/RandomInteger.js';
import { RandomReal } from './Functions/Random/RandomReal.js';

import { WriteLn } from './Procedures/WriteLn.js';
import { Write } from './Procedures/Write.js';
import { ReadLn } from './Procedures/ReadLn.js';
import { Read } from './Procedures/Read.js';
import { Randomize } from './Procedures/Randomize.js';

export class MainFunctionsStore extends FunctionsStore
{
    constructor(input, outputStream, ouputNewLineSymbol)
    {
        super();
        this.items.chr = new Chr;
        this.items.ord = new Ord;
        this.items.random = [ new RandomInteger, new RandomReal ];

        // Procedures
        this.items.writeln = new WriteLn(outputStream, ouputNewLineSymbol);
        this.items.write = new Write(outputStream);
        this.items.readln = new ReadLn(input, outputStream, ouputNewLineSymbol);
        this.items.read = new Read(input, outputStream, ouputNewLineSymbol);
        this.items.randomize = new Randomize;
    }

    addFunction(name, procedure)
    {
        this.items[name.toLowerCase()] = procedure;
    }
};