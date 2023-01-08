
import { runFile } from '../../../../helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('chr function', async () => {
    let pjs = await runFile(import.meta.url, 'str_real.pas');
    expect(pjs.getVarValue('r')).toBe(34534.3223);
});