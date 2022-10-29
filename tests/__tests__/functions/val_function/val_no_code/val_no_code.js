
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';

test("val function reads integers", async () => {
    let pjs = await runFile(import.meta.url, 'val_no_code.pas');
    expect(pjs.getVarValue('i')).toBe(5892);
});


