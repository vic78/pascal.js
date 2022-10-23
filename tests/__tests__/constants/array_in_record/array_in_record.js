import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

test('array initial values', async () => {
    let pjs = await runFile(import.meta.url, 'array_in_record.pas');
    expect(pjs.getVarValue('r')).toBe(12.8);
    expect(pjs.getVarValue('s')).toBe(6.0);
    expect(pjs.getVarValue('n')).toBe(4);
    expect(pjs.getVarValue('m')).toBe(2);
});