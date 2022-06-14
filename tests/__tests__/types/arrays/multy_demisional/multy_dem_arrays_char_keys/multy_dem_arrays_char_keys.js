
import { expect, test } from '@jest/globals';
import { runFile } from 'tests/helpers/testsHelper';


test('a1', async () => {
    let pjs = await runFile(import.meta.url, 'multy_dem_arrays_char_keys.pas');
    expect(pjs.getVarValue('a1')).toBe(10);
});