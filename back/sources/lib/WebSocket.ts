// --- 库和定义 ---
import * as abs from "~/abstract";

export interface OutData {
    fin: number;
    opcode: number;
    mask: number;
    payloadLength: number;
    maskingKey: number[];
    payloadData: any;
}

export interface InData {
    fin: number;
    opcode: number;
    payloadData: any;
}

export interface Events {
    onData?: (data: string) => any;
    onClose?: () => any;
}

/**
 * --- 接收的数据解密 ---
 * @param e 要解密的 Buffer
 */
export function decodeDataFrame(e: Buffer): OutData {
    let i = 0, j, s: any, frame: OutData = {
        // 解析前两个字节的基本数据
        fin: e[i] >> 7,
        opcode: e[i++] & 15,
        mask: e[i] >> 7,
        maskingKey: [],
        payloadLength: e[i++] & 0x7F,
        payloadData: ""
    };
    // --- 处理特殊长度 126 和 127 ---
    if (frame.payloadLength === 126) {
        frame.payloadLength = (e[i++] << 8) + e[i++];
    }
    if (frame.payloadLength === 127) {
        i += 4, // 长度一般用四字节的整型，前四个字节通常为长整形留空的
        frame.payloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
    }
    // --- 判断是否使用掩码 ---
    if (frame.mask) {
        // 获取掩码实体
        frame.maskingKey = [e[i++], e[i++], e[i++], e[i++]];
        // 对数据和掩码做异或运算
        for (j = 0, s = []; j < frame.payloadLength; j++) {
            s.push(e[i + j] ^ frame.maskingKey[j % 4]);
        }
    } else {
        s = e.slice(i, frame.payloadLength); // 否则直接使用数据
    }
    // 数组转换成缓冲区来使用
    let ss: any = Buffer.from(s);
    // 如果有必要则把缓冲区转换成字符串来使用
    if (frame.opcode === 1) {
        ss = ss.toString();
    }
    // 设置上数据部分
    frame.payloadData = ss;
    // 返回数据帧
    return frame;
}

/**
 * --- 加密要发送的数据 ---
 * @param e 数据
 */
export function encodeDataFrame(e: InData): Buffer {
    let s = [], o = Buffer.from(e.payloadData), l = o.length;
    // 输入第一个字节
    s.push((e.fin << 7) + e.opcode);
    // 输入第二个字节，判断它的长度并放入相应的后续长度消息
    // 永远不使用掩码
    if (l < 126) {
        s.push(l);
    } else if (l < 0x10000) {
        s.push(126, (l & 0xFF00) >> 8, l & 0xFF);
    } else {
        s.push(127, 0, 0, 0, 0, // 8字节数据，前4字节一般没用留空
        (l & 0xFF000000) >> 6, ( l & 0xFF0000) >> 4, ( l & 0xFF00) >> 8, l & 0xFF);
    }
    // 返回头部分和数据部分的合并缓冲区
    return Buffer.concat([Buffer.from(s), o]);
}

/**
 * --- 发送数据 ---
 * @param nus Nus 对象
 * @param data 要发送的字符串
 */
export function send(nus: abs.Nus, data: any) {
    let sendData: string = "";
    if (typeof data === "string") {
        sendData = data;
    } else if (typeof data === "boolean") {
        // --- 返回了 true，无需处理 ---
    } else {
        let json: any = {};
        if ((data[0] !== undefined) && (typeof data[0] === "number")) {
            json = {"result": data[0]};
            if (data[1] !== undefined) {
                if (typeof data[1] === "object") {
                    Object.assign(json, data[1]);
                    sendData = JSON.stringify(json);
                } else {
                    if (data.length === 2) {
                        json.msg = data[1];
                        sendData = JSON.stringify(json);
                    } else {
                        sendData = JSON.stringify({"result": 0, "msg": "500 Internal Server Error(Return value is wrong)."});
                    }
                }
            } else {
                sendData = JSON.stringify(json);
            }
        } else {
            sendData = JSON.stringify(data);
        }
    }
    nus.socket.write(encodeDataFrame({
        fin: 1,
        opcode: 1,
        payloadData: sendData
    }));
}

/**
 * --- 给客户端发送关闭消息 ---
 * @param nus Nus 对象
 */
export function close(nus: abs.Nus) {
    nus.socket.write(encodeDataFrame({
        fin: 1,
        opcode: 8,
        payloadData: ""
    }));
}

/**
 * --- 绑定本次连接事件 ---
 * @param nus Nus 对象
 * @param events 事件列表
 */
export function on(nus: abs.Nus, events: Events = {}) {
    if (events.onData === undefined) {
        events.onData = function(data: string) {};
    }
    if (events.onClose === undefined) {
        events.onClose = function() {};
    }
    nus.socket.on("data", async function(chunk: Buffer) {
        let data = decodeDataFrame(chunk);
        if (data.opcode === 8) {
            nus.socket.end();
        } else {
            if (!events.onData) {
                return;
            }
            let rtn = await events.onData(data.payloadData);
            if (rtn !== undefined) {
                send(nus, rtn);
            }
        }
    });
    nus.socket.on("close", async function() {
        events.onClose && await events.onClose();
    });
}