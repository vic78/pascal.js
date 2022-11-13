
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test(`assign value to longint from integer`, async () => {
    let pjs = await runFile(import.meta.url, 'longint_assignation.pas');
    expect(pjs.getVarValue('l')).toBe(1996);
});