import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

test('array initial values', async () => {
    let pjs = await runFile(import.meta.url, 'array_of_records_tuple.pas');
    expect(pjs.getVarValue('r')).toBe(12.8);
    expect(pjs.getVarValue('s')).toBe(45.2);
});