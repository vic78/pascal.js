import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

test('1 + 5 * 3 = 16', async () => {
    let pjs = await runFile(import.meta.url, 'base_arightm_operations_order.pas');
    expect(pjs.getVarValue('a')).toBe(16);
});

test('25 - 3 * 2 = 19', async () => {
    let pjs = await runFile(import.meta.url, 'base_arightm_operations_order.pas');
    expect(pjs.getVarValue('b')).toBe(19);
});

test('5 - 2/2 + 4 = 8', async () => {
    let pjs = await runFile(import.meta.url, 'base_arightm_operations_order.pas');
    expect(pjs.getVarValue('z')).toBe(8);
});