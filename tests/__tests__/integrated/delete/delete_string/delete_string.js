
import { runFile } from '../../../../helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('chr function', async () => {
    let pjs = await runFile(import.meta.url, 'delete_string.pas');
    expect(pjs.getVarValue('s')).toBe('a efgh');
});