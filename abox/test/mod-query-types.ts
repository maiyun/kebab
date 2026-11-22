import type * as lDb from '#kebab/lib/db.js';
import Mod from '#kebab/sys/mod.js';

class TestMod extends Mod {

    public declare uid: string;

}

interface IQueryExtra {
    'custom_value': number;
}

interface IQueryRow extends IQueryExtra {
    'uid': string;
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

export async function checkTypedModResults(db: lDb.Pool): Promise<void> {
    const query = TestMod.select<TestMod>(db, ['uid', '1 custom_value']);
    const rawRows = await Promise.all([
        query.firstArray<IQueryRow>(),
        query.first<IQueryRow>(false, true),
        TestMod.oneArray<IQueryRow>(db, {}),
        TestMod.one<IQueryRow>(db, {}, { 'array': true }),
    ]);
    for (const row of rawRows) {
        // @ts-expect-error 单条查询需要先处理 false 和 null。
        void row.uid;
        if (row !== false && row !== null) {
            row.uid.toUpperCase();
            row.custom_value.toFixed();
            // @ts-expect-error 原生行没有模型方法。
            void row.save();
        }
    }

    const rawList = await query.allArray<IQueryRow>();
    const rawDictionary = await query.allArray<IQueryRow>('uid');
    const page = await query.allCursor<IQueryRow>(10, { 'by': 'uid' });
    if (rawList && rawDictionary && page) {
        rawList[0]?.custom_value.toFixed();
        rawDictionary['test']?.uid.toUpperCase();
        page.list[0]?.uid.toUpperCase();
        // @ts-expect-error 显式指定行类型后拒绝未声明的别名。
        void rawList[0]?.unlisted;
    }

    const first = await query.first<IQueryExtra>();
    const rows = await query.all<IQueryExtra>();
    const keyed = await query.all<IQueryExtra>('uid');
    if (first && rows && keyed) {
        first.custom_value.toFixed();
        rows.item(0).custom_value.toFixed();
        keyed['test'].custom_value.toFixed();
        void first.save;
        // @ts-expect-error 指定别名后拒绝未声明字段。
        void rows.item(0).unlisted;

        const uid = first.get<string>('uid');
        // @ts-expect-error 该字段可能还未加载。
        uid.toUpperCase();
        uid?.toUpperCase();
        first.get('untyped').anything;
        first.toArray<typeof TestMod>().uid.toUpperCase();
        first.toArray<IQueryRow>().uid.toUpperCase();
        rows.toArray<IQueryRow>()[0]?.custom_value.toFixed();
        Mod.toArrayByRecord<IQueryRow>(keyed)['test']?.custom_value.toFixed();
        // @ts-expect-error 转成普通对象后没有模型方法。
        void first.toArray<IQueryRow>().save();
    }
}

export function checkLegacyModelInference<T extends Mod>(db: lDb.Pool): Promise<false | null | (T & Record<string, unknown>)> {
    return TestMod.one(db, {});
}
