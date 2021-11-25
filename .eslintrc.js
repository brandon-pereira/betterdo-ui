/* eslint-env node */
/* eslint-disable import/no-commonjs */

module.exports = {
    plugins: ['@typescript-eslint', 'react', 'import', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react']
        },
        ecmaFeatures: {
            jsx: true
        }
    },
    globals: {
        __SNOWPACK_ENV__: 'readonly'
    },
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:import/react',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:eslint-comments/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            },
            alias: {
                map: [
                    ['@components', './scripts/components'],
                    ['@hooks', './scripts/hooks'],
                    ['@utilities', './scripts/utilities']
                ],
                extensions: ['.ts', '.js', '.json', '.jsx', '.tsx', '.svg']
            }
        }
    },
    rules: {
        'prettier/prettier': 'error',
        'import/no-unresolved': 1,
        'import/no-commonjs': 'error',
        'import/order': [
            1,
            {
                'newlines-between': 'always'
            }
        ],
        'react/prop-types': 0,
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-console': 0,
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/disable-enable-pair': 0,
        'no-redeclare': 0,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error'
    }
};
