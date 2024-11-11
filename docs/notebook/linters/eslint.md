---
title: ESLint
description: ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
---

# ESLint

{{ $frontmatter.description }}

## @antfu

Antfu is a developer who created a configuration for ESLint, available [here](https://github.com/antfu/eslint-config).

::: code-group

```sh [Typescript]
pnpm i -D eslint @antfu/eslint-config typescript
```

```sh [JavaScript]
pnpm i -D eslint @antfu/eslint-config
```

:::

### Create `eslint.config.mjs`

```sh
echo "import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: true,
  ignores: [
    //
  ],
}, {
  rules: {
    'no-console': 'warn',
  },
})" > eslint.config.mjs
```

### VSCode only: Create `.vscode/settings.json`

```sh
mkdir -p .vscode
echo '{
  "eslint.useFlatConfig": true,
  "[markdown]": {
    "editor.formatOnSave": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}' > .vscode/settings.json
```

### Add scripts to `package.json`

Add the following scripts to `package.json`:

```sh
jq '.scripts["lint"] = "eslint ." | .scripts["lint:fix"] = "eslint . --fix"' package.json > tmp.json && mv tmp.json package.json
```

Now `package.json` should look like this:

```json
{
  "scripts": {
    // ...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Run ESLint

```sh
pnpm lint
```

If you want to fix the issues automatically, run:

```sh
pnpm run lint:fix
```
