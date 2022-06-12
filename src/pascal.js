
import { FileIO } from '../src/IO/FileIO.js';
import { ConsoleOutput } from '../src/IO/Output/ConsoleOutput.js';
import { ConsoleInput } from '../src/IO/Input/ConsoleInput.js';
import { LexicalAnalyzer } from '../src/LexicalAnalyzer/LexicalAnalyzer.js';
import { SyntaxAnalyzer } from '../src/SyntaxAnalyzer/SyntaxAnalyzer.js';
import { Engine } from '../src/Semantics/Engine.js';
import { PascalJs } from './PascalJs/PascalJs.js';

export { FileIO, ConsoleInput, ConsoleOutput, LexicalAnalyzer,
    SyntaxAnalyzer, Engine, PascalJs }