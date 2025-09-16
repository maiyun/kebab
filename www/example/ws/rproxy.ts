import * as sCtr from '~/sys/ctr.js';
import * as lCore from '~/lib/core.js';
import * as lWs from '~/lib/ws.js';

export default class extends sCtr.Ctr {

    public async onLoad(): Promise<boolean> {
        lCore.debug('WebSocket rproxy test onLoad.');
        if (await lWs.rproxy(this, `ws${this._config.const.https ? 's' : ''}://${this._config.const.host}/test`)) {
            return false;
        }
        return true;
    }

}
