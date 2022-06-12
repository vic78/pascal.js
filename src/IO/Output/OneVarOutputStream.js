export class OneVarOutputStream {
    constructor() {
        this.value = '';
    }

    write(str) {
        this.value += str;
    }
}