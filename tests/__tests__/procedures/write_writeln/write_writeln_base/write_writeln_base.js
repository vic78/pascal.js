
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';

let pjs = await runFile(import.meta.url, 'write_writeln_base.pas');
// insp(pjs.engine.tree);

test("write and writeln don't fail", async () => {
  expect('test').toBe('test'); // formal assert (just tests that write and writeln don't fail)
});


