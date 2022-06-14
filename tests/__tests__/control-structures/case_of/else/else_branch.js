
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

// insp(engine.scopes);

test('test case else branch', async () => {
    let pjs = await runFile(import.meta.url, 'else_branch.pas');
    expect(pjs.getVarValue('m')).toBe(29);
});