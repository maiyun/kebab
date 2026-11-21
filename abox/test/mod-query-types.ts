import type * as lDb from '#kebab/lib/db.js';
import Mod from '#kebab/sys/mod.js';

class TestMod extends Mod {

    public declare uid: string;

}

export async function checkModQueryTypes(db: lDb.Pool): Promise<void> {
    const query = TestMod.select<TestMod>(db, ['uid', '1 custom_value']).where({ 'uid': 'test' });
    query.by('uid', 'ASC');
    // @ts-expect-error 查询对象只暴露已声明的方法。
    query.order('uid');
    // @ts-expect-error where() 返回的查询对象也拒绝未定义的方法。
    TestMod.where<TestMod>(db, { 'uid': 'test' }).order('uid');

    const first = await query.first();
    if (first) {
        first.uid.toUpperCase();
        void first.custom_value;
    }
    const rows = await query.all();
    if (rows && rows.length) {
        rows.item(0).uid.toUpperCase();
        void rows.item(0).custom_value;
    }
    const keyedRows = await query.all('uid');
    if (keyedRows) {
        void keyedRows['test']?.custom_value;
    }
}
