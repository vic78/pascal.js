import { config as defaultConfig} from '../../../../../src/PascalJs/demoConfig';
import { expect, test } from '@jest/globals';
import { runFile } from '../../../../helpers/testsHelper';
class MyOutputStream {
  constructor() {
    this.value = '';
  }

  write(str) {
    this.value += str;
  }
}

let output = new MyOutputStream();
let ouputNewLineSymbol = '!!!'; // or as usual \n
const config = {
  ...defaultConfig,
  outputStream: output,
  ouputNewLineSymbol,
};

test("check custom output stream saves data", async () => {
    let pjs = await runFile(import.meta.url, 'custom_output_stream_base.pas', false, config);
    expect(output.value).toBe('write1 77writeln 77' + ouputNewLineSymbol);
});