import * as lCore from '~/lib/core';
import sMod from '~/sys/mod';
import types from '~/types';

/*
CREATE TABLE `m_test`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(4) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `token` varchar(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `point` point NOT NULL,
  `polygon` polygon NULL,
  `json` json NULL,
  `time_add` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `time_add`(`time_add` ASC) USING BTREE,
  UNIQUE INDEX `utoken`(`token` ASC) USING BTREE,
  UNIQUE INDEX `uname`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
*/

export default class extends sMod {

    protected static _$table = 'test';

    protected static _$primary = 'id';

    protected static _$key = 'token';

    protected static _$index = 'utoken';

    /* eslint-disable @typescript-eslint/naming-convention */

    public id!: number;

    public name!: string;

    public token!: string;

    public point!: { 'x': number; 'y': number; };

    public polygon!: Array<Array<{ 'x': number; 'y': number; }>>;

    public json!: types.Json;

    public time_add!: number;

    /* eslint-enable */

    protected _keyGenerator(): string {
        return 'test_' + lCore.rand(0, 3).toString();
    }

}
