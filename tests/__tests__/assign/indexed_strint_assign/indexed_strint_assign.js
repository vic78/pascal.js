
import { expect, test } from '@jest/globals';
import { runFile } from '../../../helpers/testsHelper';

test('assign char to indexed string', async () => {
    let pjs = await runFile(import.meta.url, 'indexed_strint_assign.pas');
    expect(pjs.getVarValue('c')).toBe('p');
});


