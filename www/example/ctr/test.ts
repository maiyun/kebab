import * as fs from 'fs';
// --- 库 ---
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lNet from '#kebab/lib/net.js';
import * as lDb from '#kebab/lib/db.js';
import * as lVector from '#kebab/lib/vector.js';
import * as lFs from '#kebab/lib/fs.js';
import * as lText from '#kebab/lib/text.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as lKv from '#kebab/lib/kv.js';
import * as lCaptcha from '#kebab/lib/captcha.js';
import * as lTime from '#kebab/lib/time.js';
import * as lScan from '#kebab/lib/scan.js';
import * as lSql from '#kebab/lib/sql.js';
import * as lConsistent from '#kebab/lib/consistent.js';
import * as lSsh from '#kebab/lib/ssh.js';
import * as lJwt from '#kebab/lib/jwt.js';
import * as lWs from '#kebab/lib/ws.js';
import * as lS3 from '#kebab/lib/s3.js';
import * as lZip from '#kebab/lib/zip.js';
import * as lBuffer from '#kebab/lib/buffer.js';
import * as lLan from '#kebab/lib/lan.js';
import * as lCron from '#kebab/lib/cron.js';
import * as lAi from '#kebab/lib/ai.js';
import * as sCtr from '#kebab/sys/ctr.js';
// --- mod ---
import mTest from '../mod/test.js';
import mTestData from '../mod/testdata.js';

export default class extends sCtr.Ctr {

    private _internalUrl: string = '';

    public onLoad(): Array<string | number> | boolean {
        if (
            this._config.const.hostname !== '127.0.0.1' && this._config.const.hostname !== '172.17.0.1' &&
            this._config.const.hostname !== 'localhost' && !this._config.const.hostname.endsWith('.local.brc-app.com') &&
            !this._config.const.hostname.startsWith('192.168.')
        ) {
            return [0, 'Please use 127.0.0.1 or local to access the file (' + this._config.const.host + ').'];
        }
        const realIp = lCore.realIP(this);
        if (
            (this._config.const.hostname === '127.0.0.1' || this._config.const.hostname === 'localhost') &&
            (realIp === '172.17.0.1')
        ) {
            this._internalUrl = 'http' + (this._config.const.https ? 's' : '') + '://' + realIp + this._config.const.urlBase;
        }
        else {
            this._internalUrl = this._config.const.urlFull;
        }
        return true;
    }

    public onReady(): boolean {
        return true;
    }

    public onUnload(rtn: string | boolean | kebab.DbValue[]): string | boolean | kebab.DbValue[] {
        if (!Array.isArray(rtn)) {
            return rtn;
        }
        if (rtn[0] !== -102) {
            return rtn;
        }
        rtn.push({
            'test': 'unload'
        });
        return rtn;
    }

    public notfound(): string {
        // --- Set on route.php ---
        this._httpCode = 404;
        return 'Custom 404 page.';
    }

    public index(): string {
        const echo: string[] = [
            'Hello world! Welcome to use <strong>Kebab ' + kebab.VER + '</strong>!',

            '<br><br>Node Version: ' + process.version,
            '<br>HOST: ' + this._config.const.host,
            '<br>HOSTNAME: ' + this._config.const.hostname,
            '<br>HOSTPORT: ' + this._config.const.hostport.toString(),
            '<br>PATH: ' + this._config.const.path,
            '<br>QS: ' + this._config.const.qs,
            '<br>HTTPS: ' + (this._config.const.https ? 'true' : 'false'),
            '<br>MOBILE: ' + (this._config.const.mobile ? 'true' : 'false'),
            '<br>MINIPROGRAM: ' + (this._config.const.miniprogram) + ' (' + typeof this._config.const.miniprogram + ')',
            '<br>Real IP: ' + lCore.ip(this),
            '<br>Client IP: ' + lCore.realIP(this),

            '<br><br>URL_BASE: ' + this._config.const.urlBase,
            '<br>URL_STC: ' + this._config.const.urlStc,
            '<br>URL_FULL: ' + this._config.const.urlFull,
            '<br>STATIC_PATH: ' + this._config.set.staticPath,
            '<br>STATIC_PATH_FULL: ' + this._config.set.staticPathFull,
            '<br>_internalUrl: ' + this._internalUrl,

            '<br><br>headers: ' + lText.htmlescape(JSON.stringify(this._headers)),

            '<br><br><b style="color: red;">Tips: The file can be deleted.</b>',

            '<br><br><b>Route (route.json):</b>',
            `<br><br><a href="${this._config.const.urlBase}article/123">View "article/123"</a>`,
            `<br><a href="${this._config.const.urlBase}article/456">View "article/456"</a>`,

            '<br><br><b>Query string:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/qs?a=1&b=2">View "test/qs?a=1&b=2"</a>`,

            '<br><br><b>View:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/view">View "test/view"</a>`,

            '<br><br><b>Return json:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/json?type=1">View "test/json?type=1"</a>`,
            `<br><a href="${this._config.const.urlBase}test/json?type=2">View "test/json?type=2"</a>`,
            `<br><a href="${this._config.const.urlBase}test/json?type=3">View "test/json?type=3"</a>`,
            `<br><a href="${this._config.const.urlBase}test/json?type=4">View "test/json?type=4"</a>`,
            `<br><a href="${this._config.const.urlBase}test/json?type=5">View "test/json?type=5"</a>`,
            `<br><a href="${this._config.const.urlBase}test/json?type=6">View "test/json?type=6"</a>`,
            `<br><a href="${this._config.const.urlBase}test/json?type=7">View "test/json?type=7"</a>`,
            `<br><a href="${this._config.const.urlBase}test/json?type=8">View "test/json?type=8"</a>`,
            `<br><a href="${this._config.const.urlBase}test/json?type=9">View "test/json?type=9"</a>`,

            '<br><br><b>Ctr:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/ctr-xsrf">View "test/ctr-xsrf"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-checkinput">View "test/ctr-checkinput"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-locale">View "test/ctr-locale"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-cachettl">View "test/ctr-cachettl"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-httpcode">View "test/ctr-httpcode"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-cross">View "test/ctr-cross"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-readable">View "test/ctr-readable"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-asynctask">View "test/ctr-asynctask"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-timeout-long">View "test/ctr-timeout-long"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-timeout-short">View "test/ctr-timeout-short"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ctr-500">View "test/ctr-500"</a>`,

            '<br><br><b>Middle:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/middle">View "test/middle"</a>`,

            '<br><br><b>Model test:</b>',

            '<br><br><b style="color: red;">In a production environment, please delete "mod/test.ts", "mod/testdata.ts" files.</b>',
            `<br><a href="${this._config.const.urlBase}test/mod-test">Click to see an example of a Test model</a>`,
            `<br><a href="${this._config.const.urlBase}test/mod-split">View "test/mod-split"</a>`,
            `<br><a href="${this._config.const.urlBase}test/mod-insert">View "test/mod-insert"</a>`,

            '<br><br><b>Library test:</b>',

            `<br><br><b>Ai:</b>`,
            `<br><br><a href="${this._config.const.urlBase}test/ai">View "test/ai"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ai-stream">View "test/ai-stream"</a>`,

            '<br><br><b>Core:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/core-random">View "test/core-random"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-rand">View "test/core-rand"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-convert62">View "test/core-convert62"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-purify">View "test/core-purify"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-checktype">View "test/core-checktype"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-muid">View "test/core-muid"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-getlog">View "test/core-getlog"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-ls">View "test/core-ls"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-reload">View "test/core-reload"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-restart">View "test/core-restart"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-global">View "test/core-global"</a>`,
            `<br><a href="${this._config.const.urlBase}test/core-updatecode">View "test/core-updatecode"</a>`,

            '<br><br><b>Crypto:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/crypto">View "test/crypto"</a>`,

            '<br><br><b>Db:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/db">View "test/db"</a>`,

            `<br><br><b>Vector:</b>`,
            `<br><br><a href="${this._config.const.urlBase}test/vector">View "test/vector"</a>`,

            '<br><br><b>Kv:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/kv">View "test/kv"</a>`,

            '<br><br><b>Net:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/net">View "test/net"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-pipe">View "test/net-pipe"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-post">View "test/net-post"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-post-string">View "test/net-post-string"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-open">View "test/net-open"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-form-test">View "test/net-form-test"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-upload">View "test/net-upload"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-cookie">View "test/net-cookie"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-save">View "test/net-save"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-follow">View "test/net-follow"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-reuse">View "test/net-reuse"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-error">View "test/net-error"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-hosts">View "test/net-hosts"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-rproxy/dist/core.js">View "test/net-rproxy/dist/core.js"</a> <a href="${this._config.const.urlBase}test/net-rproxy/package.json">View "package.json"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-mproxy">View "test/net-mproxy"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-filterheaders">View "test/net-filterheaders"</a>`,
            `<br><a href="${this._config.const.urlBase}test/net-fetch">View "test/net-fetch"</a>`,

            '<br><br><b>Scan:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/scan?s=db">View "test/scan?s=db"</a>`,
            `<br><a href="${this._config.const.urlBase}test/scan?s=kv">View "test/scan?s=kv"</a>`,

            '<br><br><b>Session:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/session?s=db">View "test/session?s=db"</a>`,
            `<br><a href="${this._config.const.urlBase}test/session?s=kv">View "test/session?s=kv"</a>`,
            `<br><a href="${this._config.const.urlBase}test/session?s=db&auth=1">View "test/session?s=db&auth=1" Header Authorization</a>`,
            `<br><a href="${this._config.const.urlBase}test/session?s=kv&auth=1">View "test/session?s=kv&auth=1" Header Authorization</a>`,

            '<br><br><b>Captcha:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/captcha-fastbuild">View "test/captcha-fastbuild"</a>`,
            `<br><a href="${this._config.const.urlBase}test/captcha-base64">View "test/captcha-base64"</a>`,

            '<br><br><b>Sql:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/sql?type=insert">View "test/sql?type=insert"</a>`,
            `<br><a href="${this._config.const.urlBase}test/sql?type=select">View "test/sql?type=select"</a>`,
            `<br><a href="${this._config.const.urlBase}test/sql?type=update">View "test/sql?type=update"</a>`,
            `<br><a href="${this._config.const.urlBase}test/sql?type=delete">View "test/sql?type=delete"</a>`,
            `<br><a href="${this._config.const.urlBase}test/sql?type=where">View "test/sql?type=where"</a>`,
            `<br><a href="${this._config.const.urlBase}test/sql?type=having">View "test/sql?type=having"</a>`,
            `<br><a href="${this._config.const.urlBase}test/sql?type=by">View "test/sql?type=by"</a>`,
            `<br><a href="${this._config.const.urlBase}test/sql?type=field">View "test/sql?type=field"</a>`,

            '<br><br><b>Jwt:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/jwt">View "test/jwt"</a>`,
            `<br><a href="${this._config.const.urlBase}test/jwt?type=kv">View "test/jwt?type=kv"</a>`,
            `<br><a href="${this._config.const.urlBase}test/jwt?type=auth">View "test/jwt?type=auth" Header Authorization</a>`,

            '<br><br><b>Consistent:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/consistent-hash">View "test/consistent-hash"</a>`,
            `<br><a href="${this._config.const.urlBase}test/consistent-distributed">View "test/consistent-distributed"</a>`,
            `<br><a href="${this._config.const.urlBase}test/consistent-migration">View "test/consistent-migration"</a>`,
            `<br><a href="${this._config.const.urlBase}test/consistent-fast">View "test/consistent-fast"</a>`,

            '<br><br><b>Text:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/text">View "test/text"</a>`,

            '<br><br><b>Time:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/time">View "test/time"</a>`,

            '<br><br><b>Ws:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/ws-server">View "test/ws-server"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ws-server?ac=rproxy">View ws rproxy</a>`,
            `<br><a href="${this._config.const.urlBase}test/ws-server?ac=rproxy2">View ws rproxy2 (handler)</a>`,
            `<br><a href="${this._config.const.urlBase}test/ws-client">View "test/ws-client"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ws-client?ac=mproxy">View ws mproxy</a>`,

            '<br><br><b>Ssh:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/ssh?type=shell">View "test/ssh?type=shell"</a>`,
            `<br><a href="${this._config.const.urlBase}test/ssh?type=sftp">View "test/ssh?type=sftp"</a>`,

            '<br><br><b>S3:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/s3">View "test/s3"</a>`,

            '<br><br><b>Zip:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/zip">View "test/zip"</a>`,

            '<br><br><b>Buffer:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/buffer">View "test/buffer"</a>`,

            '<br><br><b>Lan:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/lan">View "test/lan"</a>`,

            '<br><br><b>Cron:</b>',
            `<br><br><a href="${this._config.const.urlBase}test/cron">View "test/cron"</a>`,
        ];
        echo.push('<br><br>' + this._getEnd());

        return echo.join('');
    }

    public article(): string {
        return 'Article ID: ' + lText.htmlescape(this._param[0]) + '<br><br>' + this._getEnd();
    }

    public qs(): string {
        return 'JSON.stringify(this._get):<br><br>' + lText.htmlescape(JSON.stringify(this._get)) + '<br><br>' + this._getEnd();
    }

    public view(): Promise<string> {
        return this._loadView('test', {
            'test': 'ok',
            'debug': true,
        });
    }

    public json(): Array<number | string | object> | object {
        switch (this._get.type) {
            case '1':
                return [0];
            case '2':
                return [0, 'Error message.'];
            case '3':
                return [0, { 'line': '2' }];
            case '4':
                return [1, 'Successful!'];
            case '5':
                return [1, { 'list': [{ 'id': '0' }, { 'id': '1' }, { 'id': '2' }], 'total': '3' }];
            case '6':
                return { 'oh': 'yeah', 'sb': 'is me' };
            case '7':
                return [1, 'success', { 'list': [1, 2, 3] }];
            case '8':
                return [-101, 'Test middle onUnload'];
            case '9':
                return [-102, 'Test ctr onUnload'];
            default:
                return [];
        }
    }

    public ctrXsrf(): string {
        this._enabledXsrf();
        return `XSRF-TOKEN: ${this._xsrf}<br><br>
<input type="button" value="Post with xsrf token" onclick="document.getElementById('result').innerText='Waiting...';fetch('${this._config.const.urlBase}test/ctr-xsrf1',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'key=val&_xsrf=${this._xsrf}'}).then(function(r){return r.text();}).then(function(t){document.getElementById('result').innerText=t;});">
<input type='button' value="Post without xsrf token" style="margin-left: 10px;" onclick="document.getElementById('result').innerText='Waiting...';fetch('${this._config.const.urlBase}test/ctr-xsrf1',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'key=val'}).then(function(r){return r.text();}).then(function(t){document.getElementById('result').innerText=t;});"><br><br>
Result:<pre id="result">Nothing.</pre>${this._getEnd()}`;
    }

    public ctrXsrf1(): kebab.Json[] {
        const retur: kebab.Json[] = [];
        if (!this._checkXInput(this._post, {}, retur)) {
            return retur;
        }
        return [1, { 'post': this._post }];
    }

    public ctrCheckinput(): string {
        const echo = [`rule:
<pre>{
    'he': ['require', [0, 'The he param does not exist.']],
    'num': ['> 10', [0, 'The num param must > 10.']],
    'num2': ['> 0', '<= 100', [0, 'The num2 param must > 0.']],
    'reg': ['/^[A-CX-Z5-7]+$/', [0, 'The reg param is incorrect.']],
    'arr': [['a', 'x', 'hehe'], [0, 'The arr param is incorrect.']],
    'type': [{ 'type': { 'a': 1, 'b': '' } }, [0, 'The reg param is incorrect']],
    'json': [{ 'type': { 'a': '1', 'b': [ { 'c': 1 } ] } }, [0, 'The type param is incorrect']],
    'json2': [{ 'type': { 'a': '1', 'b': 0, 'c?': { 'd': '1' } } }, [0, 'The json2 param is incorrect']],
}</pre>`];

        const post: any[] = [
            {},
            {
                'he': 'ok'
            },
            {
                'he': 'ok',
                'num': '5'
            },
            {
                'he': 'ok',
                'num2': '0'
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'Hello'
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'BBB6YYY6',
                'arr': 'heihei'
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'BBB6YYY6',
                'arr': 'hehe'
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'BBB6YYY6',
                'arr': 'hehe',
                'type': { 'a': false, 'b': '1' }
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'BBB6YYY6',
                'arr': 'hehe',
                'type': { 'a': 0, 'b': 'ok' }
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'BBB6YYY6',
                'arr': 'hehe',
                'type': { 'a': 0, 'b': 'ok' },
                'json': { 'a': 'a', 'b': [] },
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'BBB6YYY6',
                'arr': 'hehe',
                'type': { 'a': 0, 'b': 'ok' },
                'json': { 'a': 'a', 'b': [ { 'c': 'a' } ] },
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'BBB6YYY6',
                'arr': 'hehe',
                'type': { 'a': 0, 'b': 'ok' },
                'json': { 'a': 'a', 'b': [ { 'c': 1, 'd': 2 } ] },
            },
            {
                'he': 'ok',
                'num': '12',
                'reg': 'BBB6YYY6',
                'arr': 'hehe',
                'type': { 'a': 0, 'b': 'ok' },
                'json': { 'a': 'a', 'b': [ { 'c': 1 } ] },
            },
            {
                'he': 'ok',
                'json2': { },
            },
            {
                'he': 'ok',
                'json2': { 'a': '1' },
            },
            {
                'he': 'ok',
                'json2': { 'a': '1', 'c': { 'd': '1' } },
            },
            {
                'he': 'ok',
                'json2': { 'a': '1', 'b': 1 },
            },
            {
                'he': 'ok',
                'json2': { 'a': '1', 'b': 1, 'c': { 'd': '1' } },
            },
        ];
        for (const item of post) {
            if (item.type) {
                item.type = JSON.stringify(item.type);
            }
            if (item.json) {
                item.json = JSON.stringify(item.json);
            }
            if (item.json2) {
                item.json2 = JSON.stringify(item.json2);
            }
            echo.push(`<input type="button" value="Post '${lText.queryStringify(item, false).replace(/"/g, '&quot;')}'" onclick="post('${lText.queryStringify(item)}')"><br>`);
        }

        echo.push(`<input type="button" value="Post FormData (fd.append('he', 'ho'))" onclick="postFd()"><br>`);

        echo.push(`<script>
function post(p) {
    document.getElementById('result').innerText = 'Waiting...';
    fetch('${this._config.const.urlBase}test/ctr-checkinput1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: p
    }).then(function(r) {
        return r.text();
    }).then(function(t) {
        document.getElementById('result').innerText = t;
    });
}

function postFd() {
    var fd = new FormData();
    fd.append('he', 'ho');
    document.getElementById('result').innerText = 'Waiting...';
    fetch('${this._config.const.urlBase}test/ctr-checkinput1', {
        method: 'POST',
        body: fd
    }).then(function(r) {
        return r.text();
    }).then(function(t) {
        document.getElementById('result').innerText = t;
    });
}
</script>
<br>Result:<pre id="result">Nothing.</pre>`);

        return echo.join('') + this._getEnd();
    }

