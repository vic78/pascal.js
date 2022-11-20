import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

test('record initial values', async () => {
    let pjs = await runFile(import.meta.url, 'record_tuple_value.pas');
    expect(pjs.getVarValue('r')).toBe(4.6);
    expect(pjs.getVarValue('s')).toBe(2.3);
});