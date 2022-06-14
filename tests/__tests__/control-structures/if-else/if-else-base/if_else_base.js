import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('max among 4 values', async () => {
    let pjs = await runFile(import.meta.url, 'if_else_base.pas');
    expect(pjs.getVarValue('max4')).toBe(19);
});