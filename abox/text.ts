import type { IJsonObject, JsonValue } from '#kebab/lib/text.js';

// TypeScript's bundled JSON declarations do not yet include these Node 22 APIs.
const nativeJson = JSON as unknown as {
    parse(text: string, reviver: (key: string, value: unknown, context: { source?: string; }) => unknown): unknown;
    rawJSON(text: string): unknown;
};

export function redact(value: string, secrets: readonly string[], replacement: string, encoded: boolean): string {
    if (!value || !secrets.length) return value;
    const patterns = new Map<string, number>();
    const add = (text: string, uri = false): void => {
        if (text.length > value.length) return;
        let pattern = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (uri) {
            pattern = pattern.replace(/%[\dA-F]{2}/g, part => part.replace(/[A-F]/g, hex => `[${hex}${hex.toLowerCase()}]`));
        }
        patterns.set(pattern, text.length);
    };
    for (const secret of new Set(secrets)) {
        if (!secret || secret.length > value.length) continue;
        add(secret);
        if (!encoded) continue;
        const json = JSON.stringify(secret).slice(1, -1);
        if (json !== secret) add(json);
        try {
            const uri = encodeURIComponent(secret);
            if (uri !== secret) add(uri, true);
        }
        catch {
            // A lone surrogate has no URI encoding; raw and JSON forms remain usable.
        }
    }
    if (!patterns.size) return value;
    const pattern = [...patterns].sort((a, b) => b[1] - a[1]).map(([text]) => text).join('|');
    return value.replace(new RegExp(pattern, 'g'), () => replacement);
}

export function parseJson<T>(str: string): T | false {
    try {
        return nativeJson.parse(str, (_key, value, context) => {
            if (typeof value === 'number' && !Number.isSafeInteger(value) &&
                context.source !== undefined && /^-?\d+$/.test(context.source)) {
                return BigInt(context.source);
            }
            return value;
        }) as T;
    }
    catch {
        return false;
    }
}

export function stringifyJson(obj: unknown, space?: string | number): string {
    return JSON.stringify(obj, (_key, value: unknown) => {
        return typeof value === 'bigint' ? nativeJson.rawJSON(value.toString()) : value;
    }, space);
}

function copyJson(value: unknown, ancestors: Set<object>): JsonValue {
    if (value === null || typeof value === 'string' || typeof value === 'boolean' ||
        (typeof value === 'number' && Number.isFinite(value))) return value;
    if (typeof value !== 'object' || ancestors.has(value)) throw new TypeError();

    const array = Array.isArray(value);
    if (!array) {
        const proto = Object.getPrototypeOf(value);
        if (proto !== null && proto !== Object.prototype) throw new TypeError();
    }
    ancestors.add(value);
    const keys = Reflect.ownKeys(value);
    let result: JsonValue;
    if (array) {
        if (keys.length !== value.length + 1) throw new TypeError();
        const items: JsonValue[] = [];
        for (let i = 0; i < value.length; ++i) items.push(copyProperty(value, i, ancestors));
        result = items;
    }
    else {
        const object: IJsonObject = Object.create(null);
        for (const key of keys.sort()) {
            if (typeof key !== 'string') throw new TypeError();
            object[key] = copyProperty(value, key, ancestors);
        }
        result = object;
    }
    ancestors.delete(value);
    return result;
}

function copyProperty(object: object, key: PropertyKey, ancestors: Set<object>): JsonValue {
    const prop = Object.getOwnPropertyDescriptor(object, key);
    if (!prop?.enumerable || !Object.hasOwn(prop, 'value')) throw new TypeError();
    return copyJson(prop.value, ancestors);
}

export function normalizeJsonObject(value: unknown): IJsonObject | false {
    try {
        if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
        return copyJson(value, new Set()) as IJsonObject;
    }
    catch {
        return false;
    }
}
