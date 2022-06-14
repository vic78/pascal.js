import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';


test('b=4', async () => {
    let pjs = await runFile(import.meta.url, 'procedure_param_by_link.pas');
    expect(pjs.getVarValue('b')).toBe(4);
});

test('a=5', async () => {
    let pjs = await runFile(import.meta.url, 'procedure_param_by_link.pas');
    expect(pjs.getVarValue('a')).toBe(5);
});

