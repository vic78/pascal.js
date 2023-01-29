
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';

// insp(pjs.engine.tree);

test('plus assign symbol', async () => {
    let pjs = await runFile(import.meta.url, 'string_plus_assign.pas');
    expect(pjs.getVarValue('a')).toBe('abcdef');
});


