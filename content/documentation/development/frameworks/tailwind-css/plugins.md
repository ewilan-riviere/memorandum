---
title: Plugins
description: 'Plugins for Tailwind'
position: 4
category: 'Tailwind CSS'
---

## Official

- [**Tailwind Typography**](https://github.com/tailwindlabs/tailwindcss-typography)
- [**@tailwindcss/aspect-ratio**](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)
- [**@tailwindcss/forms**](https://github.com/tailwindlabs/tailwindcss-forms)

```bash
yarn add @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio
```

```js[tailwind.config.js]
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
```
