import * as crypto from 'node:crypto';
import { promisify } from 'node:util';
import type { IPasswordOptions } from '#kebab/lib/crypto.js';

const argon2 = typeof crypto.argon2 === 'function' ? promisify(crypto.argon2) : undefined;

function valid(memory: number, passes: number, parallelism: number): boolean {
    return Number.isInteger(memory) && Number.isInteger(passes) && Number.isInteger(parallelism) &&
        parallelism >= 1 && parallelism <= 8 && memory >= 8 * parallelism && memory <= 262144 &&
        passes >= 1 && passes <= 10;
}

function base64(value: Buffer): string {
    return value.toString('base64').replace(/=+$/, '');
}

export async function hash(password: string, options: IPasswordOptions): Promise<string | false> {
    try {
        const { memory = 65536, passes = 3, parallelism = 1 } = options;
        if (!argon2 || !valid(memory, passes, parallelism)) {
            return false;
        }
        const salt = crypto.randomBytes(16);
        const tag = await argon2('argon2id', {
            message: password, nonce: salt, tagLength: 32, memory, passes, parallelism,
        });
        return `$argon2id$v=19$m=${memory},t=${passes},p=${parallelism}$${base64(salt)}$${base64(tag)}`;
    }
    catch {
        return false;
    }
}

export async function verify(password: string, encoded: string): Promise<boolean | null> {
    if (typeof encoded !== 'string' || encoded.length > 256) {
        return false;
    }
    const match =
        /^\$argon2id\$v=19\$m=([1-9]\d*),t=([1-9]\d*),p=([1-9]\d*)\$([A-Za-z0-9+/]+)\$([A-Za-z0-9+/]+)$/.exec(encoded);
    if (match?.[0] !== encoded) {
        return false;
    }
    const memory = Number(match[1]);
    const passes = Number(match[2]);
    const parallelism = Number(match[3]);
    if (!valid(memory, passes, parallelism)) {
        return false;
    }
    const salt = Buffer.from(match[4], 'base64');
    const expected = Buffer.from(match[5], 'base64');
    if (salt.length < 8 || salt.length > 64 || expected.length < 16 || expected.length > 64 ||
        base64(salt) !== match[4] || base64(expected) !== match[5]) {
        return false;
    }
    if (!argon2) {
        return null;
    }
    try {
        const actual = await argon2('argon2id', {
            message: password, nonce: salt, tagLength: expected.length, memory, passes, parallelism,
        });
        return crypto.timingSafeEqual(actual, expected);
    }
    catch {
        return null;
    }
}
