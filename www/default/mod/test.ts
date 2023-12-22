import * as lCore from '~/lib/core';
import sMod from '~/sys/mod';

/*
CREATE TABLE `m_test` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` CHAR(16) NOT NULL COLLATE 'ascii_bin',
  `point` POINT NOT NULL,
  `polygon` POLYGON NULL DEFAULT NULL,
  `time_add` BIGINT NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `token` (`token`) USING BTREE,
	INDEX `time_add` (`time_add`) USING BTREE
) ENGINE=InnoDB COLLATE=utf8mb4_general_ci;
*/

export default class extends sMod {

    protected static _$table = 'test';

    protected static _$primary = 'id';

    protected static _$key = 'token';

    /* eslint-disable @typescript-eslint/naming-convention */

    public id!: number;

    public token!: string;

    public point!: { 'x': number; 'y': number; };

    public polygon!: Array<Array<{ 'x': number; 'y': number; }>>;

    public time_add!: number;

    /* eslint-enable */

    protected _keyGenerator(): string {
        return 'test_' + lCore.rand(0, 5).toString();
    }

}
