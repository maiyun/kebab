import type * as http from 'http';
import type * as http2 from 'http2';
import type { IProxyHeaderOptions } from '#kebab/lib/undici/proxy.js';
import type { THttpHeaders } from '#kebab/lib/undici.js';

const excludedHeaders = new Set([
    'host', 'connection', 'keep-alive', 'http-code', 'http-url',
    'transfer-encoding', 'upgrade', 'proxy-connection',
    'te', 'trailer', 'proxy-authenticate', 'proxy-authorization',
]);

const privateHeaders = new Set([
    'forwarded', 'via', 'x-real-ip', 'true-client-ip', 'client-ip', 'x-client-ip',
    'fastly-client-ip', 'x-cluster-client-ip', 'x-envoy-external-address',
    'x-original-forwarded-for', 'x-original-host', 'x-original-url', 'x-rewrite-url',
]);

export function filterProxyHeaders(
    headers: http.IncomingHttpHeaders | http2.IncomingHttpHeaders | THttpHeaders,
    res?: http2.Http2ServerResponse | http.ServerResponse,
    filter?: (h: string) => boolean
): Record<string, string | string[]> {
    const result: Record<string, string | string[]> = {};
    const sent = res?.headersSent ?? false;
    const dynamicHopByHop = new Set<string>();
    for (const name in headers) {
        if (name.toLowerCase() === 'connection') {
            const raw = headers[name];
            const text = Array.isArray(raw) ? raw.join(',') : String(raw ?? '');
            for (const part of text.split(',')) {
                const token = part.trim().toLowerCase();
                if (token) {
                    dynamicHopByHop.add(token);
                }
            }
        }
    }
    for (const name in headers) {
        const lower = name.toLowerCase();
        if (excludedHeaders.has(lower) || dynamicHopByHop.has(lower) || name.includes(':') || name.includes('(')) {
            continue;
        }
        const value = headers[name];
        if (value === undefined || (filter && !filter(name))) {
            continue;
        }
        if (res) {
            if (!sent) {
                res.setHeader(name, value);
            }
        }
        else {
            result[name] = value;
        }
    }
    return result;
}

export function buildProxyHeaders(
    req: http.IncomingMessage | http2.Http2ServerRequest,
    opt: IProxyHeaderOptions & {
        headers?: http.IncomingHttpHeaders;
        filter?: (h: string) => boolean;
    } = {}
): http.IncomingHttpHeaders {
    const headers = filterProxyHeaders(req.headers, undefined, opt.filter);
    if (opt.proxyMode === undefined || opt.proxyMode === 'passthrough') {
        const merged: http.IncomingHttpHeaders = {};
        for (const name in headers) {
            merged[name.toLowerCase()] = headers[name];
        }
        for (const name in opt.headers) {
            merged[name.toLowerCase()] = opt.headers[name];
        }
        return merged;
    }
    const result: http.IncomingHttpHeaders = {};
    for (const name in headers) {
        const key = name.toLowerCase();
        if (key === 'host' || privateHeaders.has(key) || key.startsWith('x-forwarded-') ||
            key.startsWith('cf-') || key.startsWith('eo-')) {
            continue;
        }
        result[key] = headers[name];
    }
    if (opt.proxyMode === 'reverse') {
        const host = req.headers[':authority'] ?? req.headers['host'];
        if (typeof host === 'string' && host) {
            result['host'] = host;
            result['x-forwarded-host'] = host;
        }
        result['x-forwarded-proto'] = (req.socket as { encrypted?: boolean; }).encrypted ? 'https' : 'http';
        if (req.socket.remoteAddress) {
            result['x-forwarded-for'] = req.socket.remoteAddress;
            result['x-real-ip'] = req.socket.remoteAddress;
        }
    }
    for (const name in opt.headers) {
        result[name.toLowerCase()] = opt.headers[name];
    }
    return result;
}
