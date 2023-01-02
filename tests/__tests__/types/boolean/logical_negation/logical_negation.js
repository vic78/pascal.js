
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('true and true = true', async () => {
    let pjs = await runFile(import.meta.url, 'logical_negation.pas');
    expect(pjs.getVarValue('e')).toBe(true);
});