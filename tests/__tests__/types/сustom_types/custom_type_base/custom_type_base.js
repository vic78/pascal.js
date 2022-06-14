import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test(`a=2 `, async () => {
    let pjs = await runFile(import.meta.url, 'custom_type_base.pas');
    expect(pjs.getVarValue('a')).toBe(2);
});