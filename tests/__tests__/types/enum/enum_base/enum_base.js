
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('a is "apple"', async () => {
    let pjs = await runFile(import.meta.url, 'enum_base.pas');
    expect(pjs.getVarValue('a')).toBe('apple');
});

test('a > b', async () => {
    let pjs = await runFile(import.meta.url, 'enum_base.pas');
    expect(pjs.getVarValue('f')).toBe(false);
});

test('a = a', async () => {
    let pjs = await runFile(import.meta.url, 'enum_base.pas');
    expect(pjs.getVarValue('g')).toBe(true);
});

test('a <= b', async () => {
    let pjs = await runFile(import.meta.url, 'enum_base.pas');
    expect(pjs.getVarValue('e')).toBe(true);
});

test('a <> b', async () => {
    let pjs = await runFile(import.meta.url, 'enum_base.pas');
    expect(pjs.getVarValue('h')).toBe(true);
});

test('a < b', async () => {
    let pjs = await runFile(import.meta.url, 'enum_base.pas');
    expect(pjs.getVarValue('m')).toBe(true);
});

