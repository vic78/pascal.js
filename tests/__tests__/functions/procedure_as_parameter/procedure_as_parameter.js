
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';


test("write and writeln don't fail", async () => {
    let pjs = await runFile(import.meta.url, 'procedure_as_parameter.pas');
    expect(pjs.getVarValue('a')).toBe(16)
});


