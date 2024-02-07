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
            this._writeText('Other message, host: ' + this._config.const.host);
        }, 2000);
        return true;
    }

    public onData(data: Buffer): string {
        const v = data.toString();
        if (v.startsWith('Hello: ')) {
            this._nick = v.slice(7);
            return 'Base64: ' + lCrypto.base64Encode(v);
        }
        // --- 用户消息 ---
        return '<b>' + this._nick + ':</b> ' + v;
    }

    public onClose(): void {
        console.log('WebSocket test onClose, nick: ' + this._nick);
        this._nick = '';
    }

}
