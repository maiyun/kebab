import * as sCtr from '~/sys/ctr';
import * as lCrypto from '~/lib/crypto';

export default class extends sCtr.Ctr {

    private _nick: string = '';

    public onLoad(): boolean {
        console.log('WebSocket test onLoad.');
        setTimeout(() => {
            if (!this._nick) {
                return;
            }
            this._send('Other message.');
        }, 2000);
        return true;
    }

    public onData(val: string): string {
        if (val.startsWith('Hello: ')) {
            this._nick = val.slice(7);
            return 'Base64: ' + lCrypto.base64Encode(val);
        }
        // --- 用户消息 ---
        return '<b>' + this._nick + ':</b> ' + val;
    }

    public onClose(): void {
        console.log('WebSocket test onClose, nick: ' + this._nick + '.');
        this._nick = '';
    }

}
