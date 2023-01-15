import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';


test('factorial calculation', async () => {
    let pjs = await runFile(import.meta.url, 'factorial_one.pas');
    expect(pjs.getVarValue('i')).toBe(5040);
});