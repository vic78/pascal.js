import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';


test('result key word for records', async () => {
    let pjs = await runFile(import.meta.url, 'record_result.pas');
    expect(pjs.getVarValue('r')).toBe(144.23);
    expect(pjs.getVarValue('i')).toBe(22.244);
});