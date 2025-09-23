import * as sCtr from '#kebab/sys/ctr.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as lCore from '#kebab/lib/core.js';
import * as http from 'http';

export default class extends sCtr.Ctr {

    private _nick: string = '';

    public onUpgrade(): { 'headers'?: http.OutgoingHttpHeaders; 'timeout'?: number; } {
        lCore.debug('WebSocket test onUpgrade.');
        return {
            'timeout': 60_000 * 2,
        };
    }

    public onLoad(): boolean {
        lCore.debug('WebSocket test onLoad.');
        setTimeout(() => {
            if (!this._nick) {
                return;
            }
            this._writeText('Other message, host: ' + this._config.const.host);
        }, 2_000);
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
        const date = new Date();
        lCore.debug('[' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0') + '] WebSocket test onData, data: ' + data);
        return '<b>' + this._nick + ':</b> ' + data;
    }

    public onClose(): void {
        lCore.debug('WebSocket test onClose, nick: ' + this._nick);
        this._nick = '';
    }

}
