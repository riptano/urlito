module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "classes": true,
            "experimentalObjectRestSpread": true,
            "modules": true
        },
        "sourceType": "module"
    },

    "settings": {
    },

    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "node": true
    },

    "plugins": [
        "import",
        "jest",
    ],

    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:jest/recommended",
    ],

    "rules": {
        // Possible Errors
        "no-console": 0,
        "no-extra-parens": [
            "error",
            "all",
            {
                "nestedBinaryExpressions": false,
                "returnAssign": false
            }
        ],

        // Best Practices
        "accessor-pairs": ["error", {"getWithoutSet": true}],
        "block-scoped-var": "error",
        "consistent-return": "error",
        "no-alert": "error",
        "no-div-regex": "off",
        "no-else-return": "off",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-floating-decimal": "error",
        "no-implicit-coercion": "off",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-iterator": "error",
        "no-labels": ["error", {"allowSwitch": true}],
        "no-lone-blocks": "error",
        "no-loop-func": "error",
        "no-multi-spaces": "off",
        "no-multi-str": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal-escape": "error",
        "no-proto": "error",
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-unused-expressions": "error",
        "no-unused-vars": ["error", { "ignoreRestSiblings": true }],
        "no-useless-call": "error",
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-with": "error",
        "radix": "error",
        "require-await": "error",
        "semi": ["error", "always"],
        "wrap-iife": "error",

        // Variables
        "no-catch-shadow": "error",
        "no-label-var": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-undef-init": "error",
        "no-use-before-define": "error",

        // Promises
        "promise/avoid-new": "off",
        "promise/always-return": "off",

        // Node.js
        "handle-callback-err": "error",
        "no-mixed-requires": "error",
        "no-new-require": "error",
        "no-path-concat": "error",
        "no-process-exit": "error",

        // Jest
        // It is very important not to allow tests to be disabled. This can happen
        // easily during development, and this rule ensures that temporarily disabled
        // tests are not going to stay disabled in production.
        "jest/no-disabled-tests": "error",

        // ECMAScript
        "arrow-body-style": ["error", "as-needed"],
        "arrow-parens": ["error", "as-needed"],
        "arrow-spacing": "error",
        "no-duplicate-imports": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "error",
        "prefer-const": "off",
        "prefer-template": "off",
        "no-prototype-builtins": "off",
    }
};
