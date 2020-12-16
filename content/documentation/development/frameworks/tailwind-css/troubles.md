---
title: Troubles
description: 'Troubles with Tailwind CSS'
position: 4
category: 'Tailwind CSS'
---

## `value.charCodeAt is not a function`

```bash
Module build failed (from ./node_modules/postcss-loader/src/...):TypeError: value.charCodeAt is not a function
```

If you have an error like this, maybe you tried to upgrade Tailwind from v1 to v2. Try to remove Tailwind plugins which are not compatibles with Tailwind v2 like `@tailwindcss/ui` from `plugins` in `tailwind.config.js`.
