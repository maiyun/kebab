import * as sCtr from '~/sys/ctr.js';
import * as lWs from '~/lib/ws.js';
import * as lCore from '~/lib/core.js';

export default class extends sCtr.Ctr {

    public async onLoad(): Promise<boolean> {
        lCore.debug('WebSocket rsocket test onLoad.');
        if (await lWs.rsocket(this, '192.168.31.99', 5900)) {
            return false;
        }
        return true;
    }

}
