import { ConsoleOutput } from "../IO/Output/ConsoleOutput";

export const config = {
    outputStream: process.stdout,
    ouputNewLineSymbol: "\n",
    listingOutput: new ConsoleOutput(),
};