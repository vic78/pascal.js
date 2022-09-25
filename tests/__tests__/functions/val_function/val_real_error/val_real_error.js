
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';

test("val function reads reals", async () => {
    let pjs = await runFile(import.meta.url, 'val_real_error.pas');
    expect(pjs.getVarValue('r')).toBe(0);
    expect(pjs.getVarValue('code')).toBe(10);
});


