import type * as http from 'http';

export function getPublicProtocol(req: Pick<http.IncomingMessage, 'headers'>, fallback: string): string {
    if (fallback !== 'http:' && fallback !== 'https:') {
        return fallback;
    }
    const forwarded = req.headers['forwarded'];
    if (typeof forwarded === 'string' && forwarded.length <= 4096) {
        const forwardedParts = splitQuoted(forwarded, ',');
        if (forwardedParts !== null) {
            const params = splitQuoted(forwardedParts[0], ';');
            if (params !== null) {
                let protocol: string | null = null;
                let valid = true;
                for (const param of params) {
                    const index = param.indexOf('=');
                    const name = param.slice(0, index).trim();
                    if (index < 1 || !/^[^\s;,="]+$/u.test(name)) {
                        valid = false;
                        break;
                    }
                    if (name.toLowerCase() !== 'proto') {
                        continue;
                    }
                    const value = param.slice(index + 1).trim();
                    const unquoted = value.startsWith('"') && value.endsWith('"')
                        ? value.slice(1, -1).replace(/\\(.)/gu, '$1')
                        : value;
                    if (protocol !== null || !/^(?:http|https)$/iu.test(unquoted)) {
                        valid = false;
                        break;
                    }
                    protocol = unquoted.toLowerCase() + ':';
                }
                if (valid && protocol !== null) {
                    return protocol;
                }
            }
        }
    }

    const xForwardedProto = req.headers['x-forwarded-proto'];
    if (typeof xForwardedProto === 'string' && xForwardedProto.length <= 4096) {
        const first = xForwardedProto.split(',', 1)[0].trim();
        if (/^(?:http|https)$/iu.test(first)) {
            return first.toLowerCase() + ':';
        }
    }
    return fallback;
}

function splitQuoted(value: string, separator: string): string[] | null {
    const result: string[] = [];
    let start = 0;
    let quoted = false;
    let escaped = false;
    for (let i = 0; i < value.length; ++i) {
        const char = value[i];
        if (escaped) {
            escaped = false;
            continue;
        }
        if (quoted && char === '\\') {
            escaped = true;
            continue;
        }
        if (char === '"') {
            quoted = !quoted;
        }
        else if (!quoted && char === separator) {
            if (separator === ',') {
                return [value.slice(0, i)];
            }
            result.push(value.slice(start, i));
            start = i + 1;
        }
    }
    if (quoted || escaped) {
        return null;
    }
    result.push(value.slice(start));
    return result;
}
