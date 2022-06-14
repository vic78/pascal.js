import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

test('values', async () => {
    let pjs = await runFile(import.meta.url, 'div_mod_base.pas');
    expect(pjs.getVarValue('a')).toBe(3);
    expect(pjs.getVarValue('b')).toBe(4);
});

test('types', async () => {
    let pjs = await runFile(import.meta.url, 'div_mod_base.pas');
    expect(pjs.getVar('a').typeId).toBe(0);
    expect(pjs.getVar('b').typeId).toBe(0);
});