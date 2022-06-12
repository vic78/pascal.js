import { ConsoleOutput } from '../IO/Output/ConsoleOutput.js';
import { ConsoleInput } from '../IO/Input/ConsoleInput.js';

export const config = {
    outputStream: process.stdout,
    ouputNewLineSymbol: "\n",
    listingOutput: new ConsoleOutput(),
    input: new ConsoleInput(),
};