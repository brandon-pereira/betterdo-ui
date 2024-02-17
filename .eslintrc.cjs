/* eslint-env node */
/* eslint-disable import/no-commonjs */

module.exports = {
    plugins: ['@typescript-eslint', 'react', 'import', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
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
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime'
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
                    ['@components', './src/components'],
                    ['@hooks', './src/hooks'],
                    ['@utilities', './src/utilities'],
                    ['@customTypes', './src/customTypes']
                ],
                extensions: ['.ts', '.js', '.json', '.jsx', '.tsx']
            }
        }
    },
    rules: {
        'prettier/prettier': 'error',
        'import/no-unresolved': ['error', { ignore: ['\\.svg'] }],
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
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'error'
    }
};
