/* eslint-env node */
/* eslint-disable import/no-commonjs */

module.exports = {
    plugins: ['react', 'import', 'prettier'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react']
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
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:import/react',
        'plugin:import/errors',
        'plugin:import/warnings',
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
                extensions: ['.js', '.jsx']
            },
            alias: {
                map: [
                    ['@components', './scripts/components'],
                    ['@hooks', './scripts/hooks'],
                    ['@utilities', './scripts/utilities']
                ]
            }
        }
    },
    rules: {
        'prettier/prettier': 'error',
        'import/no-unresolved': 1,
        'import/no-commonjs': 'error',
        'import/order': 1,
        'react/prop-types': 0,
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-console': 0,
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/disable-enable-pair': 0
    }
};
