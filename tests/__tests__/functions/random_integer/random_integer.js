import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';


test('integer random function test', async () => {
    let pjs = await runFile(import.meta.url, 'random_integer.pas');
    let res = expect(pjs.getVarValue('a'));
    res.toBeLessThan(23);
    res.toBeGreaterThanOrEqual(0);
});