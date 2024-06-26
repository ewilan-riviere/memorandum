---
title: Configs
---

## Laravel

### Pint

```json title="pint.json"
{
  "preset": "laravel",
  "config": "https://mlocati.github.io/php-cs-fixer-configurator",
  "rules": {
    "array_indentation": true,
    "array_syntax": true,
    "blank_line_after_opening_tag": true,
    "blank_line_before_statement": false,
    "blank_line_after_namespace": true,
    "explicit_string_variable": false,
    "indentation_type": true,
    "lambda_not_used_import": false,
    "linebreak_after_opening_tag": true,
    "method_chaining_indentation": true,
    "multiline_whitespace_before_semicolons": {
      "strategy": "new_line_for_chained_calls"
    },
    "no_empty_comment": false,
    "no_extra_blank_lines": {
      "tokens": [
        "extra",
        "throw",
        "use"
      ]
    },
    "no_unused_imports": true,
    "not_operator_with_successor_space": true,
    "ordered_imports": {
      "imports_order": [
        "class",
        "function",
        "const"
      ],
      "sort_algorithm": "alpha"
    },
    "php_unit_internal_class": false,
    "php_unit_method_casing": false,
    "php_unit_test_class_requires_covers": false,
    "phpdoc_single_line_var_spacing": true,
    "phpdoc_to_comment": false,
    "return_assignment": true,
    "single_line_comment_style": false,
    "single_class_element_per_statement": true,
    "single_import_per_statement": true,
    "single_line_after_imports": true
  }
}
```

### PHP CS Fixer

```php title=".php-cs-fixer.dist.php"
<?php

/**
 * Rules
 * https://mlocati.github.io/php-cs-fixer-configurator.
 */
$rules = [
  '@PhpCsFixer' => true,
  'no_empty_comment' => false,
  'no_extra_blank_lines' => [
    'tokens' => [
      'extra',
      'throw',
      'use',
    ],
  ],
  'not_operator_with_successor_space' => true,
  'php_unit_method_casing' => false,
  'single_line_comment_style' => false,
  'phpdoc_single_line_var_spacing' => true,
  'php_unit_internal_class' => false,
  'php_unit_test_class_requires_covers' => false,
  'lambda_not_used_import' => false,
  'return_assignment' => true,
  'phpdoc_to_comment' => false,
  'ordered_imports' => [
    'imports_order' => [
      'class', 'function', 'const',
    ],
    'sort_algorithm' => 'alpha',
  ],
  'array_indentation' => true,
  'array_syntax' => true,
  'blank_line_after_opening_tag' => true,
  'blank_line_before_statement' => false,
  'no_unused_imports' => true,
];

$finder = PhpCsFixer\Finder::create()
  ->in([
    __DIR__.'/app',
    __DIR__.'/config',
    __DIR__.'/database',
    __DIR__.'/resources',
    __DIR__.'/tests',
  ])
  ->name('*.php')
  ->notName('*.blade.php')
  ->ignoreDotFiles(true)
  ->ignoreVCS(true)
;

$config = new PhpCsFixer\Config();

return $config->setFinder($finder)
  ->setRules($rules)
  ->setRiskyAllowed(true)
  ->setUsingCache(true)
;
```

### Composer scripts

```json title="composer.json"
{
  "scripts": {
    "post-update-cmd": [
      "@php artisan vendor:publish --tag=laravel-assets --ansi --force",
      "@php artisan optimize:clear",
      "@php artisan ide-helper:generate",
      "@php artisan ide-helper:models --nowrite --reset",
      "php artisan ide-helper:meta",
      "@php artisan ide-helper:eloquent"
    ],
    "helper": [
      "pint",
      "@php artisan ide-helper:generate",
      "@php artisan ide-helper:models --nowrite --reset",
      "php artisan ide-helper:meta",
      "@php artisan ide-helper:eloquent"
    ],
    "format": [
      "pint" // or "php-cs-fixer fix --ansi" with php-cs-fixer
    ],
    "analyse": [
      "phpstan analyse --ansi --memory-limit=4G"
    ],
    "serve": [
      "Composer\\Config::disableProcessTimeout",
      "php artisan serve"
    ],
    "test": [
      "@php artisan test"
    ],
    "test:filter": [
      "@php artisan test --filter"
    ],
    "test:watch": [
      "Composer\\Config::disableProcessTimeout",
      "phpunit-watcher watch"
    ],
    "test:filter:watch": [
      "Composer\\Config::disableProcessTimeout",
      "phpunit-watcher watch --filter"
    ]
  }
}
```

## JavaScript

### ESLint

#### @antfu

```bash
pnpm add -D eslint @antfu/eslint-config
touch .eslintrc ; touch .eslintignore
```

```json title=".eslintrc"
{
  "extends": "@antfu"
}
```

```json title="package.json"
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

#### Custom

```json title=".eslintrc"
{
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "plugins": [],
  "rules": {
    "no-undef": "off",
    "prefer-const": "warn",
    "no-console": [
      "warn",
      {
        "allow": [
          "error",
          "warn"
        ]
      }
    ],
    "no-unused-vars": "warn",
    "vue/multi-word-component-names": "off",
    "vue/first-attribute-linebreak": "warn",
    "vue/no-v-html": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "no-multi-spaces": "warn",
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": true
      }
    ],
    "indent": [
      "error",
      2
    ],
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true
      }
    ],
    "semi": [
      "error",
      "never"
    ],
    "comma-dangle": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "warn",
    "vue/singleline-html-element-content-newline": "off",
    "func-call-spacing": "off",
    "space-before-function-paren": "off",
    "comma-spacing": "warn",
    "arrow-parens": "off",
    "vue/html-closing-bracket-newline": "warn",
    "object-property-newline": "warn",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1
      }
    ],
    "vue/padding-line-between-blocks": "warn",
    "vue/no-template-target-blank": "warn",
    "vue/no-empty-component-block": "warn",
    "vue/no-multi-spaces": "warn",
    "vue/no-irregular-whitespace": "warn",
    "vue/no-empty-pattern": "warn",
    "vue/block-spacing": "warn",
    "padded-blocks": [
      "error",
      "never"
    ]
  }
}
```

### .eslintignore

```bash [.eslintignore]
.nuxt
build
dist
node_modules
public/build
public/dist
vendor
```

## Visual Studio Code

### settings.json

```json title=".vscode/settings.json"
{
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar",
    "editor.formatOnSave": false
  },
  "[ts]": {
    "editor.formatOnSave": false
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  // "prettier.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "js",
    "typescript",
    "vue"
  ]
}
```
