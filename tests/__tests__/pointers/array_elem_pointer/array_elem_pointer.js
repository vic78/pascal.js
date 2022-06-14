
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';

let pjs = await runFile(import.meta.url, 'array_elem_pointer.pas');
// insp(pjs.engine.tree);

test("write and writeln don't fail", async () => {
  expect(pjs.getVarValue('b')).toBe(32)
});


