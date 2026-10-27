import * as sCtr from '#kebab/sys/ctr.js';
import * as lWs from '#kebab/lib/ws.js';
import * as lCore from '#kebab/lib/core.js';

export default class extends sCtr.Ctr {

    public async onLoad(): Promise<boolean> {
        lCore.debug('WebSocket mproxy test onLoad.');
        const address = this._req.socket.localAddress;
        if (!address) {
            return false;
        }
        const rtn = await lWs.mproxy(this, '123456', { 'hosts': address });
        if (rtn > 0) {
            return false;
        }
        lCore.debug('WebSocket mproxy error: ' + rtn);
        return false;
    }

}
