import { FunctionsStore } from './FunctionsStore.js';

import { Ord } from './Functions/Ord.js';
import { Chr } from './Functions/Chr.js';
import { LowArray } from './Functions/Low/LowArray.js';
import { LowType } from './Functions/Low/LowType.js';
import { HighArray } from './Functions/High/HighArray.js';
import { HighType } from './Functions/High/HighType.js';
import { RandomInteger } from './Functions/Random/RandomInteger.js';
import { RandomReal } from './Functions/Random/RandomReal.js';
import { LengthString } from './Functions/Length/LengthString.js';

import { WriteLn } from './Procedures/WriteLn.js';
import { Write } from './Procedures/Write.js';
import { ReadLn } from './Procedures/ReadLn.js';
import { Read } from './Procedures/Read.js';
import { Randomize } from './Procedures/Randomize.js';
import { Val } from './Procedures/Val/Val.js';
import { ValCode } from './Procedures/Val/ValCode.js';

export class MainFunctionsStore extends FunctionsStore
{
    constructor(input, outputStream, ouputNewLineSymbol)
    {
        super();
        this.items.chr = new Chr;
        this.items.ord = new Ord;
        this.items.random = [ new RandomInteger, new RandomReal ];
        this.items.low = [ new LowArray, new LowType ];
        this.items.high = [ new HighArray, new HighType ];
        this.items.length = [ new LengthString ];

        // Procedures
        this.items.writeln = new WriteLn(outputStream, ouputNewLineSymbol);
        this.items.write = new Write(outputStream);
        this.items.readln = new ReadLn(input, outputStream, ouputNewLineSymbol);
        this.items.read = new Read(input, outputStream, ouputNewLineSymbol);
        this.items.randomize = new Randomize;
        this.items.val = [ new Val, new ValCode ];
    }

    addFunction(name, procedure)
    {
        this.items[name.toLowerCase()] = procedure;
    }
};