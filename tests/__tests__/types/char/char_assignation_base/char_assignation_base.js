
import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test(`char assignation base `, async () => {
    let pjs = await runFile(import.meta.url, 'char_assignation_base.pas');
    expect(pjs.getVarValue('a')).toBe('B');
});