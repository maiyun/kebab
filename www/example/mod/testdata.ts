import sMod from '#kebab/sys/mod.js';
/*
CREATE TABLE `m_test_data_0` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `test_id` bigint NOT NULL,
    `content` varchar(128) COLLATE ascii_bin NOT NULL,
    `time_add` bigint NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_bin;
*/

export default class extends sMod {

    protected static _$table = 'test_data';

    protected static _$primary = 'id';

    /* eslint-disable @typescript-eslint/naming-convention */

    declare public id: number;

    declare public test_id: number;

    declare public content: string;

    declare public time_add: number;

    /* eslint-enable */

}
