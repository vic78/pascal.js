import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('repeat loop -- base test ', async () => {
    let pjs = await runFile(import.meta.url, 'repeat_base.pas');
    expect(pjs.getVarValue('a')).toBe(10);
});