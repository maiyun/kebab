export function sleep(ms: number): Promise<void> {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    });
}