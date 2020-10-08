module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': [2, 'first'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'jsx-a11y/click-events-have-key-events': 0,
        'max-len': ['error', { code: 120 }],
        'jsx-a11y/no-static-element-interactions': ['error',
            {
                handlers: [
                    'onKeyPress',
                    'onKeyDown',
                    'onKeyUp',
                ],
            },
        ],
    },
};
