import * as sCtr from '~/sys/ctr';

export default class extends sCtr.Ctr {

    public onLoad(): boolean {
        console.log('WebSocket middle.');
        return true;
    }

}
