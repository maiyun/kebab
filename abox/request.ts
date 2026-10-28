import type * as http from 'http';

export function getPublicProtocol(req: Pick<http.IncomingMessage, 'headers'>, fallback: string): string {
    if (fallback !== 'http:' && fallback !== 'https:') {
        return fallback;
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
