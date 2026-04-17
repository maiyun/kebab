import * as kebab from '#kebab/index.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';

/**
 * --- 对 cookie 对象进行操作 ---
 * @param cookie 要操作的对象
 * @param name 名
 * @param value 值
 * @param domain 应用网址，如 .xxx.com
 * @param opt 选项 ttl, path, ssl, httponly
 */
export function setCookie(cookie: Record<string, ICookie>, name: string, value: string, domain: string, opt: {
    'ttl'?: number;
    'path'?: string;
    'ssl'?: boolean;
    'httponly'?: boolean;
} = {}): void {
    const tim = lTime.stamp();
    const ttl = opt.ttl ?? 0;
    domain = lText.parseHost(domain).hostname;
    const domainN = domain.startsWith('.') ? domain.slice(1) : domain;

    let exp = -1992199400;
    if (ttl) {
        exp = tim + ttl;
    }

    cookie[name + '-' + domainN] = {
        'name': name,
        'value': value,
        'exp': exp,
        'path': opt['path'] ?? '/',
        'domain': domainN,
        'secure': opt['ssl'] ? true : false,
        'httponly': opt['httponly'] ? true : false
    };
}

/**
 * --- 根据 Set-Cookie 头部转换到 cookie 对象 ---
 * @param cookie cookie 对象
 * @param setCookies 头部的 set-cookie 数组
 * @param uri 请求的 URI 对象
 */
export async function buildCookieObject(
    cookie: Record<string, ICookie>,
    setCookies: string[],
    uri: kebab.IUrlParse
): Promise<void> {
    const tim = lTime.stamp();
    uri.path ??= '/';
    for (const setCookie of setCookies) {
        const cookieTmp: Record<string, string> = {};
        const list = setCookie.split(';');
        // --- 提取 set-cookie 中的定义信息 ---
        for (let index = 0; index < list.length; ++index) {
            const item = list[index];
            const arr = item.split('=');
            /** --- 提取 key 并修整 --- */
            const key = arr[0].trim();
            if (key === '') {
                continue;
            }
            /** --- 提取 value --- */
            let val = '';
            if (arr.length > 1) {
                val = item.slice(item.indexOf('=') + 1).trim();
            }
            if (index === 0) {
                // --- 用户定义的信息 ---
                cookieTmp['name'] = key;
                try {
                    cookieTmp['value'] = decodeURIComponent(val);
                }
                catch {
                    cookieTmp['value'] = val;
                }
            }
            else {
                // --- cookie 配置信息，可转小写方便读取 ---
                cookieTmp[key.toLowerCase()] = val;
            }
        }
        // --- 获取定义的 domain ---
        let domain = '', domainN = '';
        if (cookieTmp['domain']) {
            cookieTmp['domain'] = lText.parseHost(cookieTmp['domain']).hostname;
            if (!(cookieTmp['domain'].startsWith('.'))) {
                domain = '.' + cookieTmp['domain'];
                domainN = cookieTmp['domain'];
            }
            else {
                domain = cookieTmp['domain'];
                domainN = cookieTmp['domain'].slice(1);
            }
        }
        else {
            domain = '.' + (uri.hostname ?? '');
            domainN = uri.hostname ?? '';
        }
        // --- 判断有没有设置 domain 的权限 ---
        // --- uri.hostname vs  domain(domainN) ---
        // --- ok.xxx.com   vs  .ok.xxx.com: true ---
        // --- ok.xxx.com   vs  .xxx.com: true ---
        // --- z.ok.xxx.com vs  .xxx.com: true ---
        // --- ok.xxx.com   vs  .zz.ok.xxx.com: false ---
        if (uri.hostname !== domainN) {
            // --- 设置的域名和当前 host 不相等，如果是 IP、无 . 域名，则直接失败 ---
            if (!lText.isDomain(uri.hostname ?? '')) {
                continue;
            }
            const parseDomain: lText.IDomain = await lText.parseDomain(domainN);
            if (parseDomain.tld === domainN.toLowerCase()) {
                // --- 不能给 tld 设置 cookie ---
                continue;
            }
            // --- 判断访问路径 (uri['host']) 是不是设置域名 (domain) 的孩子，domain 必须是 uriHost 的同级或者父辈 ---
            if (!((uri.hostname ?? '').endsWith(domain))) {
                // --- false 代表进入了，代表失败 ---
                // --- ok.xxx.com, .xxx.com: true ---
                // --- ok.xxx.com, .ppp.com: false ---
                // --- ok.xxx.com, .p.ok.xxx.com: false ---
                continue;
            }
        }
        const cookieKey = cookieTmp['name'] + '-' + domainN;
        let exp = -1992199400;
        if (cookieTmp['max-age'] !== undefined) {
            const maxAge = Number(cookieTmp['max-age']);
            if (!(isNaN(maxAge))) {
                if (maxAge <= 0) {
                    delete cookie[cookieKey];
                    continue;
                }
                exp = tim + maxAge;
            }
        }
        if ((exp === -1992199400) && cookieTmp['expires']) {
            const expires = lTime.stamp(cookieTmp['expires']);
            if (!(isNaN(expires))) {
                if (expires <= tim) {
                    delete cookie[cookieKey];
                    continue;
                }
                exp = expires;
            }
        }
        // --- path ---
        let path = cookieTmp['path'] ?? '';
        if (path === '') {
            const srp = (uri.pathname ?? '').lastIndexOf('/');
            path = (uri.pathname ?? '').slice(0, srp + 1);
        }
        else if (!path.startsWith('/')) {
            path = '/' + path;
        }
        cookie[cookieKey] = {
            'name': cookieTmp['name'],
            'value': cookieTmp['value'],
            'exp': exp,
            'path': path,
            'domain': domainN,
            'secure': cookieTmp['secure'] !== undefined,
            'httponly': cookieTmp['httponly'] !== undefined
        };
    }
}

