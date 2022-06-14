

import { ErrorsCodes } from '../../../../../src/Errors/ErrorsCodes';
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';


test('for loop -- base break test ', async () => {
    let pjs = await runFile(import.meta.url, 'break_base.pas');
    expect(pjs.getVarValue('a')).toBe(7);
});

test('while loop -- base break test ', async () => {
    let pjs = await runFile(import.meta.url, 'break_base.pas');
    expect(pjs.getVarValue('b')).toBe(8);
});

test('repeat loop -- base break test ', async () => {
    let pjs = await runFile(import.meta.url, 'break_base.pas');
    expect(pjs.getVarValue('c')).toBe(9);
});


