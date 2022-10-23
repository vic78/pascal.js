import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

test('array initial values', async () => {
    let pjs = await runFile(import.meta.url, 'array_tuple.pas');
    expect(pjs.getVarValue('i')).toBe(45);
    expect(pjs.getVarValue('j')).toBe(18);
});