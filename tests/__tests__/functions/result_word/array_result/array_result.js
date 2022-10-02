import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';


test('result key word for arrays', async () => {
    let pjs = await runFile(import.meta.url, 'array_result.pas');
    expect(pjs.getVarValue('i')).toBe(144);
});