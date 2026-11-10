import * as stream from 'stream';

/** Pipe all parts as one response and stop every source when the response fails. */
export function pipeResponse(
    parts: Array<stream.Readable | string | Buffer>,
    response: stream.Writable,
    compress?: stream.Transform,
    onInputDone?: () => void
): void {
    const sources = parts.filter((part): part is stream.Readable => part instanceof stream.Readable);
    let failure: Error | undefined;
    let inputDone = false;
    const combined = stream.Readable.from((async function*() {
        for (const part of parts) {
            if (failure) {
                throw failure;
            }
            if (part instanceof stream.Readable) {
                for await (const chunk of part) {
                    yield chunk;
                }
            }
            else {
                yield part;
            }
        }
    })());
    const stopSources = (): void => {
        for (const source of sources) {
            if (!source.destroyed) {
                source.destroy();
            }
        }
    };
    const onError = (error: Error): void => {
        failure ??= error;
        if (!inputDone) {
            combined.destroy(error);
        }
        stopSources();
    };
    for (const source of sources) {
        source.on('error', onError);
        source.once('close', () => source.off('error', onError));
    }
    response.once('close', stopSources);
    const finishInput = (): void => {
        if (!inputDone) {
            inputDone = true;
            onInputDone?.();
        }
    };
    combined.once('end', finishInput);
    const done = (): void => {
        stopSources();
        response.off('close', stopSources);
        finishInput();
    };
    if (compress) {
        stream.pipeline(combined, compress, response, done);
    }
    else {
        stream.pipeline(combined, response, done);
    }
}
