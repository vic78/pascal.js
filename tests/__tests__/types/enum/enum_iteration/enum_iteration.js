import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('for to', async () => {
    let pjs = await runFile(import.meta.url, 'enum_iteration.pas');
    expect(pjs.getVarValue('i')).toBe(3);
});

test('for downto', async () => {
    let pjs = await runFile(import.meta.url, 'enum_iteration.pas');
    expect(pjs.getVarValue('j')).toBe(5);
});

test('for with start > end', async () => {
    let pjs = await runFile(import.meta.url, 'enum_iteration.pas');
    expect(pjs.getVarValue('k')).toBe(0);
});