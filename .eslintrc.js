module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    // "extends": "elemefe/react",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // 'semi': true,
    },
    // 'semi': [2, 'never'],
    
    // 'semi-spacing': [2, {
    //   'before': false,
    //   'after': true
    // }],
};