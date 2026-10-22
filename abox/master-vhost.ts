import * as fs from 'fs/promises';
import type { Stats } from 'fs';
import * as path from 'path';
import * as lText from '#kebab/lib/text.js';

let pending: Promise<string> = Promise.resolve('Done');

export function isFiles(files: unknown): files is Record<string, string> {
    if (!files || typeof files !== 'object' || Array.isArray(files)) {
        return false;
    }
    const entries = Object.entries(files);
    if (!entries.length) {
        return false;
    }
    const names = new Set<string>();
    for (const [name, content] of entries) {
        if (!name.endsWith('.json') || /[/\\\0:]/.test(name) || names.has(name.toLowerCase()) || typeof content !== 'string') {
            return false;
        }
        names.add(name.toLowerCase());
        const config = lText.parseJson<unknown>(content);
        const list = Array.isArray(config) ? config : [config];
        for (const item of list) {
            if (!item || typeof item !== 'object' || Array.isArray(item)) {
                return false;
            }
            const vhost = item as Record<string, unknown>;
            if (
                !Array.isArray(vhost['domains']) || vhost['domains'].some(domain => typeof domain !== 'string') ||
                typeof vhost['root'] !== 'string' ||
                vhost['name'] !== undefined && typeof vhost['name'] !== 'string' ||
                vhost['remark'] !== undefined && typeof vhost['remark'] !== 'string'
            ) {
                return false;
            }
        }
    }
    return true;
}

export function replace(
    directory: string, files: Record<string, string>, report: (message: string, error: unknown) => void
): Promise<string> {
    pending = pending.catch(() => '').then(() => replaceOnce(path.resolve(directory), files, report));
    return pending;
}

async function replaceOnce(
    directory: string, files: Record<string, string>, report: (message: string, error: unknown) => void
): Promise<string> {
    let temporary = '';
    let moved = false;
    let committed = false;
    let preserveBackup = false;
    try {
        let current: Stats | undefined;
        try {
            current = await fs.lstat(directory);
        }
        catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw error;
            }
        }
        if (current && !current.isDirectory()) {
            return 'Invalid vhost directory';
        }
        temporary = await fs.mkdtemp(path.join(path.dirname(directory), '.vhost-'));
        const staged = path.join(temporary, 'new');
        const backup = path.join(temporary, 'old');
        await fs.mkdir(staged, { mode: current ? current.mode & 0o777 : 0o755 });
        for (const [name, content] of Object.entries(files)) {
            await fs.writeFile(path.join(staged, name), content, { encoding: 'utf8', flag: 'wx' });
        }
        if (current) {
            await fs.rename(directory, backup);
            moved = true;
        }
        await fs.rename(staged, directory);
        committed = true;
        return 'Done';
    }
    catch (error) {
        report('Directory replacement failed.', error);
        if (moved && !committed) {
            try {
                await fs.rename(path.join(temporary, 'old'), directory);
            }
            catch (restoreError) {
                preserveBackup = true;
                report('Directory restore failed.', restoreError);
                return `Failed to restore vhost directory; backup: ${path.join(temporary, 'old')}`;
            }
        }
        return 'Failed to replace vhost directory';
    }
    finally {
        if (temporary && !preserveBackup) {
            try {
                await fs.rm(temporary, { recursive: true, force: true });
            }
            catch (error) {
                report(`Temporary directory cleanup failed: ${temporary}`, error);
            }
        }
    }
}
