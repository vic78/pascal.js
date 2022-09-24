
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test(`indices on strings`, async () => {
    let pjs = await runFile(import.meta.url, 'indexed_string.pas');
    expect(pjs.getVarValue('r')).toBe(-12e-8);
});