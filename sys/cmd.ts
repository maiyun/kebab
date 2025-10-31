/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-3-7 23:51:15
 * Last: 2020-3-7 23:51:18, 2022-07-22 14:14:09, 2022-9-27 14:52:19, 2023-5-23 21:42:46, 2024-7-2 15:12:28
 */
import * as http from 'http';
import * as lFs from '#kebab/lib/fs.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';
import * as lCore from '#kebab/lib/core.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as kebab from '#kebab/index.js';

/** --- 解析命令 --- */
const cmds = process.argv.slice(2);

/** --- 批量创建目录 --- */
async function initDir(paths: string[]): Promise<boolean> {
    for (const path of paths) {
        if (await lFs.isDir(path)) {
            continue;
        }
        lCore.display('KEBAB', 'CREATE', 'DIR', path);
        if (!await lFs.mkdir(path)) {
            lCore.display('KEBAB', 'CREATE', 'DIR', path, '[FAILED]');
            return false;
        }
        lCore.display('KEBAB', 'CREATE', 'FILE', path + 'lock.txt');
        if (!await lFs.putContent(path + 'lock.txt', 'Kebab')) {
            lCore.display('KEBAB', 'CREATE', 'FILE', path + 'lock.txt', '[FAILED]');
            return false;
        }
    }
    return true;
}

