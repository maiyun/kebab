import * as fs from 'fs/promises';
import * as path from 'path';

export function createPathGuard(exampleRoot: string): (candidate: string) => Promise<boolean> {
    const normalizedRoot = path.resolve(exampleRoot);
    let root: Promise<string> | undefined;
    return async candidate => {
        root ??= fs.realpath(normalizedRoot).catch(() => normalizedRoot);
        try {
            const relative = path.relative(await root, await fs.realpath(candidate));
            return relative === '' || relative !== '..' &&
                !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
        }
        catch {
            return true;
        }
    };
}
