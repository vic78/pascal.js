
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';

test("val function reads reals", async () => {
    let pjs = await runFile(import.meta.url, 'val_real.pas');
    expect(pjs.getVarValue('r')).toBe(-118.2e-4);
    expect(pjs.getVarValue('code')).toBe(0);
});


