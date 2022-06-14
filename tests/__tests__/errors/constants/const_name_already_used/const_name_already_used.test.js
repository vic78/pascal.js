
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';
import { ErrorsCodes } from 'src/Errors/ErrorsCodes';

test('get error', async () => {
    let pjs = await runFile(import.meta.url, 'const_name_already_used.pas', true);
    expect(pjs.getError().errorCode).toBe(ErrorsCodes.identifierAlreadyUsed);
});

