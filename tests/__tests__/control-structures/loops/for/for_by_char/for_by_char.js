import { runFile } from 'tests/helpers/testsHelper';
import { expect, test } from '@jest/globals';


test(`for loop by char "for c := 'A' to 'Z'" `, async () => {
    let pjs = await runFile(import.meta.url, 'for_by_char.pas');
    expect(pjs.getVarValue('a')).toBe('Z');
});
test(`for loop by char "for c := 'a' to 'E'"`, async () => {
    let pjs = await runFile(import.meta.url, 'for_by_char.pas');
    expect(pjs.getVarValue('b')).toBe('e');
});
test(`for loop by char "for  c := 'E' to 'g'"`, async () => {
    let pjs = await runFile(import.meta.url, 'for_by_char.pas');
    expect(pjs.getVarValue('d')).toBe('g');
});
test(`for loop by char  "for c := 'Z' downto 'A' do"`, async () => {
    let pjs = await runFile(import.meta.url, 'for_by_char.pas');
    expect(pjs.getVarValue('e')).toBe('A');
});