    public async ctrCheckinput1(): Promise<kebab.Json[]> {
        if (!await this._handleFormData()) {
            return [0];
        }
        const retur: kebab.Json[] = [];
        if (this._post['type']) {
            this._post['type'] = lText.parseJson(this._post['type']);
        }
        if (this._post['json']) {
            this._post['json'] = lText.parseJson(this._post['json']);
        }
        if (this._post['json2']) {
            this._post['json2'] = lText.parseJson(this._post['json2']);
        }
        if (this._post['num2'] !== undefined) {
            this._post['num2'] = parseFloat(this._post['num2']);
        }
        if (!this._checkInput(this._post, {
            'he': ['require', [0, 'The he param does not exist.']],
            'num': ['> 10', [0, 'The num param must > 10.']],
            'num2': ['> 0', '<= 100', [0, 'The num2 param must > 0.']],
            'reg': ['/^[A-CX-Z5-7]+$/', [0, 'The reg param is incorrect.']],
            'arr': [['a', 'x', 'hehe'], [0, 'The arr param is incorrect.']],
            'type': [{ 'type': { 'a': 1, 'b': '' } }, [0, 'The type param is incorrect']],
            'json': [{ 'type': { 'a': '1', 'b': [ { 'c': 1 } ] } }, [0, 'The json param is incorrect']],
            'json2': [{ 'type': { 'a': '1', 'b': 0, 'c?': { 'd': '1' } } }, [0, 'The json2 param is incorrect']],
        }, retur)) {
            return retur;
        }
        return [1, { 'post': this._post }];
    }

    public async ctrLocale(): Promise<kebab.Json[] | string> {
        const rtn: kebab.Json[] = [];
        if (!this._checkInput(this._get, {
            'lang': [['en', 'sc', 'tc', 'ja'], [0, 'Wrong language.']]
        }, rtn)) {
            return rtn;
        }

        const echo = [
            '<a href="' + this._config.const.urlBase + 'test/ctr-locale">English</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/ctr-locale?lang=sc">简体中文</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/ctr-locale?lang=tc">繁體中文</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/ctr-locale?lang=ja">日本語</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test">Return</a>'
        ];

        const r = await this._loadLocale(this._get['lang'], 'test');
        echo.push(`<pre>await this._loadLocale(this._get['lang'], 'test');</pre>${r ? 'true' : 'false'}`);

        echo.push("<pre>l('hello')</pre>" + this._l('hello'));
        echo.push("<pre>l('copy')</pre>" + this._l('copy'));
        echo.push("<pre>l('test', ['a1', 'a2'])</pre>" + this._l('test', ['a1', 'a2']));

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public ctrCachettl(): string {
        this._cacheTTL = 60;
        return 'This page is cache ttl is 60s.';
    }

    public ctrHttpcode(): string {
        this._httpCode = 404;
        return 'This page is a custom httpcode (404).';
    }

    public ctrCross(): string {
        return `<input type="button" value="Fetch localhost" onclick="document.getElementById('result').innerText='Waiting...';fetch('http://localhost:${this._config.const.hostport}${this._config.const.urlBase}test/ctr-cross1').then(function(r){return r.text();}).then(function(t){document.getElementById('result').innerText=t;}).catch(()=>{document.getElementById('result').innerText='Failed.';});">
<input type='button' value="Fetch localhost with cross" style="margin-left: 10px;" onclick="document.getElementById('result').innerText='Waiting...';fetch('http://localhost:${this._config.const.hostport}${this._config.const.urlBase}test/ctr-cross2').then(function(r){return r.text();}).then(function(t){document.getElementById('result').innerText=t;});">
<input type='button' value="Fetch local-test.brc-app.com with cross" style="margin-left: 10px;" onclick="document.getElementById('result').innerText='Waiting...';fetch('http://local-test.brc-app.com:${this._config.const.hostport}${this._config.const.urlBase}test/ctr-cross2').then(function(r){return r.text();}).then(function(t){document.getElementById('result').innerText=t;});"><br><br>
Result:<pre id="result">Nothing.</pre>` + this._getEnd();
    }

    public ctrCross1(): kebab.Json[] {
        return [1, { 'value': 'done' }];
    }

    public ctrCross2(): kebab.Json[] {
        if (!this._cross()) {
            return [0];
        }
        return [1, { 'value': 'done' }];
    }

    public ctrReadable(): fs.ReadStream {
        this._res.setHeader('content-type', 'text/plain; charset=utf-8');
        return lFs.createReadStream(kebab.SYS_PATH + 'route.js');
    }

    public ctrAsynctask(): any[] {
        this._asyncTask(async () => {
            lCore.debug('ASYNCTASK IN');
            await lCore.sleep(1000);
            lCore.debug('ASYNCTASK TIME1');
            await lCore.sleep(1000);
            lCore.debug('ASYNCTASK TIME2');
            await lCore.sleep(1000);
            lCore.debug('ASYNCTASK OVER');
        });
        return [1];
    }

    public async ctrTimeoutLong(): Promise<any[]> {
        this.timeout = 70_000;
        const echo = ['1'];
        await lCore.sleep(15_000);
        echo.push('2');
        await lCore.sleep(15_000);
        echo.push('3');
        await lCore.sleep(15_000);
        echo.push('4');
        await lCore.sleep(15_000);
        echo.push('5');
        return [1, { 'list': echo }];
    }

    public async ctrTimeoutShort(): Promise<any[]> {
        this.timeout = 5_000;
        const echo = ['1'];
        await lCore.sleep(15_000);
        echo.push('2');
        await lCore.sleep(15_000);
        echo.push('3');
        await lCore.sleep(15_000);
        echo.push('4');
        await lCore.sleep(15_000);
        echo.push('5');
        return [1, { 'list': echo }];
    }

    public async ctr500(): Promise<void> {
        await lCore.sleep(100);
        lCore.writeHead(this._res, 200);
        lCore.debug('DEBUG', (this._res as any).abc.def);
    }

    public async modTest(): Promise<kebab.Json[] | string | boolean> {
        const retur: kebab.Json[] = [];
        if (!(this._checkInput(this._get, {
            'action': [['', 'remove'], [0, 'Error']]
        }, retur))) {
            return retur;
        }

        const echo = ['<b style="color: red;">In a production environment, please delete the "mod/test.ts" file.</b>'];

        const db = lDb.get(this);
        let stmt = await db.query('SELECT * FROM `m_test` WHERE `token` LIMIT 1;');

        if (!stmt.rows) {
            return [0, 'Failed("m_test" not found).'];
        }

        if (this._get['action'] === 'remove') {
            await mTest.removeByWhere(db, [
                ['token', 'LIKE', 'test_%']
            ], {
                'pre': this
            });
            return this._location('test/mod-test');
        }
        else {
            const time = lTime.stamp();
            const test = mTest.getCreate<mTest>(db, {
                'ctr': this
            });
            test.set({
                'name': 'nam' + lCore.rand(0, 3).toString(),
                'point': { 'x': lCore.rand(0, 99), 'y': lCore.rand(0, 99) },
                'polygon': [
                    [
                        { 'x': 1, 'y': 1 },
                        { 'x': 2, 'y': 2 },
                        { 'x': 3, 'y': 3 },
                        { 'x': 1, 'y': 1 }
                    ]
                ],
                'json': { 'x': { 'y': 'abc' } },
                'time_add': time
            });
            const result = await test.create();

            echo.push(`<pre>const time = lTime.stamp();
const test = mTest.getCreate<mTest>(db, {
    'ctr': this
});
test.set({
    'name': 'nam' + lCore.rand(0, 4).toString(),
    'point': { 'x': lCore.rand(0, 99), 'y': lCore.rand(0, 99) },
    'polygon': [
        [
            { 'x': 1, 'y': 1 },
            { 'x': 2, 'y': 2 },
            { 'x': 3, 'y': 3 },
            { 'x': 1, 'y': 1 }
        ]
    ],
    'json': { 'x': { 'y': 'abc' } },
    'time_add': time
});
const result = await test.create();
JSON.stringify(result));</pre>` + JSON.stringify(result));

            echo.push('<pre>JSON.stringify(test.toArray());</pre>' + lText.htmlescape(JSON.stringify(test.toArray())));

            echo.push('<br><br>Test table:');

            stmt = await db.query('SELECT * FROM `m_test` WHERE `token` LIKE \'test_%\' ORDER BY `id` ASC;');
            this._dbTable(stmt, echo);

            // --- explain ---

            const ls = mTest.where<mTest>(db, [
                ['time_add', '>', time - 60 * 5]
            ], {
                'ctr': this
            });
            const r = await ls.explain();
            echo.push(`<pre>const ls = mTest.where<mTest>(db, [
    ['time_add', '>', time - 60 * 5]
], {
    'ctr': this
});
const r = await ls.explain();</pre>` + lText.htmlescape(JSON.stringify(r)));

            const r2 = await ls.explain(true);
            echo.push('<pre>ls->explain(true);</pre>');
            if (r2) {
                echo.push('<table style="width: 100%;">');
                for (const k in r2) {
                    const v = r2[k];
                    echo.push('<tr><th>' + lText.htmlescape(k) + '</th><td>' + (v === null ? 'null' : lText.htmlescape((typeof v === 'string' || typeof v === 'number') ? v.toString() : '[object]')) + '</td></tr>');
                }
                echo.push('</table>');
            }
            else {
                echo.push('<div>false</div>');
            }

            let ft = await mTest.one<mTest>(db, [
                ['time_add', '>', '0']
            ], {
                'ctr': this
            });
            echo.push(`<pre>await mTest.one<mTest>(db, [
    ['time_add', '>', '0']
], {
    'ctr': this
});</pre>`);
            if (ft) {
                echo.push('<table style="width: 100%;">');

                echo.push('<tr><th>id</th><td>' + ft.id.toString() + '</td></tr>');
                echo.push('<tr><th>token</th><td>' + ft.token + '</td></tr>');
                echo.push('<tr><th>point</th><td>' + JSON.stringify(ft.point) + '</td></tr>');
                echo.push('<tr><th>polygon</th><td>' + JSON.stringify(ft.polygon) + '</td></tr>');
                echo.push('<tr><th>json</th><td>' + JSON.stringify(ft.json) + '</td></tr>');
                echo.push('<tr><th>time_add</th><td>' + ft.time_add.toString() + '</td></tr>');

                echo.push('</table>');

                // --- 修改 point 值 ---

                ft.set('point', {
                    'x': 20,
                    'y': 20
                });
                await ft.save();
                echo.push(`<pre>ft.set('point', {
    'x': 20,
    'y': 20
});
await ft.save();</pre>`);

                ft = await mTest.find<mTest>(db, ft.id, {
                    'ctr': this
                });
                if (!ft) {
                    return '';
                }

                echo.push('<table style="width: 100%;">');

                echo.push('<tr><th>id</th><td>' + ft.id.toString() + '</td></tr>');
                echo.push('<tr><th>token</th><td>' + ft.token + '</td></tr>');
                echo.push('<tr><th>point</th><td>' + JSON.stringify(ft.point) + '</td></tr>');
                echo.push('<tr><th>polygon</th><td>' + JSON.stringify(ft.polygon) + '</td></tr>');
                echo.push('<tr><th>json</th><td>' + JSON.stringify(ft.json) + '</td></tr>');
                echo.push('<tr><th>time_add</th><td>' + ft.time_add.toString() + '</td></tr>');

                echo.push('</table>');

                // --- 再次修改 ---

                ft.set({
                    'point': {
                        'x': 40,
                        'y': 40
                    },
                    'polygon': [
                        [
                            { 'x': 5, 'y': 1 },
                            { 'x': 6, 'y': 2 },
                            { 'x': 7, 'y': 3 },
                            { 'x': 5, 'y': 1 }
                        ]
                    ],
                    'json': { 'x': { 'y': 'def' } }
                });
                await ft.save();
                await ft.refresh();
                echo.push(`<pre>ft.set({
    'point': {
        'x': 40,
        'y': 40
    },
    'polygon': [
        [
            { 'x': 5, 'y': 1 },
            { 'x': 6, 'y': 2 },
            { 'x': 7, 'y': 3 },
            { 'x': 5, 'y': 1 }
        ]
    ],
    'json': { 'x': { 'y': 'def' } }
});
await ft.save();
await ft.refresh();</pre>`);

                echo.push('<table style="width: 100%;">');

                echo.push('<tr><th>id</th><td>' + ft.id.toString() + '</td></tr>');
                echo.push('<tr><th>token</th><td>' + ft.token + '</td></tr>');
                echo.push('<tr><th>point</th><td>' + JSON.stringify(ft.point) + '</td></tr>');
                echo.push('<tr><th>polygon</th><td>' + JSON.stringify(ft.polygon) + '</td></tr>');
                echo.push('<tr><th>json</th><td>' + JSON.stringify(ft.json) + '</td></tr>');
                echo.push('<tr><th>time_add</th><td>' + ft.time_add.toString() + '</td></tr>');

                echo.push('</table>');
            }
            else {
                echo.push('<div>false</div>');
            }

            echo.push('<br><a href="' + this._config.const.urlBase + 'test/mod-test?action=remove">Remove all test data</a> | <a href="' + this._config.const.urlBase + 'test">Return</a>');

            return echo.join('') + '<br><br>' + this._getEnd();
        }
    }

    public async modSplit(): Promise<string> {
        const echo = ['<b style="color: red;">In a production environment, please delete "mod/test.php" and "mod/testdata.php" files.</b>'];

        const db = lDb.get(this);

        echo.push(`<br><br>Test SQL:<pre>CREATE TABLE \`m_test\` (
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`token\` CHAR(16) NOT NULL COLLATE 'ascii_bin',
    \`point\` POINT NOT NULL,
    \`time_add\` BIGINT NOT NULL,
    PRIMARY KEY (\`id\`) USING BTREE,
    UNIQUE INDEX \`token\` (\`token\`) USING BTREE,
    INDEX \`time_add\` (\`time_add\`) USING BTREE
) ENGINE=InnoDB COLLATE=utf8mb4_general_ci;
CREATE TABLE \`m_test_data_0\` (
    \`id\` bigint NOT NULL AUTO_INCREMENT,
    \`test_id\` bigint NOT NULL,
    \`content\` varchar(128) COLLATE ascii_bin NOT NULL,
    \`time_add\` bigint NOT NULL,
    PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_bin;</pre>m_test_data_0 - m_test_data_4<br><br>`);

        // --- 操作按钮 ---

        echo.push(`<input type="button" value="Create user" onclick="this.value='Waiting...';fetch('${this._config.const.urlBase}test/mod-split1',{method:'GET',headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(function(r){window.location.href=window.location.href})">
<input type="button" value="Random post" onclick="this.value='Waiting...';fetch('${this._config.const.urlBase}test/mod-split2',{method:'GET',headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(function(r){return r.json()}).then(function(j){alert('TESTID:'+j.id+'\\nTABLEINDEX:'+j.index);window.location.href=window.location.href})">`);

        // --- 读取 test 和 test_data 表 ---

        let stmt = await db.query('SELECT * FROM `m_test` ORDER BY `id` DESC LIMIT 0, 20;');
        echo.push('<br><br><b>m_test</b> table:');
        this._dbTable(stmt, echo);

        for (let i = 0; i < 5; ++i) {
            stmt = await db.query('SELECT * FROM `m_test_data_' + i.toString() + '` ORDER BY `id` DESC LIMIT 0, 20;');
            echo.push('<br><b>m_test_data_' + i.toString() + '</b> table:');
            this._dbTable(stmt, echo);
        }

        return echo.join('') + '<br>' + this._getEnd();
    }

    public async modSplit1(): Promise<void> {
        const db = lDb.get(this);

        const test = mTest.getCreate<mTest>(db, {
            'ctr': this
        });
        test.set({
            'name': lCore.random(4),
            'token': lCore.random(lCore.rand(8, 32)),
            'point': {
                'x': 10,
                'y': 10
            },
            'time_add': lTime.stamp()
        });
        await test.create();
    }

    public async modSplit2(): Promise<kebab.Json[]> {
        const db = lDb.get(this);

        const ids: number[] = [];
        const ls = await mTest.select<mTest>(db, ['id'], {
            'ctr': this
        }).by('time_add').limit(0, 50).all();
        if (ls) {
            for (const item of ls) {
                if (!item.id) {
                    continue;
                }
                ids.push(item.id);
            }
        }
        if (ids.length === 0) {
            return [0, 'The "test" table not found.'];
        }
        const id = ids[lCore.rand(0, ids.length - 1)];

        // --- 一致性 hash ---
        const index = lConsistent.fast(id.toString(), ['0', '1', '2', '3', '4']);

        const testData = mTestData.getCreate<mTestData>(db, {
            'ctr': this,
            'index': index ?? ''
        });
        testData.set({
            'test_id': id,
            'content': lCore.random(lCore.rand(8, 32)),
            'time_add': lTime.stamp()
        });
        await testData.create();

        return [1, { 'id': id, 'index': index }];
    }

    public async modInsert(): Promise<string> {
        const echo = ['<b style="color: red;">In a production environment, please delete "mod/test.php" and "mod/testdata.php" files.</b>'];
        const db = lDb.get(this);
        const datas: any[][] = [];
        for (let i = 0; i < 20; ++i) {
            datas.push([
                lCore.rand(100000, 999999),
                lCore.random(16, lCore.RANDOM_LUNS),
                lTime.stamp(),
            ]);
        }
        const res = await mTestData.insert(db, ['test_id', 'content', 'time_add'], datas, {
            'pre': this,
            'index': '0',
        });
        echo.push('<br><br>Result: ' + JSON.stringify(res));
        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public captchaFastbuild(): string {
        return lCaptcha.get(400, 100).getBuffer();
    }

    public captchaBase64(): string {
        const echo = [`<pre>const cap = lCaptcha.get(400, 100);
const phrase = cap.getPhrase();
const base64 = cap.getBase64();</pre>phrase:`];
        const cap = lCaptcha.get(400, 100);
        const phrase = cap.getPhrase();
        const base64 = cap.getBase64();
        echo.push('<pre>' + phrase + '</pre>');

        echo.push('base64:');
        echo.push('<pre style="white-space: pre-wrap; word-wrap: break-word; overflow-y: auto; max-height: 200px;">' + base64 + '</pre>');

        echo.push('&lt;img src="&lt;?php echo $base64 ?&gt;" style="width: 200px; height: 50px;"&gt;');
        echo.push('<pre><img alt="captcha" src="' + base64 + '" style="width: 200px; height: 50px;"></pre>');

        return echo.join('') + this._getEnd();
    }

    public coreRandom(): string {
        return '<pre>lCore.random(16, lCore.RANDOM_LUNS);</pre>' + lText.htmlescape(lCore.random(16, lCore.RANDOM_LUNS)) +
            '<pre>lCore.random(4, lCore.RANDOM_V);</pre>' + lText.htmlescape(lCore.random(4, lCore.RANDOM_V)) +
            '<pre>lCore.random(8, lCore.RANDOM_N, \'0349\');</pre>' + lText.htmlescape(lCore.random(8, lCore.RANDOM_N, '0349')) +
            '<pre>lCore.random(8, lCore.RANDOM_LNU);</pre>' + lText.htmlescape(lCore.random(8, lCore.RANDOM_LUN)) +
            '<pre>lCore.random(16, lCore.RANDOM_LNU);</pre>' + lText.htmlescape(lCore.random(16, lCore.RANDOM_LUN)) +
            '<br><br>' + this._getEnd();
    }

    public coreRand(): string {
        return '<pre>lCore.rand(1.2, 7.1, 1);</pre>' + lCore.rand(1.2, 7.1, 1).toString() +
            '<pre>lCore.rand(1.2, 7.1, 5);</pre>' + lCore.rand(1.2, 7.1, 5).toString() +
            '<pre>lCore.rand(1.298, 7.1891, 2);</pre>' + lCore.rand(1.298, 7.1891, 2).toString() +
            '<br><br>' + this._getEnd();
    }

    public coreConvert62(): string {
        return '<pre>lCore.convert62(10);</pre>' + lCore.convert62(10) +
            '<pre>lCore.convert62(100);</pre>' + lCore.convert62(100) +
            '<pre>lCore.convert62(1992199519982001n);</pre>' + lCore.convert62(1992199519982001n) +
            '<pre>lCore.convert62(9223372036854770000n);</pre>' + lCore.convert62(9223372036854770000n) +
            '<pre>lCore.convert62(9223372036854775807n);</pre>' + lCore.convert62(9223372036854775807n) +

            '<pre>lCore.unconvert62(\'a\');</pre>' + lCore.unconvert62('a').toString() +
            '<pre>lCore.unconvert62(\'100\');</pre>' + lCore.unconvert62('100').toString() +
            '<pre>lCore.unconvert62(\'zzz\');</pre>' + lCore.unconvert62('zzz').toString() +
            '<pre>lCore.unconvert62(\'ZZZ\');</pre>' + lCore.unconvert62('ZZZ').toString() +
            '<pre>lCore.unconvert62(\'97HMXKQql\');</pre>' + lCore.unconvert62('97HMXKQql').toString() +
            '<pre>lCore.unconvert62(\'aZl8N0y57gs\');</pre>' + lCore.unconvert62('aZl8N0y57gs').toString() +
            '<pre>lCore.unconvert62(\'aZl8N0y58M7\');</pre>' + lCore.unconvert62('aZl8N0y58M7').toString() +
            '<br><br>' + this._getEnd();
    }

    public corePurify(): string {
        const html = `<html>
    <head>
        <title>Title</title>
    </head>
    <body>
        <!-- h1 -->
        <h1>Hello</h1>
        <h2>World</h2>
        <div>// abc</div>
        <script>
        // --- test ---
        if (a) {
           alert('zzz');
        }
        /* --- test 2 --- */
        if (b) {
           alert('zzz');
        }
        </script>
    </body>
</html>`;
        return '<pre>lCore.purify(`' + lText.htmlescape(html) + '`);</pre>' + lText.htmlescape(lCore.purify(html)) + '<br><br>' + this._getEnd();
    }

    public coreChecktype(): string {
        const type1 = {
            'a': '1',
            'b': 0,
            'c': false,
            'd': {
                'e': 0,
                'f': false,
                'g': [
                    {
                        'h': 0
                    }
                ]
            }
        };
        const type2 = [
            {
                'a': '',
                'b': '1',
                'c': /^a.c$/
            }
        ];
        const o1 = 0;
        const o2 = {
            'a': '',
            'b': ''
        };
        const o3 = [{
            'a': '',
            'b': 'ok',
            'c': 'acd'
        }];
        const o4 = {
            'a': 'aaa',
            'b': 21424,
            'c': true,
            'd': {
                'e': 0,
                'f': false,
                'g': 'ok'
            }
        };
        const o5 = {
            'a': 'aaa',
            'b': 21424,
            'c': true,
            'd': {
                'e': 0,
                'f': false,
                'g': [
                    {
                        'x': 'ok'
                    }
                ]
            }
        };
        const o6 = {
            'a': 'aaa',
            'b': 21424,
            'c': true,
            'd': {
                'e': 0,
                'f': false,
                'g': [
                    {
                        'h': 138
                    }
                ]
            }
        };
        const o7 = [
            {
                'a': '',
                'b': 'ok'
            },
            {
                'a': '',
                'b': 'ok2'
            },
            {
                'a': '',
                'b': 0
            }
        ];
        const o8 = [{
            'a': '',
            'b': 'ok',
            'c': 'abc'
        }];
        return `type1:<pre>${JSON.stringify(type1)}</pre>
type2:<pre>${JSON.stringify(type2)}</pre>
o1:<pre>${JSON.stringify(o1)}</pre>
lCore.checkType(o1, type1): ${lCore.checkType(o1, type1)}<br>
lCore.checkType(o1, type2): ${lCore.checkType(o1, type2)}<br><br>
o2:<pre>${JSON.stringify(o2)}</pre>
lCore.checkType(o2, type1): ${lCore.checkType(o2, type1)}<br>
lCore.checkType(o2, type2): ${lCore.checkType(o2, type2)}<br><br>
o3:<pre>${JSON.stringify(o3)}</pre>
lCore.checkType(o3, type1): ${lCore.checkType(o3, type1)}<br>
lCore.checkType(o3, type2): ${lCore.checkType(o3, type2)}<br><br>
o4:<pre>${JSON.stringify(o4)}</pre>
lCore.checkType(o4, type1): ${lCore.checkType(o4, type1)}<br>
lCore.checkType(o4, type2): ${lCore.checkType(o4, type2)}<br><br>
o5:<pre>${JSON.stringify(o5)}</pre>
lCore.checkType(o5, type1): ${lCore.checkType(o5, type1)}<br>
lCore.checkType(o5, type2): ${lCore.checkType(o5, type2)}<br><br>
o6:<pre>${JSON.stringify(o6)}</pre>
lCore.checkType(o6, type1): ${lCore.checkType(o6, type1)}<br>
lCore.checkType(o6, type2): ${lCore.checkType(o6, type2)}<br><br>
o7:<pre>${JSON.stringify(o7)}</pre>
lCore.checkType(o7, type1): ${lCore.checkType(o7, type1)}<br>
lCore.checkType(o7, type2): ${lCore.checkType(o7, type2)}<br><br>
o8:<pre>${JSON.stringify(o8)}</pre>
lCore.checkType(o8, type1): ${lCore.checkType(o8, type1)}<br>
lCore.checkType(o8, type2): ${lCore.checkType(o8, type2)}
<br><br>${this._getEnd()}`;
    }

    public coreMuid(): string {
        const ac = lText.isTruthy(this._get['ac']) ? this._get['ac'] : '';

        const echo = [
            '<a href="' + this._config.const.urlBase + 'test/core-muid">Default</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/core-muid?ac=big">Big</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test">Return</a>'
        ];

        if (ac === '') {
            let muid = lCore.muid(this);
            echo.push('<pre>lCore.muid(this);</pre>' + muid + ' (' + muid.length.toString() + ')');

            muid = lCore.muid(this);
            echo.push('<pre>lCore.muid(this);</pre>' + muid + ' (' + muid.length.toString() + ')');

            muid = lCore.muid(this, { 'bin': false });
            echo.push(`<pre>lCore.muid(this, { 'bin': false });</pre>` + muid + ' (' + muid.length.toString() + ')');

            muid = lCore.muid(this, { 'len': 16 });
            echo.push(`<pre>lCore.muid(this, { 'len': 16 });</pre>` + muid + ' (' + muid.length.toString() + ')');

            muid = lCore.muid(this, { 'len': 16, 'bin': false });
            echo.push(`<pre>lCore.muid(this, { 'len': 16, 'bin': false });</pre>` + muid + ' (' + muid.length.toString() + ')');

            muid = lCore.muid(this, { 'insert': 'Aa', 'len': 32 });
            echo.push(`<pre>lCore.muid(this, { 'insert': 'Aa', 'len': 32 });</pre>` + muid + ' (' + muid.length.toString() + ')');

            muid = lCore.muid(this, { 'key': 'M' });
            echo.push(`<pre>lCore.muid(this, { 'key': 'M' });</pre>` + muid + ' (' + muid.length.toString() + ')');

            echo.push('<br><br>');
        }
        else {
            const parr: string[] = [];
            const oarr: string[] = [];
            for (let i = 0; i < 30000; ++i) {
                const muid = lCore.muid(this, { 'insert': '0' });
                const sp = oarr.indexOf(muid);
                if (sp > -1) {
                    parr.push(muid + '[' + sp.toString() + ']' + oarr[sp]);
                    continue;
                }
                oarr.push(muid);
            }
            echo.push(`<pre>
const parr: string[] = [];
const oarr: string[] = [];
for (let i = 0; i < 30000; ++i) {
    const muid = lText.muid(this);
    const sp = oarr.indexOf(muid);
    if (sp > -1) {
        parr.push(muid + '[' + sp.toString() + ']' + oarr[sp]);
        continue;
    }
    oarr.push(muid);
}</pre>parr length: ${parr.length}<br>oarr length: ${oarr.length}<br><br>parr:<pre>${JSON.stringify(parr)}</pre>oarr:<pre>${JSON.stringify(oarr.slice(0, 100)).slice(0, -1)}...</pre>`);
        }

        return echo.join('') + this._getEnd();
    }

    public async coreGetlog(): Promise<string> {
        const path = lTime.format(null, 'Y/m/d/H');
        const list = await lCore.getLog({
            'hostname': this._config.const.hostname,
            'path': path,
            'fend': '-visit',
        });
        const echo: string[] = [];
        echo.push('<table style="width: 100%;">');
        if (list) {
            echo.push('<tr><th>TIME</th><th>UNIX</th><th>URL</th><th>COOKIE</th><th>SESSION</th><th>JWT</th><th>USER_AGENT</th><th>REALIP</th><th>CLIENTIP</th><th>MESSAGE</th></tr>');
            for (const row of list) {
                echo.push('<tr>');
                for (const item of row) {
                    echo.push('<td>' + lText.htmlescape(item) + '</td>');
                }
                echo.push('</tr>');
            }
        }
        else {
            echo.push('<tr><th>' + JSON.stringify(list) + '</th></tr>');
        }
        echo.push('</table>');
        return echo.join('') + '<br>' + this._getEnd();
    }

    public async coreLs(): Promise<string> {
        const echo: string[] = [
            './'
        ];
        const list = await lCore.ls({
            'path': './',
        });
        echo.push('<table style="width: 100%;">');
        for (const item of list) {
            echo.push('<tr>');
            echo.push('<td>' + lText.htmlescape(item.name) + '</td>');
            echo.push('<td>isDirectory:' + (item.isDirectory ? 'true' : 'false') + '</td>');
            echo.push('<td>isFile:' + (item.isFile ? 'true' : 'false') + '</td>');
            echo.push('<td>isSymbolicLink:' + (item.isSymbolicLink ? 'true' : 'false') + '</td>');
            echo.push('</tr>');
        }
        echo.push('</table>');
        // --- source/ ---
        echo.push('source/');
        const list2 = await lCore.ls({
            'path': 'source/',
        });
        echo.push('<table style="width: 100%;">');
        for (const item of list2) {
            echo.push('<tr>');
            echo.push('<td>' + lText.htmlescape(item.name) + '</td>');
            echo.push('<td>isDirectory:' + (item.isDirectory ? 'true' : 'false') + '</td>');
            echo.push('<td>isFile:' + (item.isFile ? 'true' : 'false') + '</td>');
            echo.push('<td>isSymbolicLink:' + (item.isSymbolicLink ? 'true' : 'false') + '</td>');
            echo.push('</tr>');
        }
        echo.push('</table>');
        return echo.join('') + '<br>' + this._getEnd();
    }

    public async coreUpdatecode(): Promise<string> {
        const zip = `${this._config.const.dataPath}test.zip`;
        const to = '';
        const echo: string[] = [
            `zip: ${zip}<br>
to: ${to}`
        ];
        const list = await lCore.updateCode(zip, to);
        echo.push(`<pre>const list = lCore.updateCode(zip, to);</pre>${JSON.stringify(list)}`);
        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async coreReload(): Promise<string> {
        await lCore.sendReload();
        return 'The reload request has been sent, please review the console.<br><br>' + this._getEnd();
    }

    public async coreRestart(): Promise<string> {
        await lCore.sendRestart();
        return 'The restart request has been sent, please review the console.<br><br>' + this._getEnd();
    }

    public async coreGlobal(): Promise<string> {
        const ts = lTime.stamp().toString();
        const echo = [
            `<pre>lCore.global.tglobal</pre>`,
            lCore.global.tglobal === undefined ? 'undefined' : JSON.stringify(lCore.global.tglobal),
            `<pre>lCore.setGlobal('tglobal', 'ts:${ts}');</pre>`
        ];
        await lCore.setGlobal('tglobal', 'ts:' + ts);
        await lCore.sleep(50);
        echo.push(JSON.stringify(lCore.global.tglobal));

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async crypto(): Promise<string> {
        const echo = ['<b>AES-256-ECB:</b>'];

        const key = 'testkeyatestkeyatestkeyatestkeya';
        let text = lCrypto.aesEncrypt('Original text', key);
        echo.push(`<pre>const key = 'testkeyatestkeyatestkeyatestkeya';
const text = lCrypto.aesEncrypt('Original text', key);
JSON.stringify(text);</pre>${JSON.stringify(text)}`);

        let orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key);
        echo.push(`<pre>let orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key);
JSON.stringify(orig);</pre>${JSON.stringify(orig)}`);

        orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), 'otherKey');
        echo.push(`<pre>orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), 'otherKey');
JSON.stringify(orig);</pre>${JSON.stringify(orig)}`);

        // ----------

        echo.push('<br><br><b>AES-256-CFB:</b>');

        const iv = 'iloveuiloveuilov';
        text = lCrypto.aesEncrypt('Original text', key, iv);
        echo.push(`<pre>const iv = 'iloveuiloveuilov';
text = lCrypto.aesEncrypt('Original text', key, iv);
JSON.stringify(text);</pre>${JSON.stringify(text)}`);

        orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key, iv);
        echo.push(`<pre>orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key, iv);
JSON.stringify(orig);</pre>${JSON.stringify(orig)}`);

        orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key, 'otherIv');
        echo.push(`<pre>orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key, 'otherIv');
orig ? 'true' : 'false';</pre>${orig ? 'true' : 'false'}`);

