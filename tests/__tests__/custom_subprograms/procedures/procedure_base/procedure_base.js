import { expect, test } from '@jest/globals';
import { getOneVarOutputStreamConfig, TESTING_NEW_LINE_SYMBOL } from '../../../../helpers/output_stream/OneVarOutputStream';


import { runFile } from '../../../../helpers/testsHelper';

const config = getOneVarOutputStreamConfig();
let pjs = await runFile(import.meta.url, 'procedure_base.pas', false, config);

test("check output", async () => {
  expect(config.outputStream.value).toBe('123' + TESTING_NEW_LINE_SYMBOL);
});



