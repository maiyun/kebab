import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type * as http from 'node:http';

const emptyHash = crypto.createHash('sha256').digest('hex');
const nonces = new Map<string, number>();
const rates = new Map<string, { count: number; expires: number; }>();
const windowMs = 5_000;

export function validSecret(secret: unknown): secret is string {
    return typeof secret === 'string' && secret.trim().length >= 32 && !/^(.{1,8})\1+$/s.test(secret.trim()) && !/^(mustchange|changeme|placeholder|your[_ -]?secret)/i.test(secret.trim());
}

export function hash(data: string | Buffer): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}

export async function hashFile(file: string): Promise<string | false> {
    try {
        const digest = crypto.createHash('sha256');
        for await (const chunk of fs.createReadStream(file)) digest.update(chunk as Buffer);
        return digest.digest('hex');
    }
    catch { return false; }
}

export function sign(message: Record<string, unknown>, secret: string, method = 'GET', bodyHash = emptyHash): string {
    if (!validSecret(secret)) return 'invalid';
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', crypto.createHash('sha256').update(secret).digest(), iv);
    const data = Buffer.from(JSON.stringify({ ...message, time: Date.now(), nonce: crypto.randomBytes(16).toString('hex'), method, bodyHash }));
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64url');
}

export function authenticate(
    req: http.IncomingMessage, secret: unknown
): (Record<string, any> & { action: string; bodyHash: string; }) | false {
    const now = Date.now();
    const ip = req.socket.remoteAddress ?? 'unknown';
    for (const [key, entry] of rates) if (entry.expires <= now) rates.delete(key);
    const rate = rates.get(ip);
    if (rate && rate.count >= 120 || !rate && rates.size >= 4096 || !validSecret(secret)) return false;
    const token = req.url?.slice(1) ?? '';
    if (!/^[A-Za-z0-9_-]+$/.test(token) || token.length > 32768) return false;
    try {
        const raw = Buffer.from(token, 'base64url');
        if (raw.length < 29) return false;
        const decipher = crypto.createDecipheriv('aes-256-gcm', crypto.createHash('sha256').update(secret).digest(), raw.subarray(0, 12));
        decipher.setAuthTag(raw.subarray(12, 28));
        const msg = JSON.parse(Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString());
        if (!msg || typeof msg !== 'object' || typeof msg.action !== 'string' || !Number.isSafeInteger(msg.time) || Math.abs(now - msg.time) > windowMs || !/^[a-f0-9]{32}$/.test(msg.nonce) || !/^[a-f0-9]{64}$/.test(msg.bodyHash) || msg.method !== req.method) return false;
        for (const [key, expires] of nonces) if (expires < now) nonces.delete(key);
        if (nonces.has(msg.nonce) || nonces.size >= 10000) return false;
        nonces.set(msg.nonce, msg.time + windowMs);
        return msg;
    }
    catch { return false; }
}

export function reject(req: http.IncomingMessage): boolean {
    const now = Date.now();
    const ip = req.socket.remoteAddress ?? 'unknown';
    for (const [key, entry] of rates) if (entry.expires <= now) rates.delete(key);
    const entry = rates.get(ip);
    if (entry) {
        entry.count = Math.min(entry.count + 1, 120);
        return false;
    }
    if (rates.size >= 4096) return false;
    rates.set(ip, { count: 1, expires: now + 60_000 });
    return true;
}

export async function readBody(
    req: http.IncomingMessage, expected: string, directory: string, upload: boolean, limit: number
): Promise<{ body?: Buffer; file?: string; } | false> {
    let file: string | undefined;
    let handle: fs.promises.FileHandle | undefined;
    const chunks: Buffer[] = [];
    let size = 0;
    const digest = crypto.createHash('sha256');
    try {
        if (upload) {
            file = path.join(directory, `rpc-${crypto.randomBytes(16).toString('hex')}`);
            handle = await fs.promises.open(file, 'wx', 0o600);
        }
        for await (const chunk of req) {
            const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            size += data.length;
            if (size > limit) throw new Error('limit');
            digest.update(data);
            if (handle) await handle.writeFile(data);
            else chunks.push(data);
        }
        if (digest.digest('hex') !== expected) throw new Error('digest');
        await handle?.close();
        return upload ? { file } : { body: Buffer.concat(chunks, size) };
    }
    catch {
        await handle?.close().catch(() => {});
        if (file) await fs.promises.unlink(file).catch(() => {});
        return false;
    }
}
