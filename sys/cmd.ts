/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-3-7 23:51:15
 * Last: 2020-3-7 23:51:18, 2022-07-22 14:14:09, 2022-9-27 14:52:19, 2023-5-23 21:42:46, 2024-7-2 15:12:28, 2026-2-23 13:08:11
 */
import * as http from 'http';
import * as childProcess from 'child_process';
import { fileURLToPath } from 'url';
import * as lFs from '#kebab/lib/fs.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';
import * as lCore from '#kebab/lib/core.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as kebab from '#kebab/index.js';

// --- 检查语言包：node ./source/main locale -l ./source/www/example/data/locale/sc -d ./source/www/example ---

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
        config.logFormat ??= 'jsonl';
        // --- config - set ---
        config.set ??= {};
        config.set.timezone ??= 8;
        config.set.mustHttps ??= false;
        config.set.cacheTtl ??= 0;
        config.set.staticVer ??= '20200314174905';
        config.set.staticPath ??= '';
        // --- config - db ---
        config.db ??= {};
        config.db.default ??= 'PGSQL';
        config.db['MYSQL'] ??= {};
        config.db['MYSQL'].default ??= {};
        config.db['MYSQL'].default.host ??= '127.0.0.1';
        config.db['MYSQL'].default.port ??= 3306;
        config.db['MYSQL'].default.charset ??= 'utf8mb4';
        config.db['MYSQL'].default.name ??= 'maiyun';
        config.db['MYSQL'].default.user ??= 'root';
        config.db['MYSQL'].default.pwd ??= 'DashAdmin';
        config.db['MYSQL'].read ??= {};
        config.db['MYSQL'].read.host ??= '127.0.0.1';
        config.db['MYSQL'].read.port ??= 3306;
        config.db['MYSQL'].read.charset ??= 'utf8mb4';
        config.db['MYSQL'].read.name ??= 'maiyun';
        config.db['MYSQL'].read.user ??= 'root';
        config.db['MYSQL'].read.pwd ??= 'DashAdmin';
        config.db['PGSQL'] ??= {};
        config.db['PGSQL'].default ??= {};
        config.db['PGSQL'].default.host ??= '127.0.0.1';
        config.db['PGSQL'].default.port ??= 5432;
        config.db['PGSQL'].default.name ??= 'maiyun';
        config.db['PGSQL'].default.user ??= 'root';
        config.db['PGSQL'].default.pwd ??= 'DashAdmin';
        config.db['PGSQL'].read ??= {};
        config.db['PGSQL'].read.host ??= '127.0.0.1';
        config.db['PGSQL'].read.port ??= 5432;
        config.db['PGSQL'].read.name ??= 'maiyun';
        config.db['PGSQL'].read.user ??= 'root';
        config.db['PGSQL'].read.pwd ??= 'DashAdmin';
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
        config.sql.pre ??= 'm';
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
        config.ai['ALINE'] ??= {};
        config.ai['ALINE'].skey ??= '';
        config.ai['AZURE'] ??= {};
        config.ai['AZURE'].endpoint ??= '';
        config.ai['AZURE'].skey ??= '';
        config.ai['AZURE2'] ??= {};
        config.ai['AZURE2'].endpoint ??= '';
        config.ai['AZURE2'].skey ??= '';
        config.ai['AZURE3'] ??= {};
        config.ai['AZURE3'].endpoint ??= '';
        config.ai['AZURE3'].skey ??= '';
        config.ai['GEMINI'] ??= {};
        config.ai['GEMINI'].skey ??= '';
        config.ai['GROK'] ??= {};
        config.ai['GROK'].skey ??= '';
        config.ai['VOLCN'] ??= {};
        config.ai['VOLCN'].skey ??= '';
        config.ai['VOLAS'] ??= {};
        config.ai['VOLAS'].skey ??= '';
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
        // --- 退出进程 ---
        process.exit();
    }

    if (cmds[0] === 'locale') {
        let localePath = '';
        let dirPath = '';
        for (let i = 1; i < cmds.length; i++) {
            if (cmds[i] === '-l' || cmds[i] === '--locale') {
                localePath = cmds[i + 1];
                i++;
            }
            else if (cmds[i] === '-d' || cmds[i] === '--dir') {
                dirPath = cmds[i + 1];
                i++;
            }
        }
        if (!localePath || !dirPath) {
            process.exit();
        }
        const appLocaleList: string[] = [];
        const readDir = async (path: string): Promise<void> => {
            const dlist = await lFs.readDir(path);
            for (const item of dlist) {
                if (item.name === '.' || item.name === '..') {
                    continue;
                }
                if (item.isDirectory()) {
                    await readDir(path + '/' + item.name);
                    continue;
                }
                if (
                    !item.name.endsWith('.ejs') &&
                    !item.name.endsWith('.ts')
                ) {
                    continue;
                }

                // --- ts 文件可能是前端的代码，所以要排除掉前端的 ts 文件 ---
                let content = await lFs.getContent(path + '/' + item.name, 'utf8');
                if (!content) {
                    continue;
                }

                if (item.name.endsWith('.ts')) {
                    // --- ts 文件可能是前端的代码，所以要排除掉前端的 ts 文件 ---
                    if (content.includes('AbstractPage')) {
                        continue;
                    }
                    // --- 移除 TS 多行注释 ---
                    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
                    // --- 移除 TS 单行注释 ---
                    content = content.replace(/(^|[^\:])\/\/.*/g, '$1');
                }
                else if (item.name.endsWith('.ejs')) {
                    // --- ejs 文件，只保留 <% %> 内部的内容，因为外部是前端代码 ---
                    const matches = content.match(/<%[\s\S]*?%>/g);
                    if (!matches) {
                        continue;
                    }
                    content = matches.join('\n');
                    // --- 移除多行注释 ---
                    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
                    // --- 移除单行注释 ---
                    content = content.replace(/(^|[^\:])\/\/.*/g, '$1');
                }

                const reg = /(?:\b|_)l\s*\(\s*(['"])(.+?)\1/g;
                let match: RegExpExecArray | null;
                while (match = reg.exec(content)) {
                    const key = match[2];
                    if (appLocaleList.includes(key)) {
                        continue;
                    }
                    appLocaleList.push(key);
                }
            }
        };

        /** --- 提取目录 --- */
        const lastSlash = localePath.lastIndexOf('/');
        const dir = lastSlash === -1 ? '.' : localePath.slice(0, lastSlash);
        /** --- 提取前缀，如 'sc' --- */
        const prefix = lastSlash === -1 ? localePath : localePath.slice(lastSlash + 1);

        const localeList: string[] = [];
        const getKeys = (o: any, p = ''): void => {
            for (const k in o) {
                const nk = p ? p + '.' + k : k;
                if (typeof o[k] === 'object' && o[k] !== null && !Array.isArray(o[k])) {
                    getKeys(o[k], nk);
                }
                else {
                    localeList.push(nk);
                }
            }
        };

        const files = await lFs.readDir(dir);
        let found = false;
        for (const file of files) {
            if (file.isFile() && file.name.startsWith(prefix + '.') && file.name.endsWith('.json')) {
                found = true;
                const content = await lFs.getContent(dir + '/' + file.name, 'utf8');
                if (!content) {
                    continue;
                }
                const obj = lText.parseJson<any>(content);
                if (typeof obj !== 'object') {
                    continue;
                }
                getKeys(obj);
            }
        }

        if (!found) {
            lCore.display('Locale files not found: ' + localePath + '.*.json');
            process.exit();
        }
        appLocaleList.length = 0;
        await readDir(dirPath);

        const set1 = new Set(localeList);
        const set2 = new Set(appLocaleList);

        /** --- 只在第一个数组中存在的元素 --- */
        const onlyInFirst = localeList.filter(item => !set2.has(item));
        /** --- 只在第二个数组中存在的元素 --- */
        const onlyInSecond = appLocaleList.filter(item => !set1.has(item));

        lCore.display('More', onlyInFirst);
        lCore.display('Less', onlyInSecond);
        // --- 退出进程 ---
        process.exit();
    }

    if (cmds[0] === 'build') {
        // --- 构建命令：使用 esbuild 打包 *.page.tsx 文件为自包含 bundle ---
        // --- 约定：文件名以 .page.tsx 结尾的为页面入口，会被打包；其余 .tsx 均视为组件，不参与打包 ---
        // --- 与 Next.js 的 page.tsx 约定同理，开发者可自由组织目录结构，框架靠文件名区分入口与组件 ---
        // --- 推荐目录结构：stc/view/home.page.tsx（入口）+ stc/view/components/header.tsx（组件）---
        // --- 用法：node ./source/main build [-d www/myapp/stc] ---
        let targetDir = '';
        for (let i = 1; i < cmds.length; i++) {
            if ((cmds[i] === '-d' || cmds[i] === '--dir') && cmds[i + 1]) {
                targetDir = cmds[i + 1];
                i++;
            }
        }

        /** --- 递归扫描目录，收集所有 *.page.tsx 文件作为打包入口 --- */
        const entryPoints: string[] = [];
        const scanDir = async (dir: string): Promise<void> => {
            const items = await lFs.readDir(dir);
            for (const item of items) {
                if (item.name === '.' || item.name === '..') {
                    continue;
                }
                if (item.isDirectory()) {
                    await scanDir(`${dir}/${item.name}`);
                }
                else if (item.name.endsWith('.page.tsx')) {
                    entryPoints.push(`${dir}/${item.name}`);
                }
            }
        };

        if (targetDir) {
            // --- 指定了目录：递归扫描该目录下所有 *.page.tsx ---
            const absTarget = targetDir.startsWith('/') || /^[A-Za-z]:/.test(targetDir)
                ? targetDir
                : kebab.ROOT_CWD + targetDir.replace(/^\//, '');
            if (await lFs.isDir(absTarget)) {
                await scanDir(absTarget);
            }
            else {
                lCore.display('KEBAB', 'BUILD', '[DIR NOT FOUND]', absTarget);
                process.exit();
                return;
            }
        }
        else {
            // --- 未指定目录：递归在 www/ 下找所有 stc/ 目录并扫描（支持任意深度，如 www/*/stc、www/*/*/stc）---
            const findStcDirs = async (dir: string): Promise<void> => {
                const items = await lFs.readDir(dir);
                for (const item of items) {
                    if (item.name === '.' || item.name === '..' || !item.isDirectory()) {
                        continue;
                    }
                    const sub = `${dir}/${item.name}`;
                    if (item.name === 'stc') {
                        await scanDir(sub);
                    }
                    else {
                        await findStcDirs(sub);
                    }
                }
            };
            // --- kebab.WWW_CWD 末尾含 /，去掉再传入保持路径格式统一 ---
            await findStcDirs(kebab.WWW_CWD.replace(/\/$/, ''));
        }

        if (entryPoints.length === 0) {
            lCore.display('KEBAB', 'BUILD', 'No .tsx files found.');
            process.exit();
            return;
        }
        lCore.display('KEBAB', 'BUILD', `Found ${entryPoints.length} file(s).`);

        const esbuild = await import('esbuild');
        // --- 按 stc/ 根目录分组：同一站点内所有页面合并为一次 esbuild 构建 ---
        // --- 不同站点（不同 stc/）相互隔离，同站点内跨子目录页面共享 chunk ---
        // --- splitting: true 自动将任意共享 import（React/Header/utils 等）提取为独立 chunk ---
        /**
         * --- 查找路径中最后一段名为 stc 的祖先目录 ---
         */
        const getStcRoot = (filePath: string): string => {
            const parts = filePath.split('/');
            const idx = parts.lastIndexOf('stc');
            return idx >= 0 ? parts.slice(0, idx + 1).join('/') : parts.slice(0, -1).join('/');
        };
        const byStc = new Map<string, string[]>();
        for (const entry of entryPoints) {
            const stcRoot = getStcRoot(entry);
            if (!byStc.has(stcRoot)) {
                byStc.set(stcRoot, []);
            }
            byStc.get(stcRoot)!.push(entry);
        }
        for (const [stcRoot, entries] of byStc) {
            // --- 为每个页面写入水合入口临时文件（实际文件，splitting 不支持 stdin 多入口）---
            const tempFiles: string[] = [];
            for (const entry of entries) {
                const basename = entry.split('/').pop()!.replace(/\.tsx$/, '');
                const entryDir = entry.substring(0, entry.lastIndexOf('/'));
                const hydrateCode = [
                    `import{hydrateRoot}from'react-dom/client';`,
                    `import{createElement}from'react';`,
                    `import{BrowserRouter}from'react-router-dom';`,
                    `import App from'./${basename}.tsx';`,
                    `const el=document.getElementById('__kebab_props__');`,
                    `if(el){`,
                    `const p=JSON.parse(el.textContent??'{}');`,
                    `if(typeof p._routerBase==='string'){`,
                    `hydrateRoot(document,createElement(BrowserRouter,{basename:p._routerBase},createElement(App,p)));`,
                    `}else{`,
                    `hydrateRoot(document,createElement(App,p));`,
                    `}`,
                    `}`,
                ].join('');
                const tempFile = `${entryDir}/${basename}.hydrate.tsx`;
                await lFs.putContent(tempFile, hydrateCode);
                tempFiles.push(tempFile);
                lCore.display('KEBAB', 'BUILD', entry.replace(kebab.ROOT_CWD, ''), '→', entry.replace(kebab.ROOT_CWD, '').replace(/\.tsx$/, '.bundle.js'));
            }
            // --- JS 构建：整站一次构建，splitting 按实际共享情况自动提取 chunk ---
            // --- outbase = outdir = stcRoot，入口保留子目录结构，chunk 落在 stcRoot 根 ---
            try {
                await esbuild.build({
                    'entryPoints': tempFiles,
                    'bundle': true,
                    'splitting': true,
                    'format': 'esm',
                    'jsx': 'automatic',
                    'jsxImportSource': 'react',
                    'platform': 'browser',
                    'target': 'es2022',
                    'minify': true,
                    'outbase': stcRoot,
                    'outdir': stcRoot,
                    'entryNames': '[dir]/[name]',
                    'chunkNames': 'chunk-[hash]',
                });
                // --- 将 *.hydrate.js 重命名为 *.bundle.js ---
                for (const tempFile of tempFiles) {
                    const hydrateJs = tempFile.replace(/\.tsx$/, '.js');
                    const bundleJs = hydrateJs.replace(/\.hydrate\.js$/, '.bundle.js');
                    await lFs.rename(hydrateJs, bundleJs);
                    lCore.display('KEBAB', 'BUILD', 'JS', bundleJs.replace(kebab.ROOT_CWD, ''));
                }
            }
            catch (e: kebab.Json) {
                lCore.display('KEBAB', 'BUILD', 'JS FAILED', stcRoot.replace(kebab.ROOT_CWD, ''), e.message ?? '');
            }
            finally {
                // --- 清理临时水合入口文件 ---
                for (const tempFile of tempFiles) {
                    await lFs.unlink(tempFile);
                }
            }
            // --- CSS：每个入口单独构建 Tailwind ---
            for (const entry of entries) {
                const cssOut = entry.replace(/\.tsx$/, '.css');
                const tmpCss = entry + '.__tw__.css';
                await lFs.putContent(tmpCss, `@import "tailwindcss";\n@source "./**/*.tsx";\n`);
                try {
                    const twJs = fileURLToPath(new URL('../node_modules/@tailwindcss/cli/dist/index.mjs', import.meta.url));
                    await new Promise<void>((resolve, reject) => {
                        const proc = childProcess.spawn(
                            process.execPath,
                            [twJs, '-i', tmpCss, '-o', cssOut, '--minify'],
                            { 'shell': false }
                        );
                        const errLines: string[] = [];
                        proc.stderr.on('data', (d: Buffer) => errLines.push(d.toString()));
                        proc.on('close', (code) => {
                            if (code === 0) {
                                resolve();
                            }
                            else {
                                reject(new Error(errLines.join('').trim() || `tailwindcss exit ${code ?? 'null'}`));
                            }
                        });
                    });
                    lCore.display('KEBAB', 'BUILD', 'CSS', cssOut.replace(kebab.ROOT_CWD, ''));
                }
                catch (e: kebab.Json) {
                    lCore.display('KEBAB', 'BUILD', 'CSS SKIP (tailwindcss not installed?)', e.message ?? '');
                }
                finally {
                    await lFs.unlink(tmpCss);
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
    const config = lText.parseJson<any>(configContent);
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
