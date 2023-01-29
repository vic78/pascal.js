
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';


test("write and writeln don't fail", async () => {
    let pjs = await runFile(import.meta.url, 'function_value_exit.pas');
    expect(pjs.getVarValue('a')).toBe(13)
});