import * as sCtr from '~/sys/ctr.js';
import * as lWs from '~/lib/ws.js';
import * as lCore from '~/lib/core.js';

export default class extends sCtr.Ctr {

    public async onLoad(): Promise<boolean> {
        lCore.debug('WebSocket mproxy test onLoad.');
        const rtn = await lWs.mproxy(this, '123456');
        if (rtn > 0) {
            return false;
        }
        lCore.debug('WebSocket mproxy error: ' + rtn);
        return false;
    }

}
