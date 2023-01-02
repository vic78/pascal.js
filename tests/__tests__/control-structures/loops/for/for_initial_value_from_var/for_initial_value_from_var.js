import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('for loop gets initala value from a variable', async () => {
    let pjs = await runFile(import.meta.url, 'for_initial_value_from_var.pas');
    expect(pjs.getVarValue('a')).toBe(8);
    expect(pjs.getVarValue('b')).toBe(3);
});