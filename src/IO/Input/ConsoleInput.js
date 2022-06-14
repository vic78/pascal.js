import fs from 'fs';

export class ConsoleInput
{
    async getChar()
    {
        let code = this.getByte();

        let bytesArray = [code];
        let bytesToRead = 0;

        if (( 0b11000000 & code ) === 0b11000000 &&
            ( 0b00100000 & code ) === 0) {
            bytesToRead = 1;
        } else if (( 0b11100000 & code ) === 0b11100000 &&
            ( 0b00010000 & code ) === 0) {
            bytesToRead = 2;
        } else if (( 0b11110000 & code ) === 0b11110000 &&
            ( 0b00001000 & code ) === 0) {
            bytesToRead = 3;
        }

        for (let i = 1; i <= bytesToRead; i++) {
            bytesArray[i] = this.getByte();
        }

        let buffer = Buffer.from(bytesArray);
        return buffer.toString('utf8');
    }

    getByte()
    {
        let buffer = Buffer.alloc(1);
        let length = fs.readSync(0, buffer, 0, 1);
        return buffer.readUInt8(0);
    }
}
