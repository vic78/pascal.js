
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test(`exponential form for reals`, async () => {
    let pjs = await runFile(import.meta.url, 'exponential_form.pas');
    expect(pjs.getVarValue('r')).toBe(-12e-8);
});