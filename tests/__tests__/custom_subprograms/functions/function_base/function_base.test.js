import { expect, test } from '@jest/globals';
import { IntegerDivision } from '../../../../../src/SyntaxAnalyzer/Tree/IntegerDivision';
import { runFile } from '../../../../helpers/testsHelper';


test('b=4', async () => {
    let pjs = await runFile(import.meta.url, 'function_base.pas');
    expect(pjs.getVarValue('b')).toBe(4);
});

test('a=8', async () => {
    let pjs = await runFile(import.meta.url, 'function_base.pas');
    expect(pjs.getVarValue('a')).toBe(8);
});

