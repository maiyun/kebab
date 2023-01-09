import sMod from '~/sys/mod';

export default class extends sMod {

    protected static _$table = 'test_data';

    protected static _$primary = 'id';

    /* eslint-disable @typescript-eslint/naming-convention */

    public id?: number;

    public test_id?: number;

    public content?: string;

    public time_add?: number;

    /* eslint-enable */

}
