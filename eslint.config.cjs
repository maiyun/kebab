// eslint.config.js
const rules = require('@litert/eslint-plugin-recommended-rules');

module.exports = [
    ...rules.typescript,
    {
        files: [
            '**/*.ts', // don't add `./` before the path
            '**/*.tsx',
        ],
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-this-alias': 'off',
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            'max-lines': ['warn', 5000],
        }
    },
    {
        files: [
            '**/*.tsx',
        ],
        rules: {
            // --- React 组件使用 PascalCase，框架注入属性允许使用 _ 前缀 ---
            '@typescript-eslint/naming-convention': 'off',
        }
    }
];
