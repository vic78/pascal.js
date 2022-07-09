import { FileIO } from './src/IO/FileIO.js';
import { ConsoleOutput } from './src/IO/Output/ConsoleOutput.js';
import { ConsoleInput } from './src/IO/Input/ConsoleInput.js';
import { LexicalAnalyzer } from './src/LexicalAnalyzer/LexicalAnalyzer.js';
import { SyntaxAnalyzer } from './src/SyntaxAnalyzer/SyntaxAnalyzer.js';
import { Engine } from './src/Semantics/Engine.js';
import { RuntimeError } from './src/Errors/RuntimeError.js';
import { config } from './src/PascalJs/demoConfig.js';


var fileIO = new FileIO('example.pas', new ConsoleOutput(), new ConsoleInput());
var lexicalAnalyzer = new LexicalAnalyzer(fileIO);

var symbol = null;

//for (i= 1; i<= 200; i++) {
//    symbol = lexicalAnalyzer.nextSym();
//    console.log(symbol);
//}

var syntaxAnalyzer = new SyntaxAnalyzer(lexicalAnalyzer);
try {
    var tree = syntaxAnalyzer.analyze();
//    console.dir(tree, { depth: null });

    var engine = new Engine(tree, config);
    engine.run()
            .catch((e) => {
        if (e instanceof RuntimeError) {
            fileIO.printListing(e);
        }
    });
//    console.dir(engine.scopes, { depth: null });
//    console.dir(engine.scopes[0].items, { depth: null });
} catch (e) {
    if (e instanceof RuntimeError) {
        fileIO.printListing(e);
    }
}