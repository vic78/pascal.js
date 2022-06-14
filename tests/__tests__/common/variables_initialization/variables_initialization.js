import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';
// insp(engine.scopes);

test('a', async () => {
    let pjs = await runFile(import.meta.url, 'variables_initialization.pas');
    expect(pjs.getVarValue('i')).toBe(1555);
    expect(pjs.getVarValue('k')).toBe(1555);
});