/**
 * --- 对象转换为 Cookie 拼接字符串（会自动筛掉不能发送的 cookie） ---
 * @param cookie cookie 对象
 * @param uri 请求的 URI 对象
 */
export function buildCookieQuery(cookie: Record<string, ICookie>, uri: kebab.IUrlParse): string {
    const tim = lTime.stamp();
    let cookieStr: string = '';
    for (const key in cookie) {
        const item: ICookie = cookie[key];
        if ((item.exp < tim) && (item.exp !== -1992199400)) {
            delete cookie[key];
            continue;
        }
        uri.path ??= '/';
        if (item.secure && (uri.protocol !== 'https:')) {
            continue;
        }
        // --- 判断 path 是否匹配 ---
        if (!uri.path.startsWith(item.path)) {
            continue;
        }
        const domain: string = '.' + item.domain;
        // --- 判断 $uri['host'] 必须是 $domain 的同级或子级 ---
        // --- $uri['host']     vs      $domain ---
        // --- ok.xxx.com       vs      .ok.xxx.com: true ---
        // --- ok.xxx.com       vs      .xxx.com: true ---
        // --- z.ok.xxx.com     vs      .xxx.com: true ---
        // --- ok.xxx.com       vs      .zz.ok.xxx.com: false ---
        if ('.' + (uri.hostname ?? '') !== domain) {
            // --- 域名不相等，那么判断当前域名 host 是不是 domain 的孩子 ---
            if (!(uri.hostname!.endsWith(domain))) {
                // --- false 代表进入，被排除了，因为 cookie 的 domain 和当前 host 后半部分，代表不是 domain 的孩子 ---
                // --- ok.xxx.com, .zz.ok.xxx.com: false ---
                // --- pp.ok.xxx.com, .zz.ok.xxx.com: false ---
                // --- q.b.ok.xx.com, .zz.ok.xxx.com: false ---
                // --- z.ok.xxx.com, .xxx.com: true ---
                // --- xx.xxx.com, .ok.xxx.com: false ---
                continue;
            }
        }
        cookieStr += item.name + '=' + encodeURIComponent(item.value) + '; ';
    }
    if (cookieStr !== '') {
        return cookieStr.slice(0, -2);
    }
    else {
        return '';
    }
}

/**
 * --- 模拟重启浏览器后的状态 ---
 * @param cookie cookie 对象
 */
export function resetCookieSession(cookie: Record<string, ICookie>): void {
    for (const key in cookie) {
        const item = cookie[key];
        if (item.exp === -1992199400000) {
            delete cookie[key];
        }
    }
}

// --- 类型 ---

/** --- Cookie 对象 --- */
export interface ICookie {
    'name': string;
    'value': string;
    /** --- 有效期秒级时间戳 --- */
    'exp': number;
    'path': string;
    'domain': string;
    'secure': boolean;
    'httponly': boolean;
}
