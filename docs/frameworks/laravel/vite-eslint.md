---
title: "Vite: ESLint"
description: Add basics for Vite
---

# ESLint

{{ $frontmatter.description }}

## Configuration

You can setup ESLint easily with preset, I offer the amazing `@antfu/eslint-config` from [github.com/antfu/eslint-config](https://github.com/antfu/eslint-config).

```sh
pnpm add -D eslint @antfu/eslint-config
```

```sh
touch .eslintrc
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

## .eslintignore

ESLint will scan every directory in your project, so you can add `.eslintignore` to ignore some directories.

```sh
touch .eslintignore
```

You can check [Configs](/notebook/linters/configs) for example.

## Format on save VSCode

```sh
mkdir .vscode
touch .vscode/settings.json
```

```json title=".vscode/settings.json"
{
  "prettier.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Manual

Add `eslint`.

```sh
pnpm add @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint -D
```

Create configuration.

```sh
touch .eslintrc
```

You can check [Configs](/notebook/linters/configs) for example.
