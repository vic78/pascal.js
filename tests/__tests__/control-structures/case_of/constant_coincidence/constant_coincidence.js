
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('test case constant branch', async () => {
    let pjs = await runFile(import.meta.url, 'constant_coincidence.pas');
    expect(pjs.getVarValue('m')).toBe(21);
});
