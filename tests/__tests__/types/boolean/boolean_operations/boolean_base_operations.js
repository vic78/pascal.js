
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('true and true = true', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base_operations.pas');
    expect(pjs.getVarValue('e')).toBe(true);
});
test('true and false = false', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base_operations.pas');
    expect(pjs.getVarValue('f')).toBe(false);
});
test('true or b', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base_operations.pas');
    expect(pjs.getVarValue('g')).toBe(true);
});
test('a or b', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base_operations.pas');
    expect(pjs.getVarValue('h')).toBe(true);
});
test('a and b', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base_operations.pas');
    expect(pjs.getVarValue('m')).toBe(false);
});
test('h or a and b', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base_operations.pas');
    expect(pjs.getVarValue('n')).toBe(true);
});
test('not b = false', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base_operations.pas');
    expect(pjs.getVarValue('k')).toBe(true);
});
test('not a = true', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base_operations.pas');
    expect(pjs.getVarValue('y')).toBe(false);
});