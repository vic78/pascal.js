
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';

// insp(pjs.engine.tree);

test("write and writeln don't fail", async () => {
    let pjs = await runFile(import.meta.url, 'last_operation_works.pas');
    expect(pjs.getVarValue('i')).toBe(2)
});


