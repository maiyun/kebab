import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import * as nodeTest from 'node:test';
import { fileURLToPath } from 'node:url';

import * as kebab from '#kebab/index.js';
import * as sCtr from '#kebab/sys/ctr.js';
import * as sRoute from '#kebab/sys/route.js';

class LocationTestCtr extends sCtr.Ctr {

    public constructor(res: http.ServerResponse) {
        super({
            'set': {
                'cacheTtl': 0,
            },
            'const': {
                'urlBase': '/base/',
            },
        } as unknown as kebab.IConfig, {} as http.IncomingMessage, res);
    }

    public location(location: string, httpCode?: sCtr.TRedirectHttpCode): false {
        return this._location(location, httpCode);
    }

    public getHttpCode(): number {
        return this._httpCode;
    }

}

function createResponse(): {
    'headers': Record<string, number | string | readonly string[]>;
    'response': http.ServerResponse;
} {
    const headers: Record<string, number | string | readonly string[]> = {};
    const response = {
        setHeader(name: string, value: number | string | readonly string[]): void {
            headers[name.toLowerCase()] = value;
        },
    } as unknown as http.ServerResponse;
    return {
        headers,
        response,
    };
}

class RouteResponseMock {

    private readonly _headers: Record<string, number | string | readonly string[]> = {};

    public headersSent: boolean = false;

    public statusCode: number = 0;

    public writableEnded: boolean = false;

    public setHeader(name: string, value: number | string | readonly string[]): this {
        this._headers[name.toLowerCase()] = value;
        return this;
    }

    public getHeader(name: string): number | string | readonly string[] | undefined {
        return this._headers[name.toLowerCase()];
    }

    public writeHead(statusCode: number): this {
        this.statusCode = statusCode;
        this.headersSent = true;
        return this;
    }

    public end(): this {
        this.writableEnded = true;
        return this;
    }

}

await nodeTest.test('_location defaults to a 302 redirect', () => {
    const { headers, response } = createResponse();
    const ctr = new LocationTestCtr(response);

    assert.strictEqual(ctr.location('next'), false);
    assert.strictEqual(ctr.getHttpCode(), 302);
    assert.strictEqual(headers.location, '/base/next');
});

await nodeTest.test('_location supports explicit redirect status codes', () => {
    for (const httpCode of [301, 302, 303, 307, 308] as const) {
        const { headers, response } = createResponse();
        const ctr = new LocationTestCtr(response);

        assert.strictEqual(ctr.location('moved', httpCode), false);
        assert.strictEqual(ctr.getHttpCode(), httpCode);
        assert.strictEqual(headers.location, '/base/moved');
    }
});

await nodeTest.test('route response keeps explicit redirect codes and preserves the legacy 302 default', async () => {
    const rootPath = fileURLToPath(new URL('./fixtures/redirect/', import.meta.url));
    for (const [path, expectedCode] of [
        ['/permanent', 301],
        ['/temporary', 302],
        ['/legacy', 302],
    ] as const) {
        const req = {
            'headers': {},
            'url': path,
        } as http.IncomingMessage;
        const response = new RouteResponseMock();
        await sRoute.run({
            req,
            'res': response as unknown as http.ServerResponse,
            'uri': {
                'protocol': 'http:',
                'auth': null,
                'user': null,
                'pass': null,
                'host': 'localhost',
                'hostname': 'localhost',
                'port': null,
                'pathname': path,
                'path': path,
                'query': null,
                'hash': null,
            },
            rootPath,
            'urlBase': '/',
            'path': path.slice(1),
        });
        assert.strictEqual(response.statusCode, expectedCode);
        assert.strictEqual(response.getHeader('location'), '/target');
        assert.strictEqual(response.writableEnded, true);
    }
});
