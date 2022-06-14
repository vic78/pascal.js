import { expect, test } from '@jest/globals';
import { ErrorsCodes } from 'src/Errors/ErrorsCodes';
import { runFile } from 'tests/helpers/testsHelper';


test('get error', async () => {
    let pjs = await runFile(import.meta.url, 'scalar_value_instead_of_array.pas', true);
    expect(pjs.getError().errorCode).toBe(ErrorsCodes.typesMismatch);
});