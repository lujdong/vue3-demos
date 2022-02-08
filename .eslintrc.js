module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // 使用两个空格缩进
        indent: [2, 4, { SwitchCase: 1 }],
        'vue/html-indent': [2, 4],
        '@typescript-eslint/indent': ['error'],
        // 使用三元操作符
        'no-ternary': 0,
        'no-var': 2,
        // 使用全等号
        eqeqeq: 2,
        // 禁止直接修改props
        'vue/no-mutating-props': 2,
        // 对象属性前加空格
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        // 使用单引号
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        // 禁止使用尾逗号
        'comma-dangle': 2,
        // 逗号后跟空格
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 箭头函数箭头前后加空格
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 禁止使用不必要的分号
        semi: [2, 'never'],
        // 要求操作符周围有空格
        'space-infix-ops': 2,
        // 如非必要，对象属性不要加引号
        'quote-props': [2, 'as-needed'],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/max-attributes-per-line': ['error', {
            singleline: 1
        }]
    }
}
