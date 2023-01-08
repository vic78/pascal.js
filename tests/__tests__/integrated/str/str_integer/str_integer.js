
import { runFile } from '../../../../helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('chr function', async () => {
    let pjs = await runFile(import.meta.url, 'str_integer.pas');
    expect(pjs.getVarValue('n')).toBe(34534);
});