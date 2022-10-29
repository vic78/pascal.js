
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';


test("write and writeln don't fail", async () => {
    let pjs = await runFile(import.meta.url, 'two_idents_for_type.pas');
    expect(pjs.getVarValue('e')).toBe(152)
});


