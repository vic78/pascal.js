
import { runFile } from '../../../../helpers/testsHelper';
import { expect, test } from '@jest/globals';


test('low function on type', async () => {
    let pjs = await runFile(import.meta.url, 'low_type.pas');
    expect(pjs.getVarValue('c')).toBe('l');
});

