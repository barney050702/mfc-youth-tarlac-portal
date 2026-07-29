import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                Chart: 'readonly',
                XLSX: 'readonly',
                confetti: 'readonly',
                html2pdf: 'readonly',
                html2canvas: 'readonly',
                QRCode: 'readonly',
                firebase: 'readonly',
                renderAll: 'readonly',
            },
        },
    },
    pluginJs.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
    {
        ignores: ['node_modules/', 'dist/', 'old_script.js', 'tail_script.js', 'temp.js', 'tests/'],
    },
];
