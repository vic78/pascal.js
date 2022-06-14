
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';


test("write and writeln don't fail", async () => {
    let pjs = await runFile(import.meta.url, 'run_returned_function.pas');
    expect(pjs.getVarValue('a')).toBe(8)
});


