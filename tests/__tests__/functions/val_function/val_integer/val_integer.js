
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';

test("val function reads integers", async () => {
    let pjs = await runFile(import.meta.url, 'val_integer.pas');
    expect(pjs.getVarValue('i')).toBe(5892);
    expect(pjs.getVarValue('code')).toBe(0);
});


