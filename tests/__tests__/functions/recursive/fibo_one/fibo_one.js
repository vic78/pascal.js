import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';


test('fobonacci numbers', async () => {
    let pjs = await runFile(import.meta.url, 'fibo_one.pas');
    expect(pjs.getVarValue('i')).toBe(13);
});