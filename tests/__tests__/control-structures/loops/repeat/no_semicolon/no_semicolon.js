import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('repeat loop -- base test ', async () => {
    let pjs = await runFile(import.meta.url, 'no_semicolon.pas');
    expect(pjs.getVarValue('a')).toBe(118);
});