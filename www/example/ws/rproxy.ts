import * as sCtr from '#kebab/sys/ctr.js';
import * as lCore from '#kebab/lib/core.js';
import * as lWs from '#kebab/lib/ws.js';

export default class extends sCtr.Ctr {

    public async onLoad(): Promise<boolean> {
        lCore.debug('WebSocket rproxy test onLoad.');
        const socket = this._req.socket;
        if (!socket.localAddress || !socket.localPort) {
            return false;
        }
        const url = new URL('test', `ws${this._config.const.uri.protocol === 'wss:' ? 's' : ''}://${this._config.const.host}${this._config.const.urlBase}`);
        url.port = socket.localPort.toString();
        if (await lWs.rproxy(this, url.href, { 'hosts': socket.localAddress })) {
            return false;
        }
        return true;
    }

}
