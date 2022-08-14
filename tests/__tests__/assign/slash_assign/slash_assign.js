
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';

// insp(pjs.engine.tree);

test('plus assign symbol', async () => {
    let pjs = await runFile(import.meta.url, 'slash_assign.pas');
    expect(pjs.getVarValue('a')).toBe(2.54 / 3);
});


