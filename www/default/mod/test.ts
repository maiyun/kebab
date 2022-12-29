import sMod from '~/sys/mod';

export default class Test extends sMod {

    protected static _$table = 'test';

    protected static _$primary = 'id';

    public id?: number;

    public name?: string;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public time_add?: number;

}
