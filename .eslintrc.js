/**
 * Inspired by watson-developer-cloud/node-sdk
 */
module.exports = {
    plugins: ['react'],
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            experimentalDecorators: true,
            jsx: true
        }
    },
    env: {
        node: true,
        browser: true,
        es6: true
    },
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    settings: {
        react: {
            version: '16.5'
        }
    },
    rules: {
        'react/prop-types': 0,
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-console': 0
    }
};
