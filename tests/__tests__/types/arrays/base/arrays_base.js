import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('a1', async () => {
    let pjs = await runFile(import.meta.url, 'arrays_base.pas');
    expect(pjs.getVarValue('a1')).toBe(5);
});

test('a2', async () => {
    let pjs = await runFile(import.meta.url, 'arrays_base.pas');
    expect(pjs.getVarValue('a2')).toBe(4);
});



