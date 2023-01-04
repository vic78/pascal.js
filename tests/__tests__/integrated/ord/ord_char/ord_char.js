
import { runFile } from '../../../../helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('ord function', async () => {
    let pjs = await runFile(import.meta.url, 'ord_char.pas');
    expect(pjs.getVarValue('i')).toBe(32);
});