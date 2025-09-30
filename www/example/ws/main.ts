import * as sCtr from '#kebab/sys/ctr.js';
import * as lCore from '#kebab/lib/core.js';

export default class extends sCtr.Ctr {

    public onLoad(): boolean {
        lCore.debug('WebSocket test main onLoad.');
        setTimeout(() => {
            this._writeText('Hello, world!');
            this._end();
        }, 2_000);
        return true;
    }

    public onClose(): void {
        lCore.debug('WebSocket test main onClose');
    }

}
