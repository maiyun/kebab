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

    public onData(data: Buffer | string): string {
        if (typeof data !== 'string') {
            return '';
        }
        if (data.startsWith('Hello: ')) {
            this._nick = data.slice(7);
            return 'Base64: ' + lCrypto.base64Encode(data);
        }
        // --- 用户消息 ---
        return '<b>' + this._nick + ':</b> ' + data;
    }

    public onClose(): void {
        console.log('WebSocket test onClose, nick: ' + this._nick);
        this._nick = '';
    }

}
