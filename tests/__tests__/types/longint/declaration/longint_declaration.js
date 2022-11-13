
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test(`longint declaration`, async () => {
    let pjs = await runFile(import.meta.url, 'longint_declaration.pas');
    expect(pjs.getVarValue('l')).toBe(1996);
});