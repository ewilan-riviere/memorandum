---
title: Errors
description: Errors with Vue
---

## About JSX compiler

```bash
touch jsconfig.json
```

```json title="jsconfig.json"
{
  "compilerOptions": {
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "resources/js/*"
      ],
      "@Components/*": [
        "resources/js/Components/*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "public"
  ],
  "vueCompilerOptions": {
    "experimentalDisableTemplateSupport": true
  }
}
```
