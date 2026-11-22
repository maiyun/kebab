import type * as lDb from '#kebab/lib/db.js';
import type { Vector } from '#kebab/lib/vector.js';

interface IQueryRow {
    'uid': string;
    'item_count': number;
}

interface ISearchExtra {
    'book_id': number;
    'id': boolean;
    'distance': string;
}

export async function checkDbQueryTypes(pool: lDb.Pool, transaction: lDb.Transaction, connection: lDb.Connection): Promise<void> {
    for (const db of [pool, transaction, connection]) {
        const legacy = await db.query('SELECT 1');
        legacy.rows?.[0]?.custom_value.toUpperCase();

        // @ts-expect-error 上下文类型不会为未提供泛型的调用指定结果行。
        const contextual: Promise<lDb.IData<IQueryRow>> = db.query('SELECT 1');
        void contextual;

        const typed = await db.query<IQueryRow>('SELECT uid, item_count FROM example WHERE uid = $1', ['example']);
        // @ts-expect-error 查询结果的 rows 可能为 null。
        void typed.rows[0];
        typed.rows?.[0]?.uid.toUpperCase();
        typed.rows?.[0]?.item_count.toFixed();
        // @ts-expect-error 显式指定后，行只能访问已声明的字段。
        void typed.rows?.[0]?.unlisted;
        typed.fields[0]?.name.toUpperCase();
        typed.fields[0]?.length.toFixed();
        typed.error?.message.toUpperCase();
        typed.error?.errno.toFixed();
        typed.result.toFixed();

        // @ts-expect-error 查询行必须为对象。
        void db.query<string>('SELECT uid FROM example');
    }
}

export async function checkVectorSearchTypes(vector: Vector): Promise<void> {
    const options = { 'collection': 'example', 'data': [1], 'fields': ['book_id'] };
    const legacy = await vector.search(options);
    if (legacy !== false) {
        legacy[0]?.custom_value.toUpperCase();
    }

    // @ts-expect-error 上下文类型不会为未提供泛型的调用指定输出字段。
    const contextual: Promise<Array<{ 'book_id': number }> | false> = vector.search(options);
    void contextual;

    const typed = await vector.search<ISearchExtra>(options);
    // @ts-expect-error 搜索可能失败，必须先处理 false。
    void typed[0];
    if (typed !== false) {
        for (const hit of typed) {
            const id: string | number = hit.id;
            void id;
            hit.distance.toFixed();
            hit.book_id.toFixed();
            // @ts-expect-error 显式指定后只能访问固定字段和已声明的输出字段。
            void hit.unlisted;
        }
    }

    // @ts-expect-error 输出字段必须为对象。
    void vector.search<string>(options);
}
