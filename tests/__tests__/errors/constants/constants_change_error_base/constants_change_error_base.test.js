
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';
import { ErrorsCodes } from 'src/Errors/ErrorsCodes';


test('get error', async () => {
    let pjs = await runFile(import.meta.url, 'constants_change_error_base.pas', true);
    expect(pjs.getError().errorCode).toBe(ErrorsCodes.variableNotDeclared);
});

