import { ConsoleOutput } from "../IO/Output/ConsoleOutput";
import { ConsoleInput } from "../IO/Input/ConsoleInput";

export const config = {
    outputStream: process.stdout,
    ouputNewLineSymbol: "\n",
    listingOutput: new ConsoleOutput(),
    input: new ConsoleInput(),
};