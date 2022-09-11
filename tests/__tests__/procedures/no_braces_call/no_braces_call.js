
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';


test("procedure might be called with no braces", async () => {
    let pjs = await runFile(import.meta.url, 'no_braces_call.pas');
    expect(pjs.getVarValue('i')).toBe(144);
});


