
import { runFile } from '../../../../helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('low function on type', async () => {
    let pjs = await runFile(import.meta.url, 'inc_integer.pas');
    expect(pjs.getVarValue('i')).toBe(17);
});