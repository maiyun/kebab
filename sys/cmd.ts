/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-3-7 23:51:15
 * Last: 2020-3-7 23:51:18, 2022-07-22 14:14:09, 2022-9-27 14:52:19, 2023-5-23 21:42:46, 2024-7-2 15:12:28
 */
import * as http from 'http';
import * as lFs from '~/lib/fs';
import * as lText from '~/lib/text';
import * as def from '~/sys/def';

// --- 解析命令 ---
const cmds = process.argv.slice(2);
const cmdsJoin = cmds.join(',');

if (cmds[0] === '--ind' || cmds[0] === '-i') {
    // --- 运行独立文件，如 node ./index --ind gps ---
    (async function() {
        if (!await lFs.isFile(def.IND_PATH + cmds[1] + '/index.js')) {
            console.log('CMD ERROR', 'IND FILE "' + cmds[1] + '" NOT FOUND.');
            return;
        }
        // --- 载入独立文件入口 ---
        import('../ind/' + cmds[1] + '/index');
    })().catch(function(err) {
        console.log('CMD ERROR', err);
    });
}
else {
    // --- 其他，如 node ./index reload 或 restart ---
    (async function() {
        // --- 读取配置文件 ---
        const configContent = await lFs.getContent(def.CONF_PATH + 'config.json', 'utf8');
        if (!configContent) {
            throw `File '${def.CONF_PATH}config.json' not found.`;
        }
        /** --- 系统 config.json --- */
        const config = lText.parseJson(configContent);

        http.request({
            'hostname': '127.0.0.1',
            'port': config.rpcPort,
            'path': '/?' + cmdsJoin
        }, function(res: http.IncomingMessage) {
            res.on('data', function(chunk: Buffer) {
                const str = chunk.toString();
                if (str === 'Done.') {
                    console.log(`Command ${cmdsJoin} has been sent.`);
                }
                else {
                    console.log('Returns an information exception: ' + str);
                }
            });
        }).on('error', function() {
            console.log('RPC Server Error.');
        }).end();
    })().catch(function(err) {
        console.log('CMD ERROR', err);
    });
}
