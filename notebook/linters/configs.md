---
title: Configs
---

# Configs

## Laravel

### Pint

- For <https://laravel.com/docs/10.x/pint>
- VSCode extension: <https://marketplace.visualstudio.com/items?itemName=open-southeners.laravel-pint>

::: details Pint config

```json [pint.json]
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
      "tokens": ["extra", "throw", "use"]
    },
    "no_unused_imports": true,
    "not_operator_with_successor_space": true,
    "ordered_imports": {
      "imports_order": ["class", "function", "const"],
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

:::

### PHP CS Fixer

- For <https://github.com/PHP-CS-Fixer/PHP-CS-Fixer>
- VSCode extension: <https://marketplace.visualstudio.com/items?itemName=junstyle.php-cs-fixer>

::: details PHP CS Fixer config

```php [.php-cs-fixer.dist.php]
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

:::

### Composer scripts

```json title="composer.json"
{
  "scripts": {
    "post-update-cmd": [
      "@php artisan vendor:publish --tag=laravel-assets --ansi --force",
      "@php artisan optimize:clear"
    ],
    "helper": [
      "@php artisan ide-helper:generate",
      "@php artisan ide-helper:models --nowrite --reset",
      "php artisan ide-helper:meta",
      "@php artisan ide-helper:eloquent"
    ],
    "format-pint": ["pint"],
    "format-cs-fixer": ["php-cs-fixer fix --ansi"],
    "analyse": ["phpstan analyse --ansi --memory-limit=4G"],
    "serve": ["Composer\\Config::disableProcessTimeout", "php artisan serve"],
    "test": ["@php artisan test"],
    "test:filter": ["@php artisan test --filter"],
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

```sh
pnpm add -D eslint @antfu/eslint-config typescript
touch .eslintrc ; touch .eslintignore
```

```json [.eslintrc]
{
  "extends": "@antfu"
}
```

```json [package.json]
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```
