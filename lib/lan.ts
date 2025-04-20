import * as os from 'os';
import * as lCore from '~/lib/core';

/**
 * --- 获取当前网卡的 IP、MAC 信息 ---
 */
export function card(): Array<{
    'name': string;
    'mac': string;
    'iPv4': string;
    'iPv6': string;
}> {
    const result: Array<{
        'name': string;
        'mac': string;
        'iPv4': string;
        'iPv6': string;
    }> = [];
    const nifs = os.networkInterfaces();
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
    return result;
}

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
