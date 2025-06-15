import * as sCtr from '~/sys/ctr';
import * as lWs from '~/lib/ws';

export default class extends sCtr.Ctr {

    public async onLoad(): Promise<boolean> {
        console.log('WebSocket mproxy test onLoad.');
        const rtn = await lWs.mproxy(this, '123456');
        if (rtn > 0) {
            return false;
        }
        console.log('WebSocket mproxy error: ' + rtn);
        return false;
    }

}
