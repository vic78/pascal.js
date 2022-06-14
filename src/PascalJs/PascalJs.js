
import { FileIO } from '../IO/FileIO.js';
import { StringIO } from '../IO/StringIO.js';
import { ConsoleOutput } from '../IO/Output/ConsoleOutput.js';
import { LexicalAnalyzer } from '../LexicalAnalyzer/LexicalAnalyzer.js';
import { SyntaxAnalyzer } from '../SyntaxAnalyzer/SyntaxAnalyzer.js';
import { Engine } from '../Semantics/Engine.js';
import { RuntimeError } from '../Errors/RuntimeError.js';
import { config } from './demoConfig.js';
import { TypesIds } from '../Semantics/Variables/TypesIds.js';

export class PascalJs {
    /**
     * @type Engine
     */
    engine;

    /**
     * @type RuntimeError
     */
    error;

    constructor(config) {
        this.config = config;
    }

    async runFile(filePath) {

        try {
            var fileIO = new FileIO(filePath,
                this.config.listingOutput,
                this.config.input,
            );
            var lexicalAnalyzer = new LexicalAnalyzer(fileIO);
            var syntaxAnalyzer = new SyntaxAnalyzer(lexicalAnalyzer);
            var tree = syntaxAnalyzer.analyze();
            var engine = new Engine(tree, this.config);
            await engine.run();
        } catch (e) {

            if (e instanceof RuntimeError) {
                this.error = e;
            } else throw e;
        }


        this.engine = engine;
        return engine;
    }

    async runString(programText) {

        try {
            var fileIO = new StringIO(programText,
                this.config.listingOutput
            );
            var lexicalAnalyzer = new LexicalAnalyzer(fileIO);
            var syntaxAnalyzer = new SyntaxAnalyzer(lexicalAnalyzer);
            var tree = syntaxAnalyzer.analyze();
            var engine = new Engine(tree, this.config);
            await engine.run();
        } catch (e) {

            if (e instanceof RuntimeError) {
                this.error = e;
            } else throw e;
        }

        this.engine = engine;
        return engine;
    }

    getVar(varName) {
        return this.engine.getCurrentScope().items[varName];
    }

    getVarValue(varName) {
        let variable = this.getVar(varName);

        if (variable.typeId === TypesIds.ARRAY) {
            return this.getVar(varName).items;
        } else  if (variable.typeId === TypesIds.ENUM) {
            return this.getVar(varName).value.symbol.stringValue;
        } else {
            return this.getVar(varName).value;
        }
    }

    getError() {
       return this.error;
    }
}