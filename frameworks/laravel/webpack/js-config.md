---
title: JS config
description: Install ESLint, configure jsconfig.json or tsconfig.json.
---

# JS config

{{ $frontmatter.description }}

## CSS & JS compiled

When you use `laravel-mix` to compile assets like `css` and `js`, this will create files into `public`. Add these files to `.gitignore` cause of differences between minified files on local and production.

```sh [.gitignore]
/public/css
/public/js
/public/mix-manifest.json
```

## `jsconfig.json`

If you want to use Vue.js into Laravel with Visual Studio Code, you have to setup `jsconfig.json`

```sh
touch jsconfig.json
```

```json title="jsconfig.json"
{
  "compilerOptions": {
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["resources/js/*"],
      "@Components/*": ["resources/js/Components/*"]
    }
  },
  "exclude": ["node_modules", "public"],
  "vueCompilerOptions": {
    "experimentalDisableTemplateSupport": true
  }
}
```

## ESLint

Useful with ESLint and Vue

```sh
npm i -D eslint eslint-plugin-vue prettier eslint-config-prettier eslint-plugin-prettier babel-eslint
```

Create these files at the root of repository

```sh
touch .eslintrc.js
```

```json title=".eslintrc"
{
  "root": true,
  "env": {
    "node": true,
    "browser": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {},
  "parserOptions": {
    "parser": "babel-eslint"
  }
}
```

```sh
touch .prettierrc
```

```sh [.prettierrc]
{
  "semi": false,
  "singleQuote": true
}
```

```sh [.editorconfig]
[*.{vue,js}]
indent_style = space
indent_size = 2
```

```json title="package.json"
{
  "scripts": {
    "lint": "./node_modules/.bin/eslint resources/js/ --ext .js,.vue"
  }
}
```
