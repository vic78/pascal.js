import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

test('1 + 5 * 3 = 16', async () => {
    let pjs = await runFile(import.meta.url, 'unary_minus.pas');
    expect(pjs.getVarValue('a')).toBe(-22);
});