        // ----------

        echo.push('<br><br><b>AES-256-CBC:</b>');

        text = lCrypto.aesEncrypt('Original text', key, iv, lCrypto.AES_256_CBC);
        echo.push(`<pre>const key = 'testkeyatestkeyatestkeyatestkeya';
text = lCrypto.aesEncrypt('Original text', key, iv, lCrypto.AES_256_CBC);
JSON.stringify(text);</pre>${JSON.stringify(text)}`);

        orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key, iv, lCrypto.AES_256_CBC);
        echo.push(`<pre>orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key, iv, lCrypto.AES_256_CBC);
JSON.stringify(orig);</pre>${JSON.stringify(orig)}`);

        orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key, 'otherIv', lCrypto.AES_256_CBC);
        echo.push(`<pre>orig = lCrypto.aesDecrypt(lText.logicalOr(text, ''), key, 'otherIv', lCrypto.AES_256_CBC);
JSON.stringify(orig);</pre>${JSON.stringify(orig)}`);

        // --- gcm ---

        echo.push('<br><br><b>AES-256-GCM (TEXT):</b>');

        text = lCrypto.gcmEncrypt('Original text', key);
        echo.push(`<pre>const key = 'testkeyatestkeyatestkeyatestkeya';
text = lCrypto.gcmEncrypt('Original text', key);
JSON.stringify(text);</pre>${lText.htmlescape(JSON.stringify(text))}`);

        orig = lCrypto.gcmDecrypt(lText.logicalOr(text, ''), key);
        echo.push(`<pre>orig = lCrypto.gcmDecrypt(lText.logicalOr(text, ''), key);
JSON.stringify(orig);</pre>${JSON.stringify(orig)}`);

        echo.push('<br><br><b>AES-256-GCM (BUFFER):</b>');

        const buffer = lCrypto.gcmEncrypt(Buffer.from('Original text'), key, 'buffer');
        echo.push(`<pre>const key = 'testkeyatestkeyatestkeyatestkeya';
const buffer = lCrypto.gcmEncrypt(Buffer.from('Original text'), key);
console.log(buffer);</pre>${buffer ? lText.htmlescape(lText.stringifyBuffer(buffer)) : 'false'}`);

        const origBuffer = lCrypto.gcmDecrypt(lText.isTruthy(buffer) ? buffer : Buffer.from(''), key, 'buffer');
        echo.push(`<pre>const origBuffer = lCrypto.gcmDecrypt(buffer || Buffer.from(''), key, 'buffer');
console.log(origBuffer);</pre>${origBuffer ? lText.htmlescape(lText.stringifyBuffer(origBuffer)) : 'false'}
<pre>JSON.stringify(origBuffer ? origBuffer.toString() : false);</pre>${JSON.stringify(origBuffer ? origBuffer.toString() : false)}`);

        // ----------

        echo.push('<br><br><b>EC:</b>');

        const res = await lCrypto.generateKeyPair('ec', {
            'namedCurve': 'sm2',
            'privateKeyEncoding': {
                'type': 'sec1'
            }
        });
        echo.push(`<pre>const res = lCrypto.generateKeyPair('ec', {
    'namedCurve': 'sm2',
    'privateKeyEncoding': {
        'type': 'sec1'
    }
});
JSON.stringify(res);</pre>${JSON.stringify(res)}`);

        const sign = lCrypto.sign('Hello MAIYUN.NET', res.private, 'base64', 'sm3');
        echo.push(`<pre>const sign = lCrypto.sign('Hello MAIYUN.NET', res.private, 'base64', 'sm3');
JSON.stringify(sign);</pre>${JSON.stringify(sign)}`);

        const r = lCrypto.verify('Hello MAIYUN.NET', res.public, Buffer.from(sign, 'base64'), 'sm3');
        echo.push(`<pre>const r = lCrypto.verify('Hello MAIYUN.NET', res.public, Buffer.from(sign, 'base64'), 'sm3');
JSON.stringify(r);</pre>${JSON.stringify(r)}`);

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async db(): Promise<kebab.Json> {
        const echo = [(Math.round(this._getRunTime() * 10000000) / 10000).toString()];

        const db = lDb.get(this);

        // --- 先获取 test 表的情况 ---
        let stmt = await db.query('SELECT * FROM `m_test` ORDER BY `id` DESC LIMIT 10;');
        if (!stmt.rows) {
            return [0, stmt.error ? (stmt.error.message + '(' + stmt.error.errno.toString() + ')') : 'Failed("m_test" not found).'];
        }

        echo.push(`<pre>const db = lDb.get(this);
const stmt = await db.query('SELECT * FROM \`m_test\` ORDER BY \`id\` DESC LIMIT 10;');</pre>`);

        this._dbTable(stmt, echo);

        echo.push('<br>ms: ' + (Math.round(this._getRunTime() * 10000000) / 10000).toString());

        // --- 插入 test-token 的条目 ---
        const time = lTime.stamp().toString();
        let exec = await db.execute('INSERT INTO `m_test` (`token`, `point`, `time_add`) VALUES (\'test-token\', ST_POINTFROMTEXT(\'POINT(10 10)\'), \'' + time + '\');');
        let ms = (Math.round(this._getRunTime() * 10000000) / 10000).toString();
        let insertId: number = 0;
        if (exec.error?.errno === 1062) {
            insertId = (await db.query('SELECT * FROM `m_test` WHERE `token` = \'test-token\';')).rows?.[0].id ?? 0;
            ms += ', ' + (Math.round(this._getRunTime() * 10000000) / 10000).toString();
        }
        else {
            insertId = exec.packet?.insertId ?? 0;
        }

        echo.push(`<pre>const time = lTime.stamp().toString();
const exec = await db.execute('INSERT INTO \`m_test\` (\`token\`, \`data\`, \`time_update\`, \`time_add\`) VALUES (\\'test-token\\', ST_POINTFROMTEXT(\\'POINT(10 10)\\'), \\'' + time + '\\');');
let insertId: number = 0;
if (exec.error?.errno === 1062) {
    insertId = (await db.query('SELECT * FROM \`m_test\` WHERE \`token\` = \\'test-token\\';')).rows?.[0].id ?? 0;
}
else {
    insertId = exec.packet?.insertId ?? 0;
}</pre>
exec: ${JSON.stringify(exec)}<br>
insertId: ${JSON.stringify(insertId)}<br>
errno: ${JSON.stringify(exec.error?.errno)}<br>
error: ${JSON.stringify(exec.error)}<br>
ms: ${ms}<br><br>`);

        // --- 获取最近的一条 ---
        stmt = await db.query('SELECT * FROM `m_test` ORDER BY `id` DESC LIMIT 1;');
        this._dbTable(stmt, echo);

        // --- 再次插入 test-token 的条目 ---
        exec = await db.execute('INSERT INTO `m_test` (`token`, `point`, `time_add`) VALUES (\'test-token\', ST_POINTFROMTEXT(\'POINT(10 10)\'), \'' + time + '\');');
        insertId = exec.packet?.insertId ?? 0;
        echo.push(`<pre>exec = await db.execute('INSERT INTO \`m_test\` (\`token\`, \`point\`, \`time_add\`) VALUES (\\'test-token\\', ST_POINTFROMTEXT(\\'POINT(10 10)\\'), \\'' + time + '\\');');
insertId = exec.packet?.insertId ?? 0;</pre>
exec: ${JSON.stringify(exec)}<br>
insertId: ${JSON.stringify(insertId)}<br>
errno: ${JSON.stringify(exec.error?.errno)}<br>
error: ${JSON.stringify(exec.error)}<br>
ms: ${(Math.round(this._getRunTime() * 10000000) / 10000).toString()}<br>`);

        // --- 依据唯一键替换值 ---
        exec = await db.execute('REPLACE INTO `m_test` (`token`, `point`, `time_add`) VALUES (\'test-token\', ST_POINTFROMTEXT(\'POINT(20 20)\'), \'' + time + '\');');
        insertId = exec.packet?.insertId ?? 0;
        echo.push(`<pre>exec = await db.execute('REPLACE INTO \`m_session\` (\`token\`, \`point\`, \`time_add\`) VALUES (\\'test-token\\', ST_POINTFROMTEXT(\\'POINT(20 20)\\'), \\'' + time + '\\');');
insertId = exec.packet?.insertId ?? 0;</pre>
exec: ${JSON.stringify(exec)}<br>
insertId: ${JSON.stringify(insertId)}<br>
errno: ${JSON.stringify(exec.error?.errno)}<br>
error: ${JSON.stringify(exec.error)}<br>
ms: ${(Math.round(this._getRunTime() * 10000000) / 10000).toString()}<br><br>`);

        // --- 显示近 10 条 ---
        stmt = await db.query('SELECT * FROM `m_test` ORDER BY `id` DESC LIMIT 10;');
        this._dbTable(stmt, echo);

        // --- explain 开始 ---
        const explain = 'EXPLAIN';
        stmt = await db.query(explain + ' SELECT * FROM `m_test` LIMIT 10;');
        echo.push(`<pre>stmt = await db.query('${explain} SELECT * FROM \`m_test\` LIMIT 10;');</pre>`);
        this._dbTable(stmt, echo);

        echo.push('<br>ms: ' + (Math.round(this._getRunTime() * 10000000) / 10000).toString());

        // --- 删除测试添加的 token ---
        exec = await db.execute('DELETE FROM `m_test` WHERE `token` = \'test-token\';');
        echo.push(`<pre>exec = await db.execute('DELETE FROM \`m_test\` WHERE \`token\` = \\'test-token\\';');</pre>
exec: ${JSON.stringify(exec)}<br><br>`);

        stmt = await db.query('SELECT * FROM `m_test` ORDER BY `id` DESC LIMIT 10;');
        this._dbTable(stmt, echo);

        return echo.join('') + '<br>queries: ' + db.getQueries().toString() + '<br>' + this._getEnd();
    }

    private _dbTable(stmt: lDb.IData, echo: kebab.Json[]): void {
        echo.push('<table style="width: 100%;"><tr>');
        if (stmt.rows) {
            for (const item of stmt.fields) {
                echo.push('<th>' + lText.htmlescape(item.name) + '</th>');
            }
            echo.push('</tr>');

            for (const row of stmt.rows) {
                echo.push('<tr>');
                for (const key in row) {
                    const val = row[key];
                    echo.push('<td>' + (val === null ? 'null' : lText.htmlescape(JSON.stringify(val))) + '</td>');
                }
                echo.push('</tr>');
            }
        }
        else {
            echo.push('<th>No data</th></tr>');
        }
        echo.push('</table>');
    }

    public async vector(): Promise<any> {
        const vector = lVector.get(this);
        const res = await vector.seach({
            'collection': 'oas_wiki',
            'metric': 'COSINE',
            'data': [0.4100031323819555, 0.7188991736586672, 0.32890290245747833, 0.9187961849628559, 0.023142186415922916, 0.45239563148580797, 0.23537591588175988, 0.6848990771759962, 0.9865744633216178, 0.8239142304110896, 0.997768380245414, 0.3012929412655765, 0.13731236076734943, 0.5126131685642945, 0.9806290097015617, 0.1870468071764284, 0.17178642706602143, 0.4016660911946244, 0.15484433366942607, 0.29719222215610386, 0.3103748731148619, 0.6892950176658315, 0.01785695346759608, 0.08539564964986557, 0.2655959514380064, 0.9964617086704073, 0.2838371937684081, 0.14987010598298633, 0.6228479079557896, 0.8080833516756243, 0.15438562173495285, 0.5078008662168574, 0.27262149922940804, 0.23104911473240675, 0.6266656488428926, 0.8553958245035254, 0.11699454830789868, 0.2300336351244865, 0.3042943975707315, 0.20182231286864427, 0.14334825938359863, 0.5272057735967806, 0.6568390179350452, 0.11388912236667226, 0.4916225414998463, 0.4913046496135085, 0.6301252401085475, 0.26051075673874036, 0.17023441587522825, 0.371755148312803, 0.5831318953846139, 0.9756820442368113, 0.6818893859710211, 0.5188330204766185, 0.7868335112863099, 0.7263293211859105, 0.15777067513918275, 0.25071428052177835, 0.9055952502390328, 0.39066574162485046, 0.6694768856781026, 0.904527206408617, 0.5359679189729842, 0.42923033393177423, 0.6959492373261136, 0.4721197667950616, 0.6861043448179791, 0.05188999799541438, 0.7346607591003518, 0.1574483630625012, 0.9141756884547747, 0.9116789303557802, 0.7609450526832306, 0.7763073356227885, 0.7334996162535046, 0.8036447394427264, 0.21291521237560262, 0.4628513517221038, 0.005054981316060525, 0.6289756103407573, 0.9376033918403373, 0.79713161153396, 0.1795021378890418, 0.32421299215073773, 0.5585715705291334, 0.1964507020528392, 0.9170965358836494, 0.44199069294404825, 0.46924875851341463, 0.005915168915280544, 0.4519648598811945, 0.7817208441823769, 0.39630447274483926, 0.874803477246406, 0.02593537985516514, 0.03494415508402371, 0.6948556600612117, 0.02531235612016558, 0.3252859275909026, 0.6124602304575255, 0.6662991517754546, 0.054786469959723805, 0.09541281916656552, 0.047971618444194286, 0.9888851535738363, 0.09923862294731634, 0.37389883211204245, 0.0510449762242422, 0.5140187522339308, 0.9165108670272317, 0.473682888066292, 0.7553395418192084, 0.48450479101753663, 0.22080081972551513, 0.8461012374988566, 0.32711442729081885, 0.46740436391036244, 0.9330234279632854, 0.7456194346850014, 0.8575560505025164, 0.2617623984893922, 0.6418053194775086, 0.607749877895083, 0.2176063100000032, 0.5366633111896186, 0.9689538808794083, 0.8226310778269623, 0.4813948057818185]
        });
        const echo = [`<pre>const res = await vector.seach({
    'collection': 'oas_wiki',
    'metric': 'COSINE',
    'data': [0.4100031323819555, 0.7188991736586672, 0.32890290245747833, ...]
});</pre>res:<pre>${JSON.stringify(res, null, 4)}</pre>`];
        return echo.join('') + '<br>' + this._getEnd();
    }

    public async kv(): Promise<kebab.Json> {
        const kv = lKv.get(this);
        if (!await kv.ping()) {
            return [0, 'Failed.'];
        }
        const value = this._get['value'] ?? '';
        const ac = this._get['ac'] ?? '';

        const echo = [`<pre>const kv = lKv.get(this);
if (!await kv.ping()) {
    return [0, 'Failed.'];
}
JSON.stringify(await kv.ping());</pre>${JSON.stringify(await kv.ping())}`];

        if (ac == 'delete') {
            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.del('test'));</pre>" + JSON.stringify(await kv.del('test')));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));
        }
        else if (ac === 'ttl') {
            echo.push("<pre>JSON.stringify(await kv.ttl('test'));</pre>" + JSON.stringify(await kv.ttl('test')));
            echo.push("<pre>JSON.stringify(await kv.pttl('test'));</pre>" + JSON.stringify(await kv.pttl('test')));
            echo.push("<pre>JSON.stringify(await kv.set('test', 'ttl', 10));</pre>" + JSON.stringify(await kv.set('test', 'ttl', 10)));
            echo.push("<pre>JSON.stringify(await kv.ttl('test'));</pre>" + JSON.stringify(await kv.ttl('test')));
            echo.push("<pre>JSON.stringify(await kv.pttl('test'));</pre>" + JSON.stringify(await kv.pttl('test')));
        }
        else if (ac == 'incr-decr-replace') {
            echo.push("<pre>JSON.stringify(await kv.del('test'));</pre>" + JSON.stringify(await kv.del('test')));

            echo.push("<pre>JSON.stringify(await kv.replace('test', 'QAQ'));</pre>" + JSON.stringify(await kv.replace('test', 'QAQ')));

            echo.push("<pre>JSON.stringify(await kv.incr('test'));</pre>" + JSON.stringify(await kv.incr('test')));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.set('test', 666));</pre>" + JSON.stringify(await kv.set('test', 666)));

            echo.push("<pre>JSON.stringify(await kv.incr('test'));</pre>" + JSON.stringify(await kv.incr('test')));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.decr('test', 10));</pre>" + JSON.stringify(await kv.decr('test', 10)));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.replace('test', 111));</pre>" + JSON.stringify(await kv.replace('test', 111)));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.replace('test', 'QAQ'));</pre>" + JSON.stringify(await kv.replace('test', 'QAQ')));

            echo.push("<pre>SON.stringify(await kv.incr('test', 10));</pre>" + JSON.stringify(await kv.incr('test', 10)));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));
        }
        else if (ac === 'append-prepend') {
            echo.push("<pre>SON.stringify(await kv.prepend('test', '0'));</pre>" + JSON.stringify(await kv.prepend('test', '0')));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.set('test', 'bbb'));</pre>" + JSON.stringify(await kv.set('test', 'bbb')));

            echo.push("<pre>JSON.stringify(await kv.append('test', 'end'));</pre>" + JSON.stringify(await kv.append('test', 'end')));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.prepend('test', 'pre'));</pre>" + JSON.stringify(await kv.prepend('test', 'pre')));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.add('test', 'aaa'));</pre>" + JSON.stringify(await kv.add('test', 'aaa')));

            echo.push("<pre>JSON.stringify(await kv.append('tmp_test', 'hehe'));</pre>" + JSON.stringify(await kv.append('tmp_test', 'hehe')));

            echo.push("<pre>JSON.stringify(await kv.get('tmp_test'));</pre>" + JSON.stringify(await kv.get('tmp_test')));

            echo.push("<pre>JSON.stringify(await kv.del('tmp_test'));</pre>" + JSON.stringify(await kv.del('tmp_test')));
        }
        else if (ac === 'hash') {
            echo.push("<pre>JSON.stringify(await kv.hSet('hTest', 'name', 'Cheng Xin'));</pre>" + JSON.stringify(await kv.hSet('hTest', 'name', 'Cheng Xin')));

            echo.push("<pre>JSON.stringify(await kv.hSet('hTest', 'age', '16', 'nx'));</pre>" + JSON.stringify(await kv.hSet('hTest', 'age', '16', 'nx')));

            echo.push(`<pre>JSON.stringify(await kv.hMSet('hTest', {
    'age': '16',
    'sex': 'female'
}));</pre>`);
            echo.push(JSON.stringify(await kv.hMSet('hTest', {
                'age': '16',
                'sex': 'female'
            })));

            echo.push("<pre>JSON.stringify(await kv.hSet('hTest', 'age', '16', 'nx'));</pre>" + JSON.stringify(await kv.hSet('hTest', 'age', '16', 'nx')));

            echo.push("<pre>JSON.stringify(await kv.hGet('hTest', 'name'));</pre>" + JSON.stringify(await kv.hGet('hTest', 'name')));

            echo.push("<pre>JSON.stringify(await kv.hDel('hTest', 'name'));</pre>" + JSON.stringify(await kv.hDel('hTest', 'name')));

            echo.push(`<pre>JSON.stringify(await kv.hMSet('hTest', {
    'ok1': 'bye',
    'ok2': [
        '1', '2', '5', '8', '0'
    ]
}));</pre>`);
            echo.push(JSON.stringify(await kv.hMSet('hTest', {
                'ok1': 'bye',
                'ok2': [
                    '1', '2', '5', '8', '0'
                ]
            })));

            echo.push("<pre>JSON.stringify(await kv.hSet('hTest', 'ok1', ['a', 'b']));</pre>" + JSON.stringify(await kv.hSet('hTest', 'ok1', ['a', 'b'])));

            echo.push("<pre>JSON.stringify(await kv.hGetAll('hTest'));</pre>" + JSON.stringify(await kv.hGetAll('hTest')));

            echo.push("<pre>JSON.stringify(await kv.hGetJson('hTest', 'ok1'));</pre>" + JSON.stringify(await kv.hGetJson('hTest', 'ok1')));

            echo.push("<pre>JSON.stringify(await kv.hKeys('hTest'));</pre>" + JSON.stringify(await kv.hKeys('hTest')));

            echo.push("<pre>JSON.stringify(await kv.hExists('hTest', 'age'));</pre>" + JSON.stringify(await kv.hExists('hTest', 'age')));

            echo.push("<pre>SON.stringify(await kv.hMGet('hTest', ['age', 'sex', 'school']));</pre>" + JSON.stringify(await kv.hMGet('hTest', ['age', 'sex', 'school'])));

            echo.push("<pre>JSON.stringify(await kv.del('hTest'));</pre>" + JSON.stringify(await kv.del('hTest')));

            echo.push("<pre>JSON.stringify(await kv.hGet('hTest', 'name'));</pre>" + JSON.stringify(await kv.hGet('hTest', 'name')));

            echo.push("<pre>JSON.stringify(await kv.hGetAll('hTest'));</pre>" + JSON.stringify(await kv.hGetAll('hTest')));
        }
        else if (ac === 'other') {
            echo.push(`<pre>for (let i = 0; i < 50; ++i) {
    await kv.add('t' + i.toString(), i, 10);
}
echo.push('Added.');</pre>`);
            for (let i = 0; i < 50; ++i) {
                await kv.add('t' + i.toString(), i, 10);
            }
            echo.push('Added.');

            echo.push("<pre>JSON.stringify(await kv.keys('t*'));</pre>" + JSON.stringify(await kv.keys('t*')));

            echo.push('<pre>JSON.stringify(await kv.scan());</pre>' + JSON.stringify(await kv.scan()));

            echo.push(`<pre>let cursor = 0;
while (true) {
    echo.push('WHILE (' + JSON.stringify(cursor) + ')&lt;br&gt;');
    const r = await kv.scan(cursor, '*2*', 5);
    if (r === false || r.nextCursor === 0) {
        echo.push('DONE&lt;br&gt;');
        break;
    }
    echo.push(JSON.stringify(r.items) + '&lt;br&gt;');
    cursor = r.nextCursor;
}
echo[echo.length - 1] = echo[echo.length - 1].slice(0, -4);</pre>`);
            let cursor = 0;
            while (true) {
                echo.push('WHILE (' + JSON.stringify(cursor) + ')<br>');
                const r = await kv.scan(cursor, '*2*', 5);
                if (r === false || r.nextCursor === 0) {
                    echo.push('DONE<br>');
                    break;
                }
                echo.push(JSON.stringify(r.items) + '<br>');
                cursor = r.nextCursor;
            }
            echo[echo.length - 1] = echo[echo.length - 1].slice(0, -4);
        }
        else {
            // --- default ---
            echo.push("<pre>JSON.stringify(await kv.exists(['test', 'heheda']));</pre>" + JSON.stringify(await kv.exists(['test', 'heheda'])));

            echo.push("<pre>JSON.stringify(await kv.mGet(['test', 'heheda']));</pre>" + JSON.stringify(await kv.mGet(['test', 'heheda'])));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));

            echo.push("<pre>JSON.stringify(await kv.set('test', $value ? $value : 'ok'));</pre>" + JSON.stringify(await kv.set('test', lText.isTruthy(value) ? value : 'ok')));

            echo.push("<pre>JSON.stringify(await kv.get('test'));</pre>" + JSON.stringify(await kv.get('test')));
        }

        return '<a href="' + this._config.const.urlBase + 'test/kv">Default</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/kv?value=aaa">Set "aaa"</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/kv?value=bbb">Set "bbb"</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/kv?ac=delete">Delete</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/kv?ac=ttl">ttl</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/kv?ac=incr-decr-replace">Incr/Decr/Replace</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/kv?ac=append-prepend">Append/Prepend</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/kv?ac=hash">Hash</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test/kv?ac=other">Other</a> | ' +
            '<a href="' + this._config.const.urlBase + 'test">Return</a>' + echo.join('') + '<br><br>' + this._getEnd();
    }

    public async net(): Promise<string> {
        const echo = [];

        const res = await lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/package.json');
        echo.push(`<pre>Net.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/package.json');</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
error: ${JSON.stringify(res.error)}`);

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async netPipe(): Promise<kebab.Json> {
        const echo = [];

        const res = await lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/package.json');
        echo.push(
            `<pre>Net.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/package.json');</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>`,
            res,
            `</pre>
error: ${JSON.stringify(res.error)}
<br><br>` + this._getEnd()
        );

        return echo;
    }

    public async netPost(): Promise<kebab.Json> {
        const echo = [];

        const res = await lNet.post(this._internalUrl + 'test/netPost1', { 'a': '1', 'b': '2', 'c': ['1', '2', '3'] });
        echo.push(`<pre>lNet.post('${this._internalUrl}test/netPost1', { 'a': '1', 'b': '2', 'c': ['1', '2', '3'] });</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
error: ${JSON.stringify(res.error)}`);

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public netPost1(): string {
        return `_post:\n\n${JSON.stringify(this._post)}\n\nRequest headers:\n\n${JSON.stringify(this._headers, null, 4)}\n\nIP: ${this._req.socket.remoteAddress ?? ''}`;
    }

    public async netPostString(): Promise<string> {
        const echo = [];

        const res = await lNet.post(this._internalUrl + 'test/netPostString1', 'HeiHei');
        echo.push(`<pre>lNet.post('${this._internalUrl}test/netPostString1', 'HeiHei');</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
error: ${JSON.stringify(res.error)}`);

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public netPostString1(): kebab.Json[] {
        return [1, this._input];
    }

    public async netOpen(): Promise<kebab.Json> {
        const echo = [];

        const res = await lNet.open(this._internalUrl + 'test/netPost1').post().data({ 'a': '2', 'b': '0', 'c': ['0', '1', '3'] }).request();
        echo.push(`<pre>lNet.open('${this._internalUrl}test/netPost1').post().data({ 'a': '2', 'b': '0', 'c': ['0', '1', '3'] }).request();</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
error: ${JSON.stringify(res.error)}`);

        return echo.join('') + this._getEnd();
    }

    public async netFormTest(): Promise<string> {
        if (!await this._handleFormData()) {
            return '';
        }
        const echo = [
            '<pre>',
            JSON.stringify(this._post, null, 4),
            '\n-----\n',
            JSON.stringify(this._files, null, 4),
            '</pre>'
        ];
        echo.push(`<form enctype="multipart/form-data" method="post">
    text a: <input type="text" name="a" value="a1"> <input type="text" name="a" value="a2"><br>
    file b: <input type="file" name="b"><br>
    file c: <input type="file" name="c"><input type="file" name="c"><br>
    fi d[]: <input type="file" name="d[]"><input type="file" name="d[]"><br>
    <input type="submit" value="Upload">
</form>
<hr>
<form method="post">
    name a: <input type="text" name="a" value="a&1"> <input type="text" name="a" value="a&2"><br>
    na b[]: <input type="text" name="b[]" value="b1"> <input type="text" name="b[]" value="b2"><br>
    name d: <input type="text" name="d" value="d"><br>
    <input type="submit" value="Default post">
</form>`);

        return echo.join('') + this._getEnd();
    }

    public async netUpload(): Promise<string> {
        const echo = [];

        const fd = lNet.getFormData();
        fd.putString('a', '1');
        await fd.putFile('file', kebab.LIB_PATH + 'net/cacert.pem');
        await fd.putFile('multiple', kebab.LIB_PATH + 'net/cacert.pem');
        await fd.putFile('multiple', kebab.LIB_PATH + 'net/cacert.pem');
        const res = await lNet.post(this._internalUrl + 'test/net-upload1', fd);
        echo.push(`<pre>const fd = lNet.getFormData();
fd.putString('a', '1');
await fd.putFile('file', def.LIB_PATH + 'net/cacert.pem');
await fd.putFile('multiple', def.LIB_PATH + 'net/cacert.pem');
await fd.putFile('multiple', def.LIB_PATH + 'net/cacert.pem');
lNet.post('${this._internalUrl}test/net-upload1', fd);</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
error: ${JSON.stringify(res.error)}`);

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async netUpload1(): Promise<string> {
        if (!await this._handleFormData()) {
            return '{}';
        }
        return JSON.stringify(this._post, null, 4) + '\n\n' + JSON.stringify(this._files, null, 4);
    }

    public async netCookie(): Promise<string> {
        const echo = [];

        const cookie = {};
        let res = await lNet.get(this._internalUrl + 'test/net-cookie1', {
            'cookie': cookie
        });
        echo.push(`<pre>const cookie = {};
lNet.get(this._internalUrl + 'test/net-cookie1', {
    'cookie': cookie
});</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
cookie: <pre>${JSON.stringify(cookie, null, 4)}</pre><hr>`);

        res = await lNet.get(this._internalUrl + 'test/net-cookie2', {
            'cookie': cookie
        });
        echo.push(`<pre>lNet.get(this._internalUrl + 'test/net-cookie2', {
    'cookie': cookie
});</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>`);

        lNet.setCookie(cookie, 'custom1', 'abc1', this._config.const.host);
        lNet.setCookie(cookie, 'custom2', 'abc2', '172.17.0.1');
        res = await lNet.get(this._internalUrl + 'test/net-cookie2', {
            'cookie': cookie
        });
        echo.push(`<pre>lNet.setCookie(cookie, 'custom1', 'abc1', ${this._config.const.host});
lNet.setCookie(cookie, 'custom2', 'abc2', '172.17.0.1');
lNet.get(this._internalUrl + 'test/net-cookie2', {
    'cookie': cookie
});</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>`);

        return echo.join('') + this._getEnd();
    }

    public netCookie1(): string {
        lCore.setCookie(this, 'test0', 'session');
        lCore.setCookie(this, 'test1', 'normal', {
            'ttl': 10
        });
        lCore.setCookie(this, 'test2', 'baidu.com', {
            'ttl': 20,
            'path': '/',
            'domain': 'baidu.com'
        });
        lCore.setCookie(this, 'test3', this._config.const.hostname, {
            'ttl': 30,
            'path': '/',
            'domain': this._config.const.hostname
        });
        lCore.setCookie(this, 'test4', '/ok/', {
            'ttl': 40,
            'path': '/ok/'
        });
        lCore.setCookie(this, 'test5', 'secure', {
            'ttl': 50,
            'ssl': true
        });
        lCore.setCookie(this, 'test6', '0.1', {
            'ttl': 40,
            'path': '/',
            'domain': '0.1'
        });
        lCore.setCookie(this, 'test7', 'localhost', {
            'ttl': 30,
            'path': '/',
            'domain': 'localhost'
        });
        lCore.setCookie(this, 'test8', 'com', {
            'ttl': 20,
            'path': '/',
            'domain': 'com'
        });
        lCore.setCookie(this, 'test9', 'com.cn', {
            'ttl': 10,
            'path': '/',
            'domain': 'com.cn'
        });
        lCore.setCookie(this, 'test10', 'httponly', {
            'ttl': 60,
            'httponly': true
        });
        return `lCore.setCookie(this, 'test0', 'session');
lCore.setCookie(this, 'test1', 'normal', {
    'ttl': 10
});
lCore.setCookie(this, 'test2', 'baidu.com', {
    'ttl': 20,
    'path': '/',
    'domain': 'baidu.com'
});
lCore.setCookie(this, 'test3', this._config.const.hostname, {
    'ttl': 30,
    'path': '/',
    'domain': this._config.const.hostname
});
lCore.setCookie(this, 'test4', '/ok/', {
    'ttl': 40,
    'path': '/ok/'
});
lCore.setCookie(this, 'test5', 'secure', {
    'ttl': 50,
    'ssl': true
});
lCore.setCookie(this, 'test6', '0.1', {
    'ttl': 40,
    'path': '/',
    'domain': '0.1'
});
lCore.setCookie(this, 'test7', 'localhost', {
    'ttl': 30,
    'path': '/',
    'domain': 'localhost'
});
lCore.setCookie(this, 'test8', 'com', {
    'ttl': 20,
    'path': '/',
    'domain': 'com'
});
lCore.setCookie(this, 'test9', 'com.cn', {
    'ttl': 10,
    'path': '/',
    'domain': 'com.cn'
});
lCore.setCookie(this, 'test10', 'httponly', {
    'ttl': 60,
    'httponly': true
});`;
    }

    public netCookie2(): string {
        return 'this._cookie: \n\n' + JSON.stringify(this._cookie, null, 4);
    }

    public async netSave(): Promise<string> {
        const echo = [];

        const res = await lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/package.json', {
            'follow': 5,
            'save': kebab.LOG_CWD + 'test-must-remove.json'
        });
        echo.push(`<pre>lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/package.json', {
    'follow': 5,
    'save': def.LOG_PATH + 'test-must-remove.json'
});</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
error: ${JSON.stringify(res.error)}</pre>`);

        return echo.join('') + this._getEnd();
    }

    public async netFollow(): Promise<string> {
        const echo = [];

        const res = await lNet.post(this._internalUrl + 'test/net-follow1', {
            'a': '1',
            'b': '2'
        }, {
            'follow': 5
        });
        echo.push(`<pre>lNet.post(this._internalUrl + 'test/net-follow1', {
    'a': '1',
    'b': '2'
}, {
    'follow': 5
});</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
error: ${JSON.stringify(res.error)}</pre>`);

        return echo.join('') + this._getEnd();
    }

    public netFollow1(): void {
        this._location('test/net-follow2');
    }

    public netFollow2(): kebab.Json {
        return [1, { 'post': (this._post['a'] as string) + ',' + (this._post['b'] as string) }];
    }

    public async netReuse(): Promise<string> {
        const echo = [];

        echo.push('<strong>Reuse:</strong>');

        let time0 = Date.now();
        await lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/package.json');
        let time1 = Date.now();
        echo.push("<pre>lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/package.json');</pre>" + Math.round(time1 - time0).toString() + 'ms.');

        time0 = Date.now();
        await lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/README.md');
        time1 = Date.now();
        echo.push("<pre>lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/README.md');</pre>" + Math.round(time1 - time0).toString() + 'ms.');

        time0 = Date.now();
        await lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/LICENSE');
        time1 = Date.now();
        echo.push("<pre>lNet.get('https://cdn.jsdelivr.net/npm/deskrt@2.0.10/LICENSE');</pre>" + Math.round(time1 - time0).toString() + 'ms.<hr>');

        return echo.join('') + this._getEnd();
    }

    public async netError(): Promise<string> {
        const echo = [];

        const res = await lNet.get('https://192.111.000.222/xxx.zzz');
        echo.push(`<pre>lNet.get('https://192.111.000.222/xxx.zzz');</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
error: <pre>${JSON.stringify(res.error, null, 4)}</pre>`);

        return echo.join('') + this._getEnd();
    }

    public async netHosts(): Promise<string> {
        const echo = [];

        const res = await lNet.get('http://nodejs.org:' + this._config.const.hostport.toString() + this._config.const.urlBase + 'test', {
            'hosts': {
                'nodejs.org': '127.0.0.1'
            }
        });
        echo.push(`<pre>lNet.get('http://nodejs.org:${this._config.const.hostport.toString() + this._config.const.urlBase}test', {
    'hosts': {
        'nodejs.org': '127.0.0.1'
    }
});</pre>
headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
content: <pre>${lText.htmlescape((await res.getContent())?.toString() ?? '')}</pre>
error: <pre>${JSON.stringify(res.error, null, 4)}</pre>`);

        return echo.join('') + this._getEnd();
    }

    public async netMproxy(): Promise<string | boolean> {
        const echo = [];
        const res = await lNet.postJson(this._internalUrl + 'test/net-mproxy2', {
            'abc': 'ok',
        }, {
            'mproxy': {
                'url': this._internalUrl + 'test/net-mproxy1',
                'auth': '123456',
                'data': { 'test': '123' },
            }
        });
        echo.push(`<pre>lNet.get('${this._internalUrl}test/net-mproxy2', {
    'mproxy': {
        'url': '${this._internalUrl}test/net-mproxy1',
        'auth': '123456',
        'data': { 'test': '123' },
    }
});</pre>
        headers: <pre>${JSON.stringify(res.headers, null, 4)}</pre>
        content: <pre>${(await res.getContent())?.toString() ?? 'null'}</pre>
        error: ${JSON.stringify(res.error)}`);

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async netMproxy1(): Promise<string | boolean> {
        const data = lNet.mproxyData(this);
        lCore.debug('Got data', data);
        const rtn = await lNet.mproxy(this, '123456');
        if (rtn > 0) {
            return false;
        }
        return 'Nothing(' + rtn + ')';
    }

    public netMproxy2(): any[] {
        return [1, {
            'data': this._post,
        }];
    }

    public netFilterheaders(): string {
        const echo = [];
        const headers = {
            'host': 'www.maiyun.net',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/180.0.0.0 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'cache-control': 'no-cache',
            'cdn-loop': 'TencentEdgeOne; loops=2',
            'eo-connecting-ip': 'xx:xx:xx:xx:xx',
            'eo-log-uuid': '102780998859203995',
            'pragma': 'no-cache',
            'priority': 'u=0, i',
            'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="180"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'x-forwarded-for': '127.1.2.3',
            'x-forwarded-host': 'www.maiyun.net',
            'x-forwarded-proto': 'http',
            'authorization': ''
        };
        echo.push(`origin:<pre>${JSON.stringify(headers, null, 4)}</pre>`);
        const filtered = lNet.filterHeaders(headers, undefined, h => {
            return !['x-', 'eo-'].some(i => h.startsWith(i));
        });
        echo.push(`const filtered = lNet.filterHeaders(headers);<pre>${JSON.stringify(filtered, null, 4)}</pre>`);
        return echo.join('') + this._getEnd();
    }

    public async netFetch(): Promise<string | boolean> {
        const echo = [];
        try {
            const res = await lNet.fetch(this._internalUrl + 'test/net-fetch1', {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json',
                },
                'body': JSON.stringify({ 'test': '123' }),
            });
            echo.push(`<pre>lNet.fetch('${this._internalUrl}test/net-fetch1', {
    'method': 'POST',
    'headers': {
        'content-type': 'application/json',
    },
    'body': JSON.stringify({ 'test': '123' }),
});</pre>
            headers: <pre>${JSON.stringify(Object.fromEntries(res.headers.entries()), null, 4)}</pre>
            content: <pre>${await res.text()}</pre>`);
        }
        catch (e) {
            echo.push(`error: <pre>${JSON.stringify(e)}</pre>`);
        }

        echo.push(`mproxy:`);

        try {
            const res = await lNet.fetch(this._internalUrl + 'test/net-fetch1', {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json',
                },
                'body': JSON.stringify({ 'test': '456' }),
                'mproxy': {
                    'url': this._internalUrl + 'test/net-mproxy1',
                    'auth': '123456',
                    'data': { 'test': '789' },
                },
            });
            echo.push(`<pre>lNet.fetch('${this._internalUrl}test/net-fetch1', {
    'method': 'POST',
    'headers': {
        'content-type': 'application/json',
    },
    'body': JSON.stringify({ 'test': '123' }),
    'mproxy': {
        'url': this._internalUrl + 'test/net-mproxy1',
        'auth': '123456',
        'data': { 'test': '789' },
    },
});</pre>
            headers: <pre>${JSON.stringify(Object.fromEntries(res.headers.entries()), null, 4)}</pre>
            content: <pre>${await res.text()}</pre>`);
        }
        catch (e) {
            echo.push(`error: <pre>${JSON.stringify(e)}</pre>`);
        }

        return echo.join('') + '<br>' + this._getEnd();
    }

    public netFetch1(): any[] {
        return [1, {
            'post': this._post,
        }];
    }

    public async scan(): Promise<kebab.Json> {
        const link = await this._scanLink();
        if (!link) {
            return [0, 'Failed, link can not be connected.'];
        }
        const s = this._get['s'] ?? 'db';

        const echo = [];
        const scan = await lScan.get(link, undefined, { 'ttl': 30, 'sqlPre': this });
        const token = scan.getToken();
        echo.push(`<pre>const scan = await lScan.get(this, link, undefined, { 'ttl': 30, 'sqlPre': this });
const token = scan.getToken();</pre>
token: ${token ?? 'null'}<br><br>
Scan status: <b id="status" style="color: red;">Waiting...</b><br>
Poll count: <span id="count">0</span>, expiration date: <span id="exp"></span><br><br>
Simulated scan URL: http://www.test.simu/scan?token=${token ?? 'null'} (QR Code can be generated)<br><br>
<input type="button" value="Visit the simulated URL" onclick="this.disabled=true;document.getElementById('url').innerText='http://www.test.simu/scan?token=${token ?? 'null'}';visit();"><br><br>
<div style="border: solid 1px rgba(0,0,0,.3); box-shadow: 0 5px 20px rgba(0, 0, 0, .25); width: 90%; margin: auto;">
    <div id="url" style="background: rgba(0,0,0,.07); border-bottom: solid 1px rgba(0,0,0,.3); padding: 10px;">about:blank</div>
    <div id="content" style="height: 200px; font-size: 16px; display: flex; justify-content: center; align-items: center; flex-direction: column;"></div>
</div>
<script>
var token = '${token ?? 'null'}';
var count = 0;
function poll() {
    fetch('${this._config.const.urlBase}test/scan1?s=${s}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'token=${token ?? 'null'}'
    }).then(function(r) {
        return r.json();
    }).then(function(j) {
        ++count;
        document.getElementById('status').innerText = j.msg;
        document.getElementById('count').innerText = count;
        if (j.result > 0) {
            document.getElementById('exp').innerText = j.exp;
            setTimeout(poll, 1000);
        }
    }).catch(function(e) {
        ++count;
        document.getElementById('status').innerText = 'Network error.';
        document.getElementById('count').innerText = count;
        setTimeout(poll, 1000);
    });
}
poll();

function visit() {
    document.getElementById('content').innerText = 'Loading...';
    fetch('${this._config.const.urlBase}test/scan2?s=${s}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'token=${token ?? 'null'}'
    }).then(function(r) {
        return r.json();
    }).then(function(j) {
        if (j.result > 0) {
            document.getElementById('content').innerHTML = 'Are you sure logged in the computer?<br><br><button id="confirm" style="padding: 10px 20px;" onclick="this.disabled=true;confirm()">Confirm</button>';
        }
        else {
            document.getElementById('content').innerText = j.msg;
        }
    });
}

function confirm() {
    fetch('${this._config.const.urlBase}test/scan3?s=${s}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'token=${token ?? 'null'}'
    }).then(function(r) {
        return r.json();
    }).then(function(j) {
        if (j.result > 0) {
            document.getElementById('content').innerText = 'Finish the operation!';
        }
        else {
            document.getElementById('content').innerText = j.msg;
        }
    });
}
</script>`);

        return '<a href="' + this._config.const.urlBase + 'test/scan?s=db">db</a> | ' +
        '<a href="' + this._config.const.urlBase + 'test/scan?s=kv">kv</a> | ' +
        '<a href="' + this._config.const.urlBase + 'test">Return</a>' + echo.join('') + '<br>' + this._getEnd();
    }

    public async scan1(): Promise<kebab.Json> {
        const link = await this._scanLink();
        if (!link) {
            return [0, 'Failed, link can not be connected.'];
        }

        const scan = await lScan.get(link, this._post['token'], {
            'sqlPre': this
        });
        const rtn = await scan.poll();
        switch (rtn) {
            case -3: {
                return [0, 'System error.'];
            }
            case -2: {
                return [0, 'Token has expired.'];
            }
            case -1: {
                return [1, 'Waiting...', { 'exp': scan.getTimeLeft() }];
            }
            case 0: {
                return [1, 'Scanned, waiting for confirmation...', { 'exp': scan.getTimeLeft() }];
            }
        }
        return [0, 'Scan result: ' + JSON.stringify(rtn)];
    }

    public async scan2(): Promise<kebab.Json> {
        const link = await this._scanLink();
        if (!link) {
            return [0, 'Failed, link can not be connected.'];
        }
        if (!await lScan.scanned(link, this._post['token'], {
            'sqlPre': this
        })) {
            return [0, 'Token has expired.'];
        }
        return [1];
    }

    public async scan3(): Promise<kebab.Json> {
        const link = await this._scanLink();
        if (!link) {
            return [0, 'Failed, link can not be connected.'];
        }
        if (!await lScan.setData(link, this._post['token'], {
            'uid': '5'
        }, {
            'sqlPre': this
        })) {
            return [0, 'Token has expired.'];
        }
        return [1];
    }

    private async _scanLink(): Promise<kebab.Json> {
        const s = this._get['s'] ?? 'db';
        let link: lDb.Pool | lKv.Pool;
        if (s === 'db') {
            const db = lDb.get(this);
            link = db;
        }
        else {
            const kv = lKv.get(this);
            if (!await kv.ping()) {
                return false;
            }
            link = kv;
        }
        return link;
    }

    public async session(): Promise<string | kebab.Json[]> {
        const retur: kebab.Json[] = [];
        if (!(this._checkInput(this._get, {
            's': ['require', ['db', 'kv'], [0, 'Object not found.']],
            'auth': [['', '1'], [0, 'Bad request.']],
            'value': []
        }, retur))) {
            return retur;
        }

        const echo = ['<pre>'];

        let link: lDb.Pool | lKv.Pool;
        if (this._get['s'] === 'db') {
            link = lDb.get(this);
            echo.push('link = lDb.get(this);\n');
        }
        else {
            link = lKv.get(this);
            if (!await link.ping()) {
                return [0, 'Failed, Redis can not be connected.'];
            }
            echo.push('link = lKv.get(this);\n');
        }

        if (this._get['auth'] === '') {
            await this._startSession(link, false, { 'ttl': 60 });
            echo.push(`await this._startSession(link, false, {'ttl': 60});
JSON.stringify(this._session);</pre>` + lText.htmlescape(JSON.stringify(this._session)));

            this._session['value'] = lText.logicalOr(this._get['value'], 'ok');
            echo.push(`<pre>this._session['value'] = '${lText.logicalOr(this._get['value'], 'ok')}';
JSON.stringify(this._session);</pre>` + lText.htmlescape(JSON.stringify(this._session)));

            return '<a href="' + this._config.const.urlBase + 'test/session?s=' + this._get['s'] + '">Default</a> | ' +
                '<a href="' + this._config.const.urlBase + 'test/session?s=' + this._get['s'] + '&value=aaa">Set "aaa"</a> | ' +
                '<a href="' + this._config.const.urlBase + 'test/session?s=' + this._get['s'] + '&value=bbb">Set "bbb"</a> | ' +
                '<a href="' + this._config.const.urlBase + 'test">Return</a>' + echo.join('') + '<br><br>' + this._getEnd();
        }
        else {
            // --- AUTH 模式 ---
            await this._startSession(link, true, { 'ttl': 60 });
            if (Object.keys(this._post).length > 0) {
                if (this._session['count'] === undefined) {
                    this._session['count'] = 1;
                }
                else {
                    ++this._session['count'];
                }
                return [1, { 'txt': 'this._session: ' + JSON.stringify(this._session) + '\nToken: ' + this._sess!.getToken(), 'token': this._sess?.getToken(), '_auth': this._getBasicAuth('token', this._sess!.getToken()) }];
            }
            else {
                echo.push(`await this._startSession(link, true, {'ttl': 60});
JSON.stringify(this._session));</pre>` + lText.htmlescape(JSON.stringify(this._session)));

                this._session['value'] = lTime.format(this, 'H:i:s');
                echo.push(`<pre>this._session['value'] = '${lTime.format(this, 'H:i:s')}';
JSON.stringify(this._session);</pre>` + lText.htmlescape(JSON.stringify(this._session)));

                echo.push(`<br><br><input type="button" value="Post with header" onclick="document.getElementById('result').innerText='Waiting...';fetch('${this._config.const.urlBase}test/session?s=${this._get['s']}&auth=1',{method:'POST',credentials:'omit',headers:{'Authorization':document.getElementById('_auth').innerText,'content-type':'application/x-www-form-urlencoded'},body:'key=val'}).then(function(r){return r.json();}).then(function(j){document.getElementById('result').innerText=j.txt;document.getElementById('token').innerText=j.token;document.getElementById('_auth').innerText=j._auth;});"><input type='button' value="Post without header" style="margin-left: 10px;" onclick="document.getElementById('result').innerText='Waiting...';fetch('${this._config.const.urlBase}test/session?s=${this._get['s']}&auth=1',{method:'POST',credentials:'omit',headers:{'content-type':'application/x-www-form-urlencoded'},body:'key=val'}).then(function(r){return r.json();}).then(function(j){document.getElementById('result').innerText=j.txt;});"><br><br>
Token: <span id="token">${this._sess!.getToken()}</span><br>
Post Authorization header: <span id="_auth">${this._getBasicAuth('token', this._sess!.getToken())}</span><br><br>
Result:<pre id="result">Nothing.</pre>`);

                return '<a href="' + this._config.const.urlBase + 'test">Return</a>' + echo.join('') + this._getEnd();
            }
        }
    }

    public async jwt(): Promise<string | kebab.Json[]> {
        const retur: kebab.Json[] = [];
        if (!(this._checkInput(this._get, {
            'type': [['', 'kv', 'auth'], [0, 'Bad request.']]
        }, retur))) {
            return retur;
        }

        const echo: string[] = ['<pre>'];
        let link: lKv.Pool | undefined = undefined;
        if (this._get['type'] === 'kv') {
            link = lKv.get(this);
            echo.push('link = lKv.get(this);\n');
        }

        const origin = lJwt.getOrigin(this);
        echo.push(`const origin = lJwt.getOrigin(this);
JSON.stringify(origin);</pre>`);
        echo.push(JSON.stringify(origin));

        // --- 创建 jwt 对象 ---
        const jwt = await lJwt.get(this, {}, link);
        echo.push(`<pre>const jwt = lJwt.get(this, {}, ${link ? 'link' : 'undefined'});
JSON.stringify(this._jwt);</pre>`);
        echo.push(JSON.stringify(this._jwt));

        this._jwt['test'] = 'a';
        const value = jwt.renew();
        echo.push(`<pre>this._jwt['test'] = 'a';
const value = jwt.renew();
JSON.stringify(this._jwt);</pre>`);
        echo.push(JSON.stringify(this._jwt));

        echo.push(`<pre>JSON.stringify(value);</pre>`);
        echo.push(JSON.stringify(value));

        const token = this._jwt['token'];
        const rtn = await jwt.destory();
        echo.push(`<pre>const token = this._jwt['token'];
const rtn = await jwt.destory();
JSON.stringify(rtn);</pre>`);
        echo.push(JSON.stringify(rtn));

        echo.push('<pre>JSON.stringify(this._jwt);</pre>');
        echo.push(JSON.stringify(this._jwt));

        const rtn2 = await lJwt.decode(this, origin, link);
        echo.push(`<pre>const rtn2 = await lJwt.decode(this, origin, ${link ? 'link' : 'undefined'});
JSON.stringify(rtn2);</pre>`);
        echo.push(JSON.stringify(rtn2));

        if (this._get['type'] === 'auth') {
            echo.push(`<br><br><input type="button" value="Post with header" onclick="document.getElementById('result').innerText='Waiting...';fetch('${this._config.const.urlBase}test/jwt1',{method:'POST',credentials:'omit',headers:{'Authorization':document.getElementById('_auth').innerText,'content-type':'application/x-www-form-urlencoded'},body:'key=val'}).then(function(r){return r.json();}).then(function(j){document.getElementById('result').innerText=j.txt;});"><input type='button' value="Post without header" style="margin-left: 10px;" onclick="document.getElementById('result').innerText='Waiting...';fetch('${this._config.const.urlBase}test/jwt1',{method:'POST',credentials:'omit',headers:{'content-type':'application/x-www-form-urlencoded'},body:'key=val'}).then(function(r){return r.json();}).then(function(j){document.getElementById('result').innerText=j.txt;});"><br><br>
Token: <span id="token">${token}</span><br>
Post Authorization header: <span id="_auth">Bearer ${origin}</span><br><br>
Result:<pre id="result">Nothing.</pre>`);
        }
        else {
            echo.push('<br><br>');
        }

        return echo.join('') + this._getEnd();
    }

    public async jwt1(): Promise<[number, kebab.Json]>  {
        await lJwt.get(this, {
            'auth': true
        });
        return [1, { 'txt': JSON.stringify(this._jwt) }];
    }

    public sql(): string {
        const echo: string[] = [];
        let sql = lSql.get('test_');
        switch (this._get['type']) {
            case 'insert': {
                let s = sql.insert('user').values(['name', 'age'], [
                    ['Ah', '16'],
                    ['Bob', '24']
                ]).getSql();
                let sd = sql.getData();
                echo.push(`<pre>sql.insert('user').values(['name', 'age'], [
    ['Ah', '16'],
    ['Bob', '24']
]);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.insert('user').values(['name', 'age'], ['Ah', '16']).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.insert('user').values(['name', 'age'], ['Ah', '16']);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.insert('user').values({ 'name': 'Bob', 'age': '24' }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.insert('user').values({ 'name': 'Bob', 'age': '24' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.replace('user').values({ 'token': '20200202', 'name': 'Bob' }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.replace('user').values({ 'token': '20200202', 'name': 'Bob' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.insert('order').notExists('order', { 'name': 'Amy', 'age': '16', 'time_add': lTime.stamp(), 'point': ['POINT(?)', ['20']] }, { 'name': 'Amy' }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.insert('order').notExists('order', { 'name': 'Amy', 'age': '16', 'time_add': lTime.stamp(), 'point': ['POINT(?)', ['20']] }, { 'name': 'Amy' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.insert('verify').values({ 'token': 'abc', 'time_update': '10' }).duplicate({ 'time_update': ['CONCAT(`time_update`, ?)', ['01']] }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.insert('verify').values({ 'token': 'abc', 'time_update': '10' }).duplicate({ 'time_update': ['CONCAT(\`time_update\`, ?)', ['01']] });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                // --- insert 中使用函数 ---

                s = sql.insert('geo').values({ 'point': ['ST_POINTFROMTEXT(?)', ['POINT(122.147775 30.625014)']] }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.insert('geo').values({ 'point': ['ST_POINTFROMTEXT(?)', ['POINT(122.147775 30.625014)']] });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.insert('geo').values(['name', 'point', 'point2', 'polygon', 'json'], [
                    [
                        'POINT A', ['ST_POINTFROMTEXT(?)', ['POINT(122.147775 30.625015)']], { 'x': 1, 'y': 1 }, [
                            [
                                { 'x': 1, 'y': 1 },
                                { 'x': 2, 'y': 2 },
                                { 'x': 3, 'y': 3 },
                                { 'x': 1, 'y': 1 }
                            ],
                            [
                                { 'x': 6, 'y': 1 },
                                { 'x': 7, 'y': 2 },
                                { 'x': 8, 'y': 3 },
                                { 'x': 6, 'y': 1 }
                            ]
                        ],
                        { 'x': { 'y': 'ghi' } }
                    ],
                    [
                        'POINT B', ['ST_POINTFROMTEXT(?)', ['POINT(123.147775 30.625016)']], { 'x': 1, 'y': 1 }, null, null
                    ]
                ]).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.insert('geo').values(['name', 'point', 'point2', 'polygon', 'json'], [
    [
        'POINT A', ['ST_POINTFROMTEXT(?)', ['POINT(122.147775 30.625015)']], { 'x': 1, 'y': 1 }, [
            [
                { 'x': 1, 'y': 1 },
                { 'x': 2, 'y': 2 },
                { 'x': 3, 'y': 3 },
                { 'x': 1, 'y': 1 }
            ],
            [
                { 'x': 6, 'y': 1 },
                { 'x': 7, 'y': 2 },
                { 'x': 8, 'y': 3 },
                { 'x': 6, 'y': 1 }
            ]
        ],
        { 'x': { 'y': 'ghi' } }
    ],
    [
        'POINT B', ['ST_POINTFROMTEXT(?)', ['POINT(123.147775 30.625016)']], { 'x': 1, 'y': 1 }, null, null
    ]
]);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}`);
                break;
            }
            case 'select': {
                let s = sql.select('*', 'user').getSql();
                let sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'user');</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select(['id', 'name'], 'user').getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select(['id', 'name'], 'user');</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select('*', ['user', 'order']).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select('*', ['user', 'order']);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select('*', ['db1.user', 'db2.user']).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select('*', ['db1.user', 'db2.user']);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select(['order.no', 'user.nick'], ['order']).leftJoin('user', { 'order.user_id': lSql.column('user.id'), 'state': '1' }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select(['order.no', 'user.nick'], ['order']).leftJoin('user', { 'order.user_id': lSql.column('user.id'), 'state': '1' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select(['o.*', 'u.nick as unick'], ['order o']).leftJoin('`user` AS u', { 'o.user_id': lSql.column('u.id'), 'state': '1' }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select(['o.*', 'u.nick as unick'], ['order o']).leftJoin('\`user\` AS u', { 'o.user_id': lSql.column('u.id'), 'state': '1' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select(['SUM(user.age) age', 'UTC_TIMESTAMP', 'FROM_UNIXTIME(user.time, \'%Y-%m\') as time'], 'order').leftJoin('user', { 'order.user_id': lSql.column('user.id') }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select(['SUM(user.age) age', 'UTC_TIMESTAMP', 'FROM_UNIXTIME(user.time, \\'%Y-%m\\') as time'], 'order').leftJoin('user', { 'order.user_id': lSql.column('user.id') });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select('*', 'order').leftJoin('user', { 'order.user_id': lSql.column('user.id') }, '_0').leftJoin('group a', { 'order.group_id': lSql.column('a.id') }, '_0').getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'order').leftJoin('user', { 'order.user_id': lSql.column('user.id') }, '_0').leftJoin('group a', { 'order.group_id': lSql.column('a.id') }, '_0');</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select('*', 'order').where({ 'a': 1, 'b': 2 }).unionAll(sql.copy('abc')).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'order').where({ 'a': 1, 'b': 2 }).unionAll(sql.copy('abc'));</pre>
                <b>getSql() :</b> ${s}<br>
                <b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
                <b>format() :</b> ${sql.format(s, sd)}<hr>`);

                sql = sql.copy('abcd', { 'where': { 'c': 2 } });
                s = sql.getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.copy('abcd', { 'where': { 'c': 2 } });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}`);
                break;
            }
            case 'update': {
                // --- 1, 2 ---

                let s = sql.update('user', [['age', '+', '1'], ['month', '=', '5'], { 'name': 'Serene', 'nick': lSql.column('name') }, ['year', '+', lSql.column('age')]]).where({ 'name': 'Ah' }).getSql();
                let sd = sql.getData();
                echo.push(`<pre>sql.update('user', [['age', '+', '1'], ['month', '=', '5'], { 'name': 'Serene', 'nick': lSql.column('name') }, ['year', '+', lSql.column('age')]]).where({ 'name': 'Ah' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                // --- 3 ---

                s = sql.update('user', { 'name': 'Serene', 'type': ['(CASE `id` WHEN 1 THEN ? WHEN 2 THEN ? END)', ['val1', 'val2']] }).where({ 'name': 'Ah' }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.update('user', { 'name': 'Serene', 'type': ['(CASE \`id\` WHEN 1 THEN ? WHEN 2 THEN ? END)', ['val1', 'val2']] }).where({ 'name': 'Ah' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                // --- # ---

                s = sql.update('user', { 'age': lSql.column('age_verify'), 'date': '#12', 'he': ['he2'] }).where({ 'date_birth': '2001' }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.update('user', { 'age': lSql.column('age_verify'), 'date': '#12', 'he': ['he2'] }).where({ 'date_birth': '2001' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                // --- update order limit ---

                s = sql.update('user', { 'he': 'he2' }).where([ ['birth', '>', '2001'] ]).by('birth').limit(0, 10).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.update('user', { 'he': 'he2' }).where([ ['birth', '>', '2001'] ]).by('birth').limit(0, 10);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}`);

                // --- json ---

                s = sql.update('json', { 'json1': { 'key': 'val', 'key2': 'val2' }, 'json2': [ { 'k1': 'v1' }, { 'k2': 'v2' } ], 'json3': { 'x': 1, 'y': 2 }, 'json4': [], 'json5': {} }).where({ 'id': 1 }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.update('json', { 'json1': { 'key': 'val', 'key2': 'val2' }, 'json2': [ { 'k1': 'v1' }, { 'k2': 'v2' } ], 'json3': { 'x': 1, 'y': 2 }, 'json4': [], 'json5': {} }).where({ 'id': 1 });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}`);

                break;
            }
            case 'delete': {
                const s = sql.delete('user').where({ 'id': '1' }).getSql();
                const sd = sql.getData();
                echo.push(`<pre>sql.delete('user').where({ 'id': '1' });</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}`);
                break;
            }
            case 'where': {
                let s = sql.select('*', 'user').where([{ 'city': 'la' }, ['age', '>', '10'], ['level', 'in', ['1', '2', '3']], ['age + age2 + age3 + 10', '>', 20]]).getSql();
                let sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'user').where([{ 'city': 'la' }, ['age', '>', '10'], ['level', 'in', ['1', '2', '3']], ['age + age2 + age3 + 10', '>', 20]]);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.update('order', { 'state': '1' }).where({
                    '$or': [{
                        'type': '1'
                    }, {
                        'type': '2'
                    }],
                    '$or-2': [{
                        'type2': '3'
                    }, {
                        'type2': '4'
                    }],
                    '$or-other': [{
                        'type3': '5'
                    }, {
                        'type3': '6'
                    }]
                }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.update('order', { 'state': '1' }).where({
    '$or': [{
        'type': '1'
    }, {
        'type': '2'
    }],
    '$or-2': [{
        'type2': '3'
    }, {
        'type2': '4'
    }],
    '$or-other': [{
        'type3': '5'
    }, {
        'type3': '6'
    }]
});</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.update('order', { 'state': '1' }).where({
                    'user_id': '2',
                    'state': ['1', '2', '3'],
                    '$or': [{ 'type': '1', 'find': '0' }, { 'type': '2', 'find': '1' }, [['type', '<', '-1']]]
                }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.update('order', { 'state': '1' }).where({
    'user_id': '2',
    'state': ['1', '2', '3'],
    '$or': [{ 'type': '1', 'find': '0' }, { 'type': '2', 'find': '1' }, [['type', '<', '-1']]]
});</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select('*', 'user').where({
                    'time_verify': lSql.column('time_add')
                }).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'user').where({
    'time_verify': lSql.column('time_add')
});</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.delete('user').where([
                    [['MATCH(name_sc, name_tc) AGAINST(?)', ['search']], '>=', '0.9']
                ]).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.delete('user').where([
    [['MATCH(name_sc, name_tc) AGAINST(?)', ['search']], '>=', '0.9']
]);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select('*', 'user').where([{ 'city': 'la', 'area': null }, ['age', '>', '10'], ['soft', '<>', null], ['ware', 'IS', null]]).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'user').where([{ 'city': 'la', 'area': null }, ['age', '>', '10'], ['soft', '<>', null], ['ware', 'IS', null]]);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}`);
                break;
            }
            case 'having': {
                let s = sql.select(['id', 'name', '(6371 * ACOS(COS(RADIANS(31.239845)) * COS(RADIANS(`lat`)) * COS(RADIANS(`lng`) - RADIANS(121.499662)) + SIN(RADIANS(31.239845)) * SIN(RADIANS(`lat`)))) AS distance'], 'location').having([
                    ['distance', '<', '2']
                ]).getSql();
                let sd = sql.getData();
                echo.push(`<pre>sql.select(['id', 'name', '(6371 * ACOS(COS(RADIANS(31.239845)) * COS(RADIANS(\`lat\`)) * COS(RADIANS(\`lng\`) - RADIANS(121.499662)) + SIN(RADIANS(31.239845)) * SIN(RADIANS(\`lat\`)))) AS distance'], 'location').having([
    ['distance', '<', '2']
]);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select(['id', 'name',
                    [
                        '(6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(`lat`)) * COS(RADIANS(`lng`) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(`lat`)))) AS distance',
                        ['31.239845', '121.499662', '31.239845']
                    ]
                ], 'location').having([
                    ['distance', '<', '2']
                ]).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select(['id', 'name',
    [
        '(6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(\`lat\`)) * COS(RADIANS(\`lng\`) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(\`lat\`)))) AS distance',
        ['31.239845', '121.499662', '31.239845']
    ]
], 'location')->having([
    ['distance', '<', '2']
]);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}`);
                break;
            }
            case 'by': {
                let s = sql.select('*', 'test').by('id').getSql();
                let sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'test').by('id');</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select('*', 'test').by(['index', 'id']).getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'test').by(['index', 'id']);</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}<hr>`);

                s = sql.select('*', 'test').by(['index', ['id', 'ASC']], 'DESC').getSql();
                sd = sql.getData();
                echo.push(`<pre>sql.select('*', 'test').by(['index', ['id', 'ASC']], 'DESC');</pre>
<b>getSql() :</b> ${s}<br>
<b>getData():</b> <pre>${JSON.stringify(sd, undefined, 4)}</pre>
<b>format() :</b> ${sql.format(s, sd)}`);
                break;
            }
            case 'field': {
                echo.push(`<pre>sql.field('abc');</pre>` + sql.field('abc'));
                echo.push(`<pre>sql.field('abc', 'a_');</pre>` + sql.field('abc', 'a_'));
                echo.push(`<pre>sql.field('x.abc');</pre>` + sql.field('x.abc'));
                echo.push(`<pre>sql.field('def f');</pre>` + sql.field('def f'));
                echo.push(`<pre>sql.field('def \`f\`', 'a_');</pre>` + sql.field('def `f`', 'a_'));
                echo.push(`<pre>sql.field('x.def f');</pre>` + sql.field('x.def f'));
                echo.push(`<pre>sql.field('x.def as f');</pre>` + sql.field('x.def as f'));
                echo.push(`<pre>sql.field('SUM(num) all');</pre>` + sql.field('SUM(num) all'));
                echo.push(`<pre>sql.field('SUM(x.num) all');</pre>` + sql.field('SUM(x.num) all'));
                echo.push(`<pre>sql.field('SUM(x.\`num\`) all');</pre>` + sql.field('SUM(x.`num`) all'));
                echo.push(`<pre>sql.field('FROM_UNIXTIME(time, \\'%Y-%m-%d\\') time');</pre>` + sql.field('FROM_UNIXTIME(time, \'%Y-%m-%d\') time'));
                echo.push(`<pre>sql.field('(6371 * ACOS(COS(RADIANS(31.239845)) * COS(RADIANS(lat)) * COS(RADIANS(\`lng\`) - RADIANS(121.499662)) + SIN(RADIANS(31.239845)) * SIN(RADIANS(\`lat\`))))');</pre>` + sql.field('(6371 * ACOS(COS(RADIANS(31.239845)) * COS(RADIANS(lat)) * COS(RADIANS(`lng`) - RADIANS(121.499662)) + SIN(RADIANS(31.239845)) * SIN(RADIANS(`lat`))))'));
                echo.push(`<pre>sql.field('MATCH(name_sc, name_tc) AGAINST("ok") tmp'));</pre>` + sql.field('MATCH(name_sc, name_tc) AGAINST("ok") tmp'));
                echo.push(`<pre>sql.field('a\\'bc');</pre>` + sql.field('a\'bc'));
                echo.push(`<pre>sql.field('\`a\`WHERE\`q\` = SUM(0) AND \`b\` = "abc" LEFT JOIN \`abc\`');</pre>` + sql.field('`a`WHERE`q` = SUM(0) AND `b` = "abc" LEFT JOIN `abc`'));
                echo.push(`<pre>sql.field('TEST(UTC_TIMESTAMP)');</pre>` + sql.field('TEST(UTC_TIMESTAMP)'));
                echo.push(`<pre>sql.field('a + b + 10 + c');</pre>` + sql.field('a + b + 10 + c'));
                echo.push(`<pre>sql.field('*');</pre>` + sql.field('*'));
                break;
            }
        }
        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public consistentHash(): string {
        const echo: string[] = [];

        echo.push(`<pre>lConsistent.hash('abc');</pre>` + lConsistent.hash('abc').toString());
        echo.push(`<pre>lConsistent.hash('thisisnone');</pre>` + lConsistent.hash('thisisnone').toString());
        echo.push(`<pre>lConsistent.hash('haha');</pre>` + lConsistent.hash('haha').toString());

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public consistentDistributed(): string {
        const echo: string[] = [];

        const servers = ['srv-sh.test.simu', 'srv-cd.test.simu', 'srv-tk.test.simu'];
        const files = [8, 12, 18, 32, 89, 187, 678, 1098, 3012, 8901, 38141, 76291, 99981];
        const map: Record<string, string | null> = {};
        const cons = lConsistent.get();
        cons.add(servers);
        for (const file of files) {
            map[file] = cons.find(file);
        }
        echo.push(`<pre>const servers = ['srv-sh.test.simu', 'srv-cd.test.simu', 'srv-tk.test.simu'];
const files = [8, 12, 18, 32, 89, 187, 678, 1098, 3012, 8901, 38141, 76291, 99981];
const map: Record<string, string | null> = {};
const cons = lConsistent.get();
cons.add(servers);
for (const file of files) {
    map[file] = cons.find(file);
}</pre>`);
        echo.push('<table style="width: 100%;">');
        for (const k in map) {
            const v = map[k];
            echo.push('<tr><th>' + lText.htmlescape(k) + '</th><td>' + lText.htmlescape(v ?? 'null') + ' (' + lConsistent.hash(k).toString() + ')</td></tr>');
        }
        echo.push('</table>');

        cons.add('srv-sg.test.simu');
        const file = files[lCore.rand(0, files.length - 1)];
        // const file = files[3];
        const oldSrv = map[file];
        const newSrv = cons.find(file);
        echo.push(`<pre>cons.add('srv-sg.test.simu');
const file = files[lText.rand(0, files.length - 1)];
const oldSrv = map[file];
const newSrv = cons.find(file);</pre>`);
        echo.push(`<table style="width: 100%;">
    <tr><th>File</th><td>${file}</td></tr>
    <tr><th>Old</th><td>${oldSrv ?? 'null'}</td></tr>
    <tr><th>New</th><td>${newSrv ?? 'null'}</td></tr>
    <tr><th>State</th><td>${((oldSrv === newSrv) ? '<b>Hit</b>' : 'Miss')}</td></tr>
</table>`);

        return echo.join('') + '<br>' + this._getEnd();
    }

    public consistentMigration(): string {
        const echo: string[] = [];

        // --- 生成初始数据，5000 条数据分 5 长表 ---
        const tables = ['table-0', 'table-1', 'table-2', 'table-3', 'table-4'];
        const rows: number[] = [];
        for (let i = 1; i <= 5000; ++i) {
            rows.push(i);
        }
        const cons = lConsistent.get();
        cons.add(tables);

        echo.push('Row length: ' + rows.length.toString() + '<br>Old tables:');
        for (const table of tables) {
            echo.push(' ' + table);
        }

        echo.push(`<pre>const newTables = ['table-5', 'table-6', 'table-7', 'table-8', 'table-9'];
const rtn = cons.migration(rows, newTables);</pre>`);

        // --- 即将增长到 10000 条数据，然后先模拟 5 表拆分为 10 表，再查看要迁移哪些数据，迁移量有多少 ---
        const newTables = ['table-5', 'table-6', 'table-7', 'table-8', 'table-9'];
        const rtn = cons.migration(rows, newTables);

        const count = Object.keys(rtn).length;
        echo.push('Migration length: ' + count.toString() + '<br>Added new tables: ');
        for (const table of newTables) {
            echo.push(' ' + table);
        }
        echo.push('<br><br>');

        let i = 0;
        echo.push('<table style="width: 100%;">');
        for (const key in rtn) {
            const item = rtn[key];
            echo.push('<tr><th>' + key + '</th><td>' + item.old + '</td><td>' + item.new + '</td></tr>');
            if (i === 199) {
                break;
            }
            ++i;
        }
        echo.push('</table>');

        return echo.join('') + '... More ' + (count - 200).toString() + ' ...<br><br>' + this._getEnd();
    }

    public consistentFast(): string {
        const echo: string[] = [];

        let rtn = lConsistent.fast('a', lConsistent.getRange(0, 30));
        echo.push(`<pre>Consistent.fast('a', lConsistent.getRange(0, 30))</pre>`);
        echo.push(JSON.stringify(rtn));

        rtn = lConsistent.fast('b', lConsistent.getRange(0, 30));
        echo.push(`<pre>Consistent.fast('b', lConsistent.getRange(0, 30))</pre>`);
        echo.push(JSON.stringify(rtn));

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public text(): string {
        const echo = `<pre>json_encode(lText.parseUrl('HtTp://uSer:pAss@sUBDom.TopdOm23.CoM:29819/Adm@xw2Ksiz/dszas?Mdi=KdiMs1&a=JDd#hehHe'))</pre>
${lText.htmlescape(JSON.stringify(lText.parseUrl('HtTp://uSer:pAss@sUBDom.TopdOm23.CoM:29819/Adm@xw2Ksiz/dszas?Mdi=KdiMs1&a=JDd#hehHe')))}
<pre>json_encode(lText.parseUrl('HtTp://uSer@sUBDom.TopdOm23.CoM/Admx%20w2Ksiz/dszas'))</pre>
${lText.htmlescape(JSON.stringify(lText.parseUrl('HtTp://uSer@sUBDom.TopdOm23.CoM/Admx%20w2Ksiz/dszas')))}
<pre>json_encode(lText.parseUrl('C:\\Windows\\Mi@sc'))</pre>
${lText.htmlescape(JSON.stringify(lText.parseUrl('C:\\Windows\\Mi@sc')))}
<pre>json_encode(lText.parseUrl('../../abc?q=e'))</pre>
${lText.htmlescape(JSON.stringify(lText.parseUrl('../../abc?q=e')))}
<pre>lText.urlResolve('/', 'path?id=1');</pre>
${lText.htmlescape(lText.urlResolve('/', 'path?id=1'))}
<pre>lText.urlResolve('https://www.url.com/view/path', 'find');</pre>
${lText.htmlescape(lText.urlResolve('https://www.url.com/view/path', 'find'))}
<pre>lText.urlResolve('https://www.url.com/view/path', '/');</pre>
${lText.htmlescape(lText.urlResolve('https://www.url.com/view/path', '/'))}
<pre>lText.urlResolve('https://www.url.com/view/path/oh', '../ok/./index.js');</pre>
${lText.htmlescape(lText.urlResolve('https://www.url.com/view/path/oh', '../ok/./index.js'))}
<pre>lText.urlResolve('https://www.url.com/view/path/oh', '../hah/../dodo/../112/666/777/../en');</pre>
${lText.htmlescape(lText.urlResolve('https://www.url.com/view/path/oh', '../hah/../dodo/../112/666/777/../en'))}
<pre>lText.urlResolve('/hehe/ooo/', '../../../../../index.html');</pre>
${lText.htmlescape(lText.urlResolve('/hehe/ooo/', '../../../../../index.html'))}
<pre>lText.urlResolve('https://www.url.com/view/path', '/xxx/yyy');</pre>
${lText.htmlescape(lText.urlResolve('https://www.url.com/view/path', '/xxx/yyy'))}
<pre>lText.urlResolve('/', '//www.url.com/path');</pre>
${lText.htmlescape(lText.urlResolve('/', '//www.url.com/path'))}
<pre>lText.urlResolve('http://www.url.com/path', 'hTtps://www.url.com/path');</pre>
${lText.htmlescape(lText.urlResolve('http://www.url.com/path', 'hTtps://www.url.com/path'))}
<pre>lText.urlResolve('hTtp://www.url.com/path?ok=b', '?do=some');</pre>
${lText.htmlescape(lText.urlResolve('hTtp://www.url.com/path?ok=b', '?do=some'))}
<pre>lText.urlResolve('/', 'C:\\Windows\\Boot');</pre>
${lText.htmlescape(lText.urlResolve('/', 'C:\\Windows\\Boot'))}
<pre>lText.urlResolve('C:\\Windows\\Misc', '/');</pre>
${lText.htmlescape(lText.urlResolve('C:\\Windows\\Misc', '/'))}
<pre>lText.urlResolve('C:\\Windows\\Misc', '/xxx/yyy');</pre>
${lText.htmlescape(lText.urlResolve('C:\\Windows\\Misc', '/xxx/yyy'))}
<pre>lText.urlResolve('/abc/def/', '');</pre>
${lText.htmlescape(lText.urlResolve('/abc/def/', ''))}
<pre>lText.isEMail('test@gmail.com');</pre>
${JSON.stringify(lText.isEMail('test@gmail.com'))}
<pre>lText.isEMail('test@x');</pre>
${JSON.stringify(lText.isEMail('test@x'))}
<pre>lText.isIPv4('192.168.0.1');</pre>
${JSON.stringify(lText.isIPv4('192.168.0.1'))}
<pre>lText.isIPv4('192.168.0');</pre>
${JSON.stringify(lText.isIPv4('192.168.0'))}
<pre>lText.isIPv6(':');</pre>
${JSON.stringify(lText.isIPv6(':'))}
<pre>lText.isIPv6('::');</pre>
${JSON.stringify(lText.isIPv6('::'))}
<pre>lText.isIPv6('::1');</pre>
${JSON.stringify(lText.isIPv6('::1'))}
<pre>lText.isIPv6('::FFFF:C0A8:0201');</pre>
${JSON.stringify(lText.isIPv6('::FFFF:C0A8:0201'))}
<pre>lText.isIPv6('2031:0000:1F1F:0000:0000:0100:11A0:ADDF');</pre>
${JSON.stringify(lText.isIPv6('2031:0000:1F1F:0000:0000:0100:11A0:ADDF'))}
<pre>lText.isIPv6('2031:0000:1F1F:0000:0000:0100:11A0:ADDF:AZ');</pre>
${JSON.stringify(lText.isIPv6('2031:0000:1F1F:0000:0000:0100:11A0:ADDF:AZ'))}
<pre>lText.isIPv6('::FFFF:192.168.0.1');</pre>
${JSON.stringify(lText.isIPv6('::FFFF:192.168.0.1'))}
<pre>lText.isDomain('::FFFF:192.168.0.1');</pre>
${JSON.stringify(lText.isDomain('::FFFF:192.168.0.1'))}
<pre>lText.isDomain('www.xxx.com.cn');</pre>
${JSON.stringify(lText.isDomain('www.xxx.com.cn'))}
<pre>lText.isDomain('com');</pre>
${JSON.stringify(lText.isDomain('com'))}
<pre>lText.parseDomain('www.xxx.com.cn');</pre>
${JSON.stringify(lText.parseDomain('www.xxx.com.cn'))}
<pre>lText.parseDomain('www.xxx.us');</pre>
${JSON.stringify(lText.parseDomain('www.xxx.us'))}
<pre>lText.parseDomain('xxx.co.jp');</pre>
${JSON.stringify(lText.parseDomain('xxx.co.jp'))}
<pre>lText.parseDomain('js.cn');</pre>
${JSON.stringify(lText.parseDomain('js.cn'))}
<pre>lText.parseDomain('xxx.cn');</pre>
${JSON.stringify(lText.parseDomain('xxx.cn'))}
<pre>lText.parseJson('{"num":90071992547409993149,"num2":3242354,"num3":"16565","str":"abc","bool":false}');</pre>
${lText.stringifyJson(lText.parseJson('{"num":90071992547409993149,"num2":3242354,"num3":"16565","str":"abc","bool":false}'))}
<pre>lText.isIdCardCN('110101200007284901')</pre>
${JSON.stringify(lText.isIdCardCN('110101200007284901'))}`;
        return echo + '<br><br>' + this._getEnd();
    }

    public time(): string {
        const echo = `<pre>lTime.format(this, 'Y-m-d H:i:s');</pre>
${lTime.format(this, 'Y-m-d H:i:s')}
<pre>lTime.format(0, 'Y-m-d H:i:s');</pre>
${lTime.format(0, 'Y-m-d H:i:s')}
<pre>lTime.format(null, 'Y-m-d H:i:s');</pre>
${lTime.format(null, 'Y-m-d H:i:s')}
<pre>lTime.format(9, 'Y-m-d H:i:s');</pre>
${lTime.format(9, 'Y-m-d H:i:s')}
<pre>lTime.format(9.5, 'Y-m-d H:i:s');</pre>
${lTime.format(9.5, 'Y-m-d H:i:s')}
<pre>lTime.format(null, 'd|D|j|l|N|w|Y|y|F|M|m|H|h|i|s|T');</pre>
${lTime.format(null, 'd|D|j|l|N|w|Y|y|F|M|m|H|h|i|s|T')}`;
        return echo + '<br><br>' + this._getEnd();
    }

    public wsServer(): string {
        const echo = '<a href="' + this._config.const.urlBase + 'test/ws-server">Default</a> | ' +
        '<a href="' + this._config.const.urlBase + 'test/ws-server?ac=rproxy">rproxy</a> | ' +
        '<a href="' + this._config.const.urlBase + 'test/ws-server?ac=rproxy2">rproxy2</a> | ' +
        '<a href="' + this._config.const.urlBase + 'test">Return</a><br><br>' +
`Nick: <input id="nick"> <input id="btn" type="button" value="Enter" onclick="enter()"> <input id="stop" type="button" value="Stop" onclick="stop()" disabled>
<div id="list" style="border: solid 1px #000; line-height: 1.5; height: 300px; overflow-y: scroll; margin-top: 10px; padding: 10px;"></div>
<div style="margin-top: 10px; display: flex;">
    <input id="text" style="flex: 1;">
    <input id="send" type="button" value="Send" onclick="send()" disabled style="margin-left: 10px;">
    <input type="button" value="!Ping" onclick="pinging = !pinging; this.value = pinging ? 'Ping' : '!Ping';" style="margin-left: 10px;">
</div>
<script>
var ws = null;
var nickEl = document.getElementById('nick');
var listEl = document.getElementById('list');
var btnEl = document.getElementById('btn');
var stopEl = document.getElementById('stop');

var textEl = document.getElementById('text');
var sendEl = document.getElementById('send');

function dateStr() {
    const date = new Date();
    return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0');
}

function enter() {
    var nick = nickEl.value.trim();
    if (nick === '') {
        alert('Must input nick.');
        return;
    }
    nickEl.disabled = true;
    btnEl.disabled = true;
    listEl.insertAdjacentHTML('afterbegin', '<div>[' + dateStr() + '] Connecting...</div>');
    ws = new WebSocket('ws${this._config.const.https ? 's' : ''}://${this._config.const.host}/${(this._get['ac'] === 'rproxy' || this._get['ac'] === 'rproxy2') ? this._get['ac'] : 'test'}');
    ws.onopen = function() {
        listEl.insertAdjacentHTML('afterbegin', '<div>[' + dateStr() + '] Event: onOpen.</div>');
        ws.send('Hello: ' + nick);
        listEl.insertAdjacentHTML('afterbegin', '<div>[' + dateStr() + '] Client: send "Hello: ' + nick + '".</div>');
        stopEl.disabled = false;
        sendEl.disabled = false;
    };
    ws.onmessage = function(ev) {
        listEl.insertAdjacentHTML('afterbegin', '<div>[' + dateStr() + '] Server: ' + ev.data + '.</div>');
    };
    ws.onclose = function() {
        listEl.insertAdjacentHTML('afterbegin', '<div>[' + dateStr() + '] Event: onClose.</div>');
        nickEl.disabled = false;
        btnEl.disabled = false;
        stopEl.disabled = true;
        sendEl.disabled = true;
    };
    ws.onerror = function(ev) {
        listEl.insertAdjacentHTML('afterbegin', '<div>[' + dateStr() + '] Event: onError.</div>');
        nickEl.disabled = false;
        btnEl.disabled = false;
        stopEl.disabled = true;
        sendEl.disabled = true;
    };
}
function stop() {
    ws.close();
    ws = null;
}
function send() {
    ws.send(textEl.value);
    textEl.value = '';
}
var pinging = false;
setInterval(() => {
    if (!ws) {
        return;
    }
    if (!pinging) {
        return;
    }
    ws.send('ping');
}, 5_000);
</script>`;
        return echo + '<br>' + this._getEnd();
    }

    public async wsClient(): Promise<string> {
        const ws = await lWs.connect('ws' + (this._config.const.https ? 's' : '') + '://' + this._config.const.host + '/test', {
            'mproxy': this._get['ac'] === 'mproxy' ? {
                'url': `ws${this._config.const.https ? 's' : ''}://${this._config.const.host}/mproxy`,
                'auth': '123456'
            } : undefined
        });
        if (!ws) {
            return '<div>Connect "ws' + (this._config.const.https ? 's' : '') + '://' + this._config.const.host + '/test" failed.</div><br>' + this._getEnd();
        }
        const echo: string[] = ['<div>Connected "ws' + (this._config.const.https ? 's' : '') + '://' + this._config.const.host + '/test".</div>'];
        // --- 绑定事件 ---
        await new Promise<void>((resolve) => {
            (async () => {
                ws.on('message', (frame) => {
                    echo.push('<div>Server: ' + frame.data.toString() + '.</div>');
                });
                ws.on('end', () => {
                    lCore.display('CLIENT onEnd');
                });
                ws.on('close', () => {
                    resolve();
                });
                ws.writeText('Hello: clientws');
                echo.push('<div>Client: send "Hello: clientws".</div>');
                await lCore.sleep(1000);
                ws.writeText('aaa');
                await lCore.sleep(1000);
                ws.writeText('abc');
                await lCore.sleep(1000);
                ws.writeText('ok');
                await lCore.sleep(1000);
                ws.end();
            })().catch(() => {
                //
            });
        });

        return echo.join('') + '<br>' + this._getEnd();
    }

    public async ssh(): Promise<string | kebab.Json[]> {
        const retur: kebab.Json[] = [];
        if (!(this._checkInput(this._get, {
            'type': ['require', ['shell', 'sftp'], [0, 'Type not found.']]
        }, retur))) {
            return retur;
        }

        const host = '1.1.1.1';
        const port = 22;
        const user = 'root';
        const pwd = 'xxx';

        // --- 连接 ssh 服务器 ---
        let ms = Date.now();
        const ssh = await lSsh.get({
            'host': host,
            'port': port,
            'username': user,
            'password': pwd
        });
        const echo: string[] = [
            `<pre>const ssh = await lSsh.get({
    'host': '${host}',
    'port': ${port},
    'username': '${user}',
    'password': '${pwd}'
});</pre>`
        ];
        if (!ssh) {
            echo.push('Connection failed.');
            return echo.join('') + '<br><br>' + this._getEnd();
        }
        echo.push(`Connection successful, ${Date.now() - ms}ms.`);

        // --- 执行一个命令 ---
        echo.push(`<pre>const rtn = await ssh.exec('ls');</pre>`);
        const rtn = await ssh.exec('ls');
        if (!rtn) {
            echo.push('Execution failed.');
            return echo.join('') + '<br><br>' + this._getEnd();
        }
        echo.push(lText.htmlescape(rtn.toString()));

        if (this._get['type'] === 'shell') {
            // --- 获取 shell ---
            ms = Date.now();
            const shell = await ssh.getShell();
            echo.push(`<pre>const shell = await ssh.getShell();</pre>`);
            if (!shell) {
                echo.push(`Get failed.`);
                return echo.join('') + '<br><br>' + this._getEnd();
            }
            echo.push(`Get successful, ${Date.now() - ms}ms:<pre>${lText.htmlescape((await shell.getContent()).toString())}</pre>`);

            // --- 执行一些命令 ---
            ms = Date.now();
            await shell.sendLine('cd ../../');
            echo.push(`await shell.sendLine('cd ../../'), ${Date.now() - ms}ms:<pre>${lText.htmlescape((await shell.getContent()).toString())}</pre>`);

            await shell.sendLine('ls');
            ms = Date.now();
            echo.push(`await shell.sendLine('ls'), ${Date.now() - ms}ms:<pre>${lText.htmlescape((await shell.getContent()).toString())}</pre>`);

            await shell.close();
        }
        else {
            // --- 获取 sftp ---
            ms = Date.now();
            const sftp = await ssh.getSftp();
            echo.push(`<pre>const sftp = await ssh.getSftp();</pre>`);
            if (!sftp) {
                echo.push(`Get failed.`);
                return echo.join('') + '<br><br>' + this._getEnd();
            }
            echo.push(`Get successful, ${Date.now() - ms}ms, ${sftp.pwd()}:`);
            const list = await sftp.readDir('./');
            echo.push(`<table width="100%"><tr><th>Name</th><th>Size</th><th>Uid</th><th>Gid</th><th>PMSN</th><th>Mode</th><th>Atime</th><th>Mtime</th></tr>`);
            for (const item of list) {
                echo.push(`<tr><td>${item.filename}</td><td>${lText.sizeFormat(item.attrs.size)}</td><td>${item.attrs.uid}</td><td>${item.attrs.gid}</td><td>${item.attrs.mode}</td><td>${item.attrs.mode.toString(8).slice(-4)}</td><td>${lTime.format(this, 'Y-m-d H:i:s', new Date(item.attrs.atime * 1000))}</td><td>${lTime.format(this, 'Y-m-d H:i:s', new Date(item.attrs.mtime * 1000))}</td></tr>`);
            }
            echo.push(`</table><br>`);
        }

        ssh.disconnect();

        return '<a href="' + this._config.const.urlBase + 'test/ssh?type=shell">shell</a> | ' +
        '<a href="' + this._config.const.urlBase + 'test/ssh?type=sftp">sftp</a> | ' +
        '<a href="' + this._config.const.urlBase + 'test">Return</a>' + echo.join('') + this._getEnd();
    }

    public async s3(): Promise<string> {
        const s3 = lS3.get(this, {
            'service': lS3.ESERVICE.AMAZON,
            'region': 'ap-southeast-1',
            'bucket': 'xxx'
        });
        const echo = [`<pre>const s3 = lS3.get(this, {
    'service': lS3.SERVICE.AMAZON,
    'region': 'ap-southeast-1',
    'bucket': 'xxx'
});</pre>`];
        const putr = await s3.putObject('a/b.txt', 'x');
        echo.push(`<pre>await s3.putObject('a/b.txt', 'x');</pre>` + (putr ? JSON.stringify(putr) : 'false'));
        const r = await s3.headObject('a.txt');
        echo.push(`<pre>await s3.headObject('a.txt');</pre>` + (r ? JSON.stringify(r) : 'false'));
        const r2 = await s3.deleteObjects(['a.txt', 'a/b.txt']);
        echo.push(`<pre>s3.deleteObjects(['a.txt', 'a/b.txt']);</pre>` + (r2 ? 'true' : 'false'));
        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async zip(): Promise<string> {
        const path = this._config.const.dataPath + 'test.zip';
        const echo: string[] = ['Path: ' + path + '<br><br>'];
        const buf = await lFs.getContent(path);
        if (!buf) {
            return 'Failed<br><br>' + this._getEnd();
        }
        const z = await lZip.get(buf);
        if (!z) {
            return 'Failed<br><br>' + this._getEnd();
        }
        const ls = await z.getList();
        echo.push('<table style="width: 100%;"><tr>');
        if (Object.keys(ls).length) {
            for (const path in ls) {
                echo.push('<tr>');
                echo.push('<td>' + lText.htmlescape(path) + '</td>');
                echo.push('<td>' + lText.sizeFormat(z.stats(path)?.uncompressedSize ?? 0) + '</td>');
                echo.push('<td>' + Object.prototype.toString.call(ls[path]) + '</td>');
                echo.push('</tr>');
            }
        }
        else {
            echo.push('<th>Empty</th></tr>');
        }
        echo.push('</table>');
        return echo.join('') + '<br>' + this._getEnd();
    }

    public buffer(): string {
        // --- 写 ---
        const writer = lBuffer.getWriter(8);
        writer.writeUInt8(8);
        writer.writeUInt16BE(2024);
        writer.writeBCDString('1213141516');
        const b = writer.get();
        const echo: string[] = [`<pre>const buf = lBuffer.getWriter(8);
writer.writeUInt8(8);
writer.writeUInt16BE(2024);
writer.writeBCDString('1213141516');
const b = writer.get();</pre>${b.toString('hex').replace(/(.{2})/g, '$1 ')}`];
        // --- 读 ---
        const reader = lBuffer.getReader(b);
        const rtn: any[] = [];
        rtn.push(reader.readUInt8());
        rtn.push(reader.readUInt16BE());
        rtn.push(reader.readBCDString());
        echo.push(`<pre>const reader = lBuffer.getReader(b);
const rtn: any[] = [];
rtn.push(reader.readUInt8());
rtn.push(reader.readUInt16BE());
rtn.push(reader.readBCDString());</pre>${JSON.stringify(rtn)}`);
        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async lan(): Promise<string> {
        const echo: string[] = [];

        const r = await lLan.card();
        echo.push(`<pre>lLan.card();</pre>` + JSON.stringify(r));

        const r2 = await lLan.scan();
        echo.push(`<pre>await lLan.scan();</pre>` + JSON.stringify(r2));

        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public async cron(): Promise<string> {
        // --- 注意，这个只是演示，你实际需要在 ind 目录中创建计划任务 ---
        // --- 并用 --ind 单线程模式运行 ---
        const echo: string[] = [];
        let rtn = await lCron.regular({
            'name': 'test',
            'date': {
                'month': -1,
                'day': -1,
                'hour': -1,
                'minute': -1,
                'week': -1,
            },
            'callback': (date) => {
                lCore.debug(`[${date}] test task run`);
            },
        });
        echo.push(`<pre>await lCron.regular({
    'name': 'test',
    'date': {
        'month': -1,
        'day': -1,
        'hour': -1,
        'minute': -1,
        'week': -1,
    },
    'callback': (date) => {
        lCore.debug(\`[\${date}] test task run\`);
    },
});</pre>${JSON.stringify(rtn)}
<pre>${JSON.stringify(lCron.getRegulars(), null, 4)}</pre>`);
        return echo.join('') + '<br>' + this._getEnd();
    }

    public async ai(): Promise<string> {
        const ai = lAi.get(this, {
            'service': lAi.ESERVICE.ALICN,
        });
        const echo = [`<pre>const ai = lAi.get(this, {
    'service': lAi.ESERVICE.ALICN,
});</pre>`];
        const completion = await ai.link.chat.completions.create({
            'model': 'qwen-plus',
            'messages': [
                { 'role': 'system', 'content': 'You are Kebab, a friendly and knowledgeable assistant based on an open-source Node framework. You do not mention any model names or AI identity. You can chat casually, answer questions, and provide guidance naturally. Respond in a human-like, approachable manner, as if you are a helpful companion rather than a traditional AI assistant.' },
                { 'role': 'user', 'content': '你是谁？' },
            ],
        });
        echo.push(`<pre>await ai.link.chat.completions.create({
    'model': 'qwen-plus',
    'messages': [
        { 'role': 'system', 'content': 'You are Kebab, a friendly and knowledgeable assistant based on an open-source Node framework. You do not mention any model names or AI identity. You can chat casually, answer questions, and provide guidance naturally. Respond in a human-like, approachable manner, as if you are a helpful companion rather than a traditional AI assistant.' },
        { 'role': 'user', 'content': '你是谁？' },
    ],
});</pre>` + JSON.stringify(completion.choices[0].message.content));
        return echo.join('') + '<br><br>' + this._getEnd();
    }

    public aiStream(): string {
        const echo = `<input id="text" type="text"><button id="send">Send</button>
<hr>
<div id="content"></div>
<script>
let controller;
const text = document.getElementById('text');
const send = document.getElementById('send');
const content = document.getElementById('content');
send.addEventListener('click', async () => {
    if (send.innerHTML === 'Stop') {
        controller.abort();
        return;
    }
    if (!text.value) {
        alert('Please input content');
        return;
    }
    send.innerHTML = 'Stop';
    send.disabled = true;
    controller = new AbortController();
    const res = await fetch('http${this._config.const.https ? 's' : ''}://${this._config.const.host}/test/ai-stream1', {
        'method': 'POST',
        'headers': { 'content-type': 'application/json' },
        'body': JSON.stringify({ 'content': text.value, }),
        'signal': controller.signal,
    });
    send.disabled = false;
    text.value = '';
    content.textContent = '';
    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf8');
    let buf = '';
    while (true) {
        try {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            buf += decoder.decode(value, { 'stream': true, });
            if (!buf.includes('\\n\\n')) {
                // --- 还没接收完 ---
                continue;
            }
            const events = buf.split('\\n\\n');
            buf = events.pop(); // --- 最后一个可能不完整 ---
            for (const ev of events) {
                content.textContent += JSON.parse(ev.slice(5).trim());
            }
        }
        catch {
            break;
        }
    }
    send.innerHTML = 'Send';
});
</script>`;
        return echo + '<br>' + this._getEnd();
    }

    public async aiStream1(): Promise<any> {
        if (!this._cross()) {
            return '';
        }
        const ai = lAi.get(this, {
            'service': lAi.ESERVICE.ALICN,
        });
        const stream = await ai.link.chat.completions.create({
            'model': 'qwen-plus',
            'stream': true,
            'messages': [
                { 'role': 'system', 'content': 'You are Kebab, a friendly and knowledgeable assistant based on an open-source Node framework. You do not mention any model names or AI identity. You can chat casually, answer questions, and provide guidance naturally. Respond in a human-like, approachable manner, as if you are a helpful companion rather than a traditional AI assistant.' },
                { 'role': 'user', 'content': this._post['content'] },
            ],
            'stream_options': {
                'include_usage': true,
            },
        });
        lCore.writeEventStreamHead(this._res);

        for await (const chunk of stream) {
            if (!this._isAvail) {
                lCore.debug('Client disconnect');
                stream.controller.abort();
                break;
            }
            if (chunk.choices.length) {
                const content = chunk.choices[0].delta.content;
                if (!content) {
                    continue;
                }
                if (!this._isAvail) {
                    // --- 测试上面 abort 后还会执行到这里吗 ---
                    // --- 测试结果：确实不会 ---
                    lCore.debug('Client has been closed');
                    continue;
                }
                lCore.write(this._res, 'data: ' + JSON.stringify(content) + '\n\n');
                continue;
            }
            if (!chunk.usage) {
                continue;
            }
            lCore.debug('--- All over ---');
            lCore.debug(`Input Tokens: ${chunk.usage.prompt_tokens}`);
            lCore.debug(`Output Tokens: ${chunk.usage.completion_tokens}`);
            lCore.debug(`Total Tokens: ${chunk.usage.total_tokens}`);
        }
    }

    /**
     * --- END ---
     */
    private _getEnd(): string {
        const rt = this._getRunTime();
        return 'Processed in ' + rt.toString() + ' second(s), ' + (Math.round(rt * 10000000) / 10000).toString() + 'ms, ' + (Math.round(this._getMemoryUsage() / 1024 * 100) / 100).toString() + ' K.<style>*{font-family:Consolas,"Courier New",Courier,FreeMono,monospace;line-height: 1.5;font-size:12px;}pre{padding:10px;background-color:rgba(0,0,0,.07);white-space:pre-wrap;word-break:break-all;}hr{margin:20px 0;border-color:#000;border-style:dashed;border-width:1px 0 0 0;}td,th{padding:5px;border:solid 1px #000;}</style><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">';
    }

}

// --- 下面是测试代码 ---

/*
class B {

    public a: number = 0;

    protected _data = {
        'a': 0,
    };

    public self(): this {
        return this;
    }

    public selfArray(): this[] {
        return [this];
    }

    public static get<T extends B>(): T & Record<string, any> {
        return new this() as T & Record<string, any>;
    }

}

const d = B.get();
const e = d.self();
console.log('e', e);    // --- B & Record<string, any> ---
const ea = d.selfArray();
console.log('ea', ea);  // --- (B & Record<string, any>)[] ---

// --- 测试代码结束 ---
//*/
