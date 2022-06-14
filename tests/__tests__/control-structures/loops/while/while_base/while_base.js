
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

let pjs = await runFile(import.meta.url, 'while_base.pas');

test('while loop -- base test ', async () => { 
    expect(pjs.getVarValue('a')).toBe(10);
});



