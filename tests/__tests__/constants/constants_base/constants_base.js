import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

test('a', async () => {
    let pjs = await runFile(import.meta.url, 'constants_base.pas');
    expect(pjs.getVarValue('a')).toBe(123);
});