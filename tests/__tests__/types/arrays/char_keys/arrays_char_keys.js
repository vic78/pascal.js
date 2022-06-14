import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('a1', async () => {
    let pjs = await runFile(import.meta.url, 'arrays_char_keys.pas');
    expect(pjs.getVarValue('a1')).toBe(10);
});



