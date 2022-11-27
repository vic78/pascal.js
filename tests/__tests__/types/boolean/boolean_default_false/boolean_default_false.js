
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('a is true', async () => {
    let pjs = await runFile(import.meta.url, 'boolean_default_false.pas');
    expect(pjs.getVarValue('i')).toBe(4);
});



