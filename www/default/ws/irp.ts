import * as sCtr from '~/sys/ctr';
import * as lWs from '~/lib/ws';

// --- 客户端连服务器端 irp 的演示代码 ---

export default class extends sCtr.Ctr {

    public async onLoad(): Promise<boolean> {
        console.log('WebSocket irp test onLoad.');
        const rtn = await lWs.irp(this, 'test', 'token', '123456');
        if (rtn > 0) {
            return false;
        }
        console.log('WebSocket irp error: ' + rtn);
        return false;
    }

}
