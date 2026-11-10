export function urlAtom(url: string): string {
    const suffixAt = url.search(/[?#]/);
    const suffix = suffixAt < 0 ? '' : url.slice(suffixAt);
    let path = suffixAt < 0 ? url : url.slice(0, suffixAt);
    const authority = /^(?:[a-z][a-z\d+.-]*:)?\/\/[^/]*/i.exec(path);
    const drive = /^[a-z]:/i.exec(path);
    const prefix = authority?.[0] ?? drive?.[0] ?? '';
    path = path.slice(prefix.length);
    const rooted = path.startsWith('/');
    const segments: string[] = [];
    const parts = path.split('/');
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === '.') {
            if (i === parts.length - 1) segments.push('');
            continue;
        }
        if (part === '..') {
            while (segments.length > (rooted ? 1 : 0) && segments[segments.length - 1] === '') segments.pop();
            if (segments.length && segments[segments.length - 1] !== '..' && segments[segments.length - 1] !== '') {
                segments.pop();
                if (i === parts.length - 1) segments.push('');
            }
            else if (!rooted) segments.push('..');
            continue;
        }
        segments.push(part);
    }
    let result = segments.join('/');
    if (rooted && !result.startsWith('/')) result = '/' + result;
    return prefix + result + suffix;
}

export function urlWithinHttpBase(base: string, target: string): boolean {
    try {
        const baseUrl = new URL(base);
        const targetUrl = new URL(target);
        return baseUrl.origin === targetUrl.origin &&
            (targetUrl.pathname === baseUrl.pathname.slice(0, -1) || targetUrl.pathname.startsWith(baseUrl.pathname));
    }
    catch {
        return false;
    }
}

export function queryParse(query: string): Record<string, string | string[]> {
    const ret: Record<string, string | string[]> = {};
    const arrayKeys: Record<string, boolean> = {};
    const arr = query.split('&');
    for (const i of arr) {
        if (!i.length) {
            continue;
        }
        const pos = i.indexOf('=');

        let key: string;
        try {
            key = decodeURIComponent((pos === -1 ? i : i.slice(0, pos)).replace(/\+/g, ' '));
        }
        catch {
            key = (pos === -1 ? i : i.slice(0, pos)).replace(/\+/g, ' ');
        }
        let value = '';
        try {
            value = pos === -1 ? '' : decodeURIComponent(i.slice(pos + 1).replace(/\+/g, ' '));
        }
        catch {
            value = pos === -1 ? '' : i.slice(pos + 1).replace(/\+/g, ' ');
        }

        if (Object.hasOwn(arrayKeys, key)) {
            (ret[key] as string[]).push(value);
        }
        else if (!Object.hasOwn(ret, key)) {
            Object.defineProperty(ret, key, {
                'configurable': true,
                'enumerable': true,
                'value': value,
                'writable': true,
            });
        }
        else {
            ret[key] = [ret[key] as string, value];
            Object.defineProperty(arrayKeys, key, {
                'configurable': true,
                'enumerable': true,
                'value': true,
                'writable': true,
            });
        }
    }
    return ret;
}
