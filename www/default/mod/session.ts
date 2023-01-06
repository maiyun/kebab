// --- 库和定义 ---
import * as lCore from '~/lib/core';
// --- 模型 ---
import sMod from '~/sys/mod';

export default class extends sMod {

    protected static _$table = 'session';

    protected static _$primary = 'id';

    protected static _$key = 'token';

    public id?: number;

    public token?: string;

    public data?: string;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public time_update?: number;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public time_add?: number;

    protected _keyGenerator(): string {
        return 'test_' + lCore.rand(0, 3).toString();
    }

}