/** --- cmd 解析 --- */
async function run(): Promise<void> {
    if (cmds[0] === 'init' || cmds[0] === 'update') {
        // --- 初始化、更新 ---
        if (!await initDir([
            kebab.CERT_CWD + 'default/',
            kebab.VHOST_CWD,
            kebab.FTMP_CWD,
            kebab.IND_CWD,
            kebab.LIB_CWD,
            kebab.LOG_CWD,
            kebab.WWW_CWD,
            kebab.MOD_CWD,
        ])) {
            return;
        }
        // --- /conf/cert.json ---
        if (!await lFs.isFile(kebab.CONF_CWD + 'cert.json')) {
            lCore.display('KEBAB', 'CREATE', 'FILE', kebab.CONF_CWD + 'cert.json');
            if (!await lFs.putContent(kebab.CONF_CWD + 'cert.json', lText.stringifyJson([
                {
                    'cert': 'default/xxx.cer',
                    'key': 'default/xxx.key'
                }
            ], 4))) {
                lCore.display('KEBAB', 'CREATE', 'FILE', kebab.CONF_CWD + 'cert.json', '[FAILED]');
                return;
            }
        }
        // --- /conf/config.json ---
        let config: any = {};
        if (await lFs.isFile(kebab.CONF_CWD + 'config.json')) {
            config = lText.parseJson((await lFs.getContent(kebab.CONF_CWD + 'config.json'))?.toString() ?? '{}');
        }
        else {
            lCore.display('KEBAB', 'CREATE', 'FILE', kebab.CONF_CWD + 'config.json');
        }
        // --- 修复 config ---
        config.httpPort ??= 8080;
        config.httpsPort ??= 4333;
        config.rpcPort ??= 10630;
        config.rpcSecret ??= 'MUSTCHANGE';
        config.debug ??= true;
        config.max ??= 64;
        config.hosts ??= [];
        config.ind ??= [];
        // --- config - set ---
        config.set ??= {};
        config.set.timezone ??= 8;
        config.set.mustHttps ??= false;
        config.set.cacheTtl ??= 0;
        config.set.staticVer ??= '20200314174905';
        config.set.staticPath ??= '';
        // --- config - db ---
        config.db ??= {};
        config.db.host ??= '127.0.0.1';
        config.db.port ??= 3306;
        config.db.charset ??= 'utf8mb4';
        config.db.name ??= 'maiyun';
        config.db.user ??= 'root';
        config.db.pwd ??= 'DashAdmin';
        // --- config - jwt ---
        config.jwt ??= {};
        config.jwt.name ??= 'KE_JWT';
        config.jwt.ttl ??= 172800;
        config.jwt.ssl ??= false;
        config.jwt.secret ??= 'MUSTCHANGE';
        config.jwt.auth ??= false;
        // --- config - dns ---
        config.dns ??= {};
        config.dns['DNSPOD'] ??= {};
        config.dns['DNSPOD'].sid ??= '';
        config.dns['DNSPOD'].skey ??= '';
        config.dns['CF'] ??= {};
        config.dns['CF'].sid ??= '';
        config.dns['CF'].skey ??= '';
        // --- config - kv ---
        config.kv ??= {};
        config.kv.host ??= '127.0.0.1';
        config.kv.port ??= 6379;
        config.kv.index ??= 0;
        config.kv.pre ??= 'm_';
        config.kv.user ??= '';
        config.kv.pwd ??= '';
        // --- config - session ---
        config.session ??= {};
        config.session.name ??= 'KE_SESSION';
        config.session.ttl ??= 172800;
        config.session.ssl ??= false;
        // --- config - sql ---
        config.sql ??= {};
        config.sql.pre ??= 'm_';
        // --- config - s3 ---
        config.s3 ??= {};
        config.s3['CF'] ??= {};
        config.s3['CF'].account ??= '';
        config.s3['CF'].sid ??= '';
        config.s3['CF'].skey ??= '';
        config.s3['CF'].region ??= 'auto';
        config.s3['CF'].bucket ??= '';
        config.s3['TENCENT'] ??= {};
        config.s3['TENCENT'].sid ??= '';
        config.s3['TENCENT'].skey ??= '';
        config.s3['TENCENT'].region ??= '';
        config.s3['TENCENT'].bucket ??= '';
        // --- config - turnstile ---
        config.turnstile ??= {};
        config.turnstile['CF'] ??= {};
        config.turnstile['CF'].sid ??= '';
        config.turnstile['CF'].skey ??= '';
        config.turnstile['TENCENT'] ??= {};
        config.turnstile['TENCENT'].sid ??= '';
        config.turnstile['TENCENT'].skey ??= '';
        config.turnstile['TENCENT'].aid ??= '';
        config.turnstile['TENCENT'].akey ??= '';
        // --- config - ai ---
        config.ai ??= {};
        config.ai['ALICN'] ??= {};
        config.ai['ALICN'].skey ??= '';
        config.ai['ALIAS'] ??= {};
        config.ai['ALIAS'].skey ??= '';
        config.ai['AZURE'] ??= {};
        config.ai['AZURE'].endpoint ??= '';
        config.ai['AZURE'].skey ??= '';
        // --- config - vector ---
        config.vector ??= {};
        config.vector.host ??= '127.0.0.1';
        config.vector.port ??= 19530;
        config.vector.name ??= 'default';
        config.vector.user ??= 'root';
        config.vector.pwd ??= 'Milvue';
        // --- 保存 config.json ---
        if (!await lFs.putContent(kebab.CONF_CWD + 'config.json', lText.stringifyJson(config, 4))) {
            lCore.display('KEBAB', 'CREATE', 'FILE', kebab.CONF_CWD + 'config.json', '[FAILED]');
            return;
        }
        // --- 只在初始化时 ---
        if (cmds[0] === 'init') {
            // --- /conf/vhost/default.json ---
            if (!await lFs.isFile(kebab.VHOST_CWD + 'default.json')) {
                lCore.display('KEBAB', 'CREATE', 'FILE', kebab.VHOST_CWD + 'default.json');
                if (!await lFs.putContent(kebab.VHOST_CWD + 'default.json', lText.stringifyJson([
                    {
                        'name': 'example',
                        'domains': ['*'],
                        'root': '${example}',
                        'remark': '',
                    },
                    {
                        'name': 'default',
                        'domains': ['www.maiyun.net'],
                        'root': 'default/',
                        'remark': '',
                    },
                ], 4))) {
                    lCore.display('KEBAB', 'CREATE', 'FILE', kebab.VHOST_CWD + 'default.json', '[FAILED]');
                    return;
                }
            }
        }
        lCore.display('DONE');
        process.exit();
    }

    // --- 读取配置文件 ---
    const configContent = await lFs.getContent(kebab.CONF_CWD + 'config.json', 'utf8');
    if (!configContent) {
        throw `File '${kebab.CONF_CWD}config.json' not found.`;
    }
    /** --- 系统 config.json --- */
    const config = lText.parseJson(configContent);
    for (const key in config) {
        lCore.globalConfig[key] = config[key];
    }

    if (cmds[0] === '--ind' || cmds[0] === '-i') {
        // --- 运行独立文件，如 node ./index --ind gps ---
        if (!await lFs.isFile(kebab.IND_CWD + cmds[1] + '/index.js')) {
            lCore.display('CMD ERROR', 'IND FILE "' + cmds[1] + '" NOT FOUND.');
            return;
        }
        process.title = cmds[1] + ' - kebab ind';
        // --- 载入独立文件入口 ---
        import((!kebab.IND_CWD.startsWith('/') ? '/' : '') + kebab.IND_CWD + cmds[1] + '/index.js').catch((e) => {
            lCore.display('CMD ERROR', 'E', e);
        });
    }
    else {
        // --- 其他，如 node ./index reload 或 restart ---
        const time = lTime.stamp();
        http.request({
            'hostname': '127.0.0.1',
            'port': config.rpcPort,
            'path': '/' + lCrypto.aesEncrypt(lText.stringifyJson({
                'action': cmds[0],
                'time': time
            }), lCore.globalConfig.rpcSecret)
        }, function(res: http.IncomingMessage) {
            res.on('data', function(chunk: Buffer) {
                const str = chunk.toString();
                if (str === 'Done') {
                    lCore.display(`Command ${cmds[0]} has been sent.`);
                }
                else {
                    lCore.display('Returns an information exception: ' + str);
                }
                process.exit();
            });
        }).on('error', function() {
            lCore.display('RPC Server Error.');
        }).end();
    }
}

run().catch(function(e): void {
    lCore.display('[cmd] ------ [Process fatal Error] ------');
    lCore.display(e);
});
