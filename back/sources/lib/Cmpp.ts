import * as net from "net";
// --- 库和定义 ---
import * as Text from "~/lib/Text";
import * as Crypto from "~/lib/Crypto";
// --- 自己 ---
import * as cmds from "./Cmpp/cmds";

export class Connection {

}

function _getBuf(header: any, body: any) {
    header.Total_Length = 12;
    let headBuf, bodyBuf;
    if (body) {
        bodyBuf = _getBodyBuffer(header.Command_Id, body);
        header.Total_Length += bodyBuf.length;
    }
    headBuf = _getHeaderBuffer(header);
    if (bodyBuf) {
        return Buffer.concat([headBuf, bodyBuf]);
    } else {
        return headBuf;
    }
}

function _getBodyBuffer(cmd: number, body: any): Buffer {
    let buffer = Buffer.alloc(1024 * 1024, 0);
    let desc = cmds.desc[(<any>cmds.id)[cmd]];
    let bodyLength = 0;
    for (let field of desc) {
        let length = bodyLength;
        let fieldLength: number = typeof field.length === "number" ? field.length : field.length(body);
        let value = body[field.name];
        bodyLength = length + fieldLength;
        if (value instanceof Buffer) {
            value.copy(buffer, length, 0, fieldLength);
        } else {
            if (field.type === "number") {
                let bitLength = fieldLength * 8;
                let method = "writeUInt" + bitLength + "BE";
                if (bitLength === 8) {
                    method = "writeUInt" + bitLength;
                }
                (<any>buffer)[method](value, length);
            } else {
                buffer.write(value, length, fieldLength, "ascii");
            }
        }
    }
    return buffer.slice(0, bodyLength);
}

function _getHeaderBuffer(header: any) {
    let buffer = Buffer.alloc(12);
    buffer.writeUInt32BE(header.Total_Length, 0);
    buffer.writeUInt32BE(header.Command_Id, 4);
    buffer.writeUInt32BE(header.Sequence_Id, 8);
    return buffer;
}

/** 获取时间戳 */
function _getTimestamp(): string {
    let nowDate = new Date();
    return Text.pad(nowDate.getMonth() + 1) + Text.pad(nowDate.getDate()) + Text.pad(nowDate.getHours()) + Text.pad(nowDate.getMinutes()) + Text.pad(nowDate.getSeconds());
}

/** 获取认证信息 */
function _getAuthenticatorSource(spId: string, secret: string, timestamp: string) {
    let buffer = Buffer.alloc(31, 0);
    buffer.write(spId, 0, 6, "ascii");
    buffer.write(secret, 15, 21, "ascii");
    buffer.write(timestamp, 21, 10, "ascii");
    return Crypto.md516(buffer);
}

/** 临时 buffer 变量 */
let _bufferCache!: Buffer;

function _fetchData(obj: any) {
    if (_bufferCache.length < 12) {
        return false;
    }
    obj.header = {
        Total_Length: _bufferCache.readUInt32BE(0),
        Command_Id: _bufferCache.readUInt32BE(4),
        Sequence_Id: _bufferCache.readUInt32BE(8)
    };
    if (_bufferCache.length < obj.header.Total_Length) {
        return false;
    }
    obj.buffer = _bufferCache.slice(0, obj.header.Total_Length);
    _bufferCache = _bufferCache.slice(obj.header.Total_Length);
    return true;
}

export function test() {
    let socket = net.createConnection(0, "x", function() {
        let timestamp = _getTimestamp();
        // --- body ---
        let buf = _getBuf({
            Sequence_Id: 1,
            Command_Id: cmds.id.CMPP_CONNECT
        }, {
            Source_Addr: "X",
            AuthenticatorSource: _getAuthenticatorSource("X", "X", timestamp),
            Version: 0x20,
            Timestamp: parseInt(timestamp)
        });
        socket.write(buf);
    }).on("data", function(buffer) {
        if (!_bufferCache) {
            _bufferCache = buffer;
        } else {
            _bufferCache = Buffer.concat([_bufferCache, buffer]);
        }
        let obj = { header: undefined, buffer: undefined };
        while (_fetchData(obj)) {
            // _handleBuffer(obj.buffer, obj.header);
        }
    });
}
