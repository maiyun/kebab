/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-3-7 23:51:15
 * Last: 2020-3-7 23:51:18, 2022-07-22 14:14:09, 2022-9-27 14:52:19
 */
import * as http from 'http';

// --- 解析命令 ---
const cmds = process.argv.slice(2).join(',');
http.request({
    'hostname': '127.0.0.1',
    'port': 10631,
    'path': '/?' + cmds
}, function(res: http.IncomingMessage) {
    res.on('data', function(chunk: Buffer) {
        const str = chunk.toString();
        if (str === 'Done.') {
            console.log(`Command ${cmds} has been sent.`);
        }
        else {
            console.log('Returns an information exception: ' + str);
        }
    });
}).on('error', function() {
    console.log('RPC Server Error.');
}).end();
