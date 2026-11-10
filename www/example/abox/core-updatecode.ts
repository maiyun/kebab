import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const prefix = 'core-updatecode-';
const directoryPattern = /^core-updatecode-[a-zA-Z0-9]{6}$/;

export async function prepare(root: string): Promise<string | false> {
    let directory: string | undefined;
    try {
        const temporary = path.join(root, 'ftmp');
        await fs.mkdir(temporary, { recursive: true });
        directory = await fs.mkdtemp(path.join(temporary, prefix));
        await fs.mkdir(path.join(directory, 'www'));
        await fs.writeFile(path.join(directory, 'www/lock.txt'), 'Before updateCode test\n', { flag: 'wx' });
        return path.relative(root, directory).split(path.sep).join('/') + '/';
    }
    catch {
        if (directory) await fs.rm(directory, { recursive: true, force: true }).catch(() => {});
        return false;
    }
}

export async function clear(root: string): Promise<boolean> {
    try {
        const temporary = path.join(root, 'ftmp');
        let entries;
        try { entries = await fs.readdir(temporary, { withFileTypes: true }); }
        catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') return true;
            throw error;
        }
        for (const entry of entries) {
            if (!entry.isDirectory() || !directoryPattern.test(entry.name)) continue;
            await fs.rm(path.join(temporary, entry.name), { recursive: true, force: true });
        }
        return true;
    }
    catch { return false; }
}
