
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('a is true', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base.pas');
    expect(pjs.getVarValue('a')).toBe(true);
});
test('b is false', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_base.pas');
    expect(pjs.getVarValue('b')).toBe(false);
});


