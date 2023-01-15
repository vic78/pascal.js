import { FunctionsStore } from './FunctionsStore.js';

import { OrdChar } from './Functions/Ord/OrdChar.js';
import { ChrInteger } from './Functions/Chr/ChrInteger.js';
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
import { StrInt } from './Procedures/Str/StrInt.js';
import { StrReal } from './Procedures/Str/StrReal.js';
import { DeleteString } from './Procedures/Delete/DeleteString.js';
import { IncInteger } from './Procedures/Inc/IncInteger.js';
import { IncIntegerTwo } from './Procedures/Inc/IncIntegerTwo.js';

export class MainFunctionsStore extends FunctionsStore
{
    constructor(input, outputStream, ouputNewLineSymbol)
    {
        super();
        this.items.chr = [ new ChrInteger ];
        this.items.ord = [ new OrdChar ];
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
        this.items.str = [ new StrInt, new StrReal ];
        this.items.delete = [ new DeleteString ];
        this.items.inc = [ new IncIntegerTwo, new IncInteger ];
    }

    addFunction(name, procedure)
    {
        this.items[name.toLowerCase()] = procedure;
    }
};