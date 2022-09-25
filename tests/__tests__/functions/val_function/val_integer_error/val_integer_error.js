
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';

test("val function reads integers", async () => {
    let pjs = await runFile(import.meta.url, 'val_integer_error.pas');
    expect(pjs.getVarValue('i')).toBe(0);
    expect(pjs.getVarValue('code')).toBe(3);
});


