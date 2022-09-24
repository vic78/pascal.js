
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';


test("function length for strings", async () => {
    let pjs = await runFile(import.meta.url, 'length_string.pas');
    expect(pjs.getVarValue('l')).toBe(10);
});


