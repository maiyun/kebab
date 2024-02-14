import * as sCtr from '~/sys/ctr';
import * as lWs from '~/lib/ws';

export default class extends sCtr.Ctr {

    private _nick: string = '';

    public async onLoad(): Promise<boolean> {
        console.log('WebSocket rproxy test onLoad.');
        if (await lWs.rproxy(this, `ws${this._config.const.https ? 's' : ''}://${this._config.const.host}/test`)) {
            return false;
        }
        return true;
    }

}
