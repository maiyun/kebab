import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { redact } from '../../lib/text.js';

function baseline(value, secrets) {
    for (const secret of secrets) {
        if (!secret) continue;
        for (const variant of new Set([secret, encodeURIComponent(secret), JSON.stringify(secret).slice(1, -1)])) {
            if (!variant) continue;
            value = value.split(variant).join('[REDACTED]');
        }
    }
    return value;
}

for (const size of [1024, 262144]) {
    for (const count of [3, 32]) {
        const secrets = Array.from({ length: count }, (_, index) => `key-${String(index).padStart(2, '0')}-end`);
        for (const hits of [false, true]) {
            const fragment = hits ? `filler ${secrets.join(' ')} ` : 'filler text without credentials ';
            const payload = fragment.repeat(Math.ceil(size / fragment.length)).slice(0, size);
            assert.equal(redact(payload, secrets), baseline(payload, secrets));
            const iterations = size < 2048 ? 1000 : 20;
            const measure = fn => {
                for (let i = 0; i < 5; i++) fn(payload, secrets);
                const start = performance.now();
                for (let i = 0; i < iterations; i++) fn(payload, secrets);
                return ((performance.now() - start) / iterations).toFixed(3);
            };
            console.log(JSON.stringify({ size, count, hits, iterations, redactMs: measure(redact), baselineMs: measure(baseline) }));
        }
    }
}
