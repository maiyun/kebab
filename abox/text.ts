// TypeScript's bundled JSON declarations do not yet include these Node 22 APIs.
const nativeJson = JSON as unknown as {
    parse(text: string, reviver: (key: string, value: unknown, context: { source?: string; }) => unknown): unknown;
    rawJSON(text: string): unknown;
};

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
