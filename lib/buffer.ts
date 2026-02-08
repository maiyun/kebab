/** --- 读对象 --- */
export class Reader {

    private readonly _buffer: Buffer;

    /** --- 当前读取位置 --- */
    private _offset: number = 0;

    public constructor(buffer: Buffer) {
        this._buffer = buffer;
    }

    /** --- 读取一个无符号 8 位整数, BYTE --- */
    public readUInt8(): number {
        const value = this._buffer.readUInt8(this._offset);
        this._offset += 1;
        return value;
    }

    /** --- 读取一个无符号 16 位整数（大端模式），WORD --- */
    public readUInt16BE(): number {
        const value = this._buffer.readUInt16BE(this._offset);
        this._offset += 2;
        return value;
    }

    /** --- 读取一个无符号 16 位整数（小端模式） --- */
    public readUInt16LE(): number {
        const value = this._buffer.readUInt16LE(this._offset);
        this._offset += 2;
        return value;
    }

    /** --- 读取一个无符号 32 位整数（大端模式）, DWORD --- */
    public readUInt32BE(): number {
        const value = this._buffer.readUInt32BE(this._offset);
        this._offset += 4;
        return value;
    }

    /** --- 读取一个无符号 32 位整数（小端模式） --- */
    public readUInt32LE(): number {
        const value = this._buffer.readUInt32LE(this._offset);
        this._offset += 4;
        return value;
    }

    /** --- 读取一个 BCD 编码的字符串（每个字节表示两个数字）--- */
    public readBCDString(length?: number): string {
        length ??= this._buffer.length - this._offset;
        let str = '';
        for (let i = 0; i < length; i++) {
            const byte = this._buffer.readUInt8(this._offset + i);
            str += (byte >> 4).toString(16).toUpperCase(); // --- 高四位表示第一个数字 ---
            str += (byte & 0x0f).toString(16).toUpperCase(); // --- 低四位表示第二个数字 ---
        }
        this._offset += length;
        return str;
    }

    /** --- 读取普通 string --- */
    public readString(length?: number, encoding: BufferEncoding = 'utf8'): string {
        length ??= this._buffer.length - this._offset;
        const str = this._buffer.toString(encoding, this._offset, this._offset + length);
        this._offset += length;
        return str.replace(/\0/g, '');
    }

    /** --- 读取 Buffer --- */
    public readBuffer(length?: number): Buffer {
        length ??= this._buffer.length - this._offset;
        return this._buffer.subarray(this._offset, this._offset += length);
    }

    /** --- 获取完整的 buffer 长度 --- */
    public length(): number {
        return this._buffer.length;
    }

}

/** --- 写对象 --- */
export class Writer {

    private readonly _buffer: Buffer;

    /** --- 当前读取位置 --- */
    private _offset: number = 0;

    public constructor(size: number) {
        this._buffer = Buffer.alloc(size);
    }

    /** --- [1 字节] 写入一个无符号 8 位整数 --- */
    public writeUInt8(value: number): void {
        this._buffer.writeUInt8(value, this._offset);
        this._offset += 1;
    }

    /** --- [2 字节] 写入一个无符号 16 位整数（大端模式） --- */
    public writeUInt16BE(value: number): void {
        this._buffer.writeUInt16BE(value, this._offset);
        this._offset += 2;
    }

    /** --- [4 字节] 写入一个无符号 32 位整数（大端模式） --- */
    public writeUInt32BE(value: number): void {
        this._buffer.writeUInt32BE(value, this._offset);
        this._offset += 4;
    }

    /** --- [每字节 2 数字] 写入一个 BCD 编码的字符串（仅支持数字） --- */
    public writeBCDString(value: string): void {
        if (value.length % 2 !== 0) {
            value = '0' + value;
        }
        for (let i = 0; i < value.length; i += 2) {
            const high = parseInt(value[i], 10);    // --- 取十位 ---
            const low = parseInt(value[i + 1], 10); // --- 取个位 ---
            const byte = (high << 4) | low;         // --- 拼接为一个字节 ---
            this.writeUInt8(byte);
        }
    }

    /** --- 写入普通字符串，返回写入的长度 --- */
    public writeString(value: string, encoding: BufferEncoding = 'utf8'): number {
        const len = this._buffer.write(value, this._offset, encoding);
        this._offset += len;
        return len;
    }

    /** --- 返回 Buffer 对象 --- */
    public get(): Buffer {
        return this._buffer.subarray(0, this._offset);
    }

}

/**
 * --- Buffer Reader 对象 ---
 * @param buffer 要读取的 buffer
 */
export function getReader(buffer: Buffer): Reader {
    return new Reader(buffer);
}

/**
 * --- Buffer Writer 对象 ---
 * @param size 缓冲区大小
 */
export function getWriter(size: number): Writer {
    return new Writer(size);
}
