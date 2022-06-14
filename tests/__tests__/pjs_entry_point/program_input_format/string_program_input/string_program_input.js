
import { runString, getFileContent } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';

const programCode = getFileContent(import.meta.url, 'string_program_input.pas');

// insp(engine.scopes);

test('a', async () => {
    let pjs = await runString(programCode);
    expect(pjs.getVarValue('a')).toBe(123);
});

