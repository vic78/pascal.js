import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('for loop -- base test ', async () => {
    let pjs = await runFile(import.meta.url, 'for_base.pas');
    expect(pjs.getVarValue('a')).toBe(10);
});