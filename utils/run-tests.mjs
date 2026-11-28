import { spawnSync } from 'node:child_process';
import { globSync } from 'node:fs';

const suites = [
    ...globSync('abox/test/*.mjs', { exclude: ['**/*-bench.mjs'] }),
    ...globSync('abox/test/*.test.ts').map(path => path.replace(/\.ts$/, '.js')),
].sort();
const result = spawnSync(process.execPath, ['--test', '--test-concurrency=2', ...suites], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
