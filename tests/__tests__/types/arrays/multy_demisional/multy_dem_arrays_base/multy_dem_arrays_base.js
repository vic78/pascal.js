import { expect, test } from '@jest/globals';
import { runFile } from 'tests/helpers/testsHelper';


test('a3', async () => {
    let pjs = await runFile(import.meta.url, 'multy_dem_arrays_base.pas');
    expect(pjs.getVarValue('a3')).toBe(5);
});

test('b3', async () => {
    let pjs = await runFile(import.meta.url, 'multy_dem_arrays_base.pas');
    expect(pjs.getVarValue('b3')).toBe(5);
});