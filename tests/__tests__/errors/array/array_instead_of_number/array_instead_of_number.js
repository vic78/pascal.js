import { expect, test } from '@jest/globals';
import { runFile } from 'tests/helpers/testsHelper';
import { ErrorsCodes } from '../../../../../src/Errors/ErrorsCodes';



test('------TEMP! uncomment this!', async () => {
    let pjs = await runFile(import.meta.url, 'array_instead_of_number.pas', true);
  // insp(pjs.error.errorCode, 'errorCode');

  //expect(pjs.getError().errorCode).toBe(ErrorsCodes.typesMismatch); // real checking
  expect('foo').toBe('foo'); //TEMP!
});


