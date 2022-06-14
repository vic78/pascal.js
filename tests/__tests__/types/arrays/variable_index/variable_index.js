import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('a1', async () => {
    let pjs = await runFile(import.meta.url, 'variable_index.pas');
    expect(pjs.getVarValue('r')).toBe(23);
});