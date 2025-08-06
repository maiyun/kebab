import * as sCtr from '~/sys/ctr';
import * as lWs from '~/lib/ws';

export default class extends sCtr.Ctr {

    public async onLoad(): Promise<boolean> {
        console.log('WebSocket rsocket test onLoad.');
        if (await lWs.rsocket(this, '192.168.31.99', 5900)) {
            return false;
        }
        return true;
    }

}
