import * as os from 'os';
import * as lCore from '~/lib/core.js';

/**
 * --- 获取当前网卡的 IP、MAC 信息 ---
 */
export async function card(): Promise<Array<{
    'name': string;
    'mac': string;
    'iPv4': string;
    'iPv6': string;
}>> {
    const result: Array<{
        'name': string;
        'mac': string;
        'iPv4': string;
        'iPv6': string;
    }> = [];
    let i = 0;
    while (i < 5) {
        const nifs = os.networkInterfaces();
        if (!Object.keys(nifs).length) {
            ++i;
            await lCore.sleep(50);
            continue;
        }
        for (const name in nifs) {
            /** --- 当前网卡 --- */
            const card = nifs[name];
            if (!card) {
                continue;
            }
            if (card[0].internal) {
                continue;
            }
            const item = {
                'name': name,
                'mac': '',
                'iPv4': '',
                'iPv6': ''
            };
            for (const it of card) {
                if (!item.mac) {
                    item.mac = it.mac;
                }
                if (it.family === 'IPv4') {
                    item.iPv4 = it.address;
                }
                else {
                    item.iPv6 = it.address;
                }
            }
            result.push(item);
        }
        break;
    }
    return result;
}

/**
 * --- 扫描发生关联的局域网 IP ---
 */
export async function scan(): Promise<Array<{
    'mac': string;
    'iPv4': string;
}>> {
    const result: Array<{
        'mac': string;
        'iPv4': string;
    }> = [];
    const res = await lCore.exec('arp -a');
    if (!res) {
        return result;
    }
    const lines = res.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    for (const line of lines) {
        const match = /([0-9.]{5,}).+?([a-zA-Z0-9:-]{5,})/.exec(line);
        if (!match) {
            continue;
        }
        result.push({
            'iPv4': match[1],
            'mac': match[2].replace(/-/g, ':')
        });
    }
    return result;
}
