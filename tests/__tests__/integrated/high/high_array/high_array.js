
import { runFile } from '../../../../helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('low function on type', async () => {
    let pjs = await runFile(import.meta.url, 'high_array.pas');
    expect(pjs.getVarValue('c')).toBe('z');
});