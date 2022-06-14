
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';


test("write and writeln don't fail", async () => {
    let pjs = await runFile(import.meta.url, 'return_array.pas');
    expect(pjs.getVarValue('e')).toBe(152)
});


