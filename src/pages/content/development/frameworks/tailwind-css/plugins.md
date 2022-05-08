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
- [**@tailwindcss/line-clamp**](https://github.com/tailwindlabs/tailwindcss-line-clamp)
- [**Tailwind CSS Debug Screens**](https://github.com/jorenvanhee/tailwindcss-debug-screens)
- [**Tailwind Scrollbar**](https://www.npmjs.com/package/tailwind-scrollbar)

<content-code-group>
  <content-code-block label="Yarn" active>

  ```bash
  yarn add @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio @tailwindcss/line-clamp
  yarn add -D tailwindcss-debug-screens tailwind-scrollbar
  ```

  </content-code-block>
  <content-code-block label="NPM">

  ```bash
  npm i @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio @tailwindcss/line-clamp
  npm i --save-dev tailwindcss-debug-screens tailwind-scrollbar
  ```

  </content-code-block>
</content-code-group>

```js[tailwind.config.js]
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-debug-screens'),
    require('tailwind-scrollbar'),
  ]
}
```

### @tailwindcss/forms

A plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.

### @tailwindcss/typography

A plugin that provides a set of `prose` classes you can use to add beautiful typographic defaults to any vanilla HTML you don't control (like HTML rendered from Markdown, or pulled from a CMS).

```html
<article class="prose lg:prose-xl">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread with cheese to their
    children, with the food earning such an iconic status in our culture that kids will often dress
    up as warm, cheesy loaf for Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
    springing up around the country.
  </p>
</article>
```

### @tailwindcss/aspect-ratio

A plugin that provides a composable API for giving elements a fixed aspect ratio.

```html
<div class="aspect-w-16 aspect-h-9">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

### @tailwindcss/line-clamp

A plugin that provides utilities for visually truncating text after a fixed number of lines.

```html
<p class="line-clamp-3">
  Et molestiae hic earum repellat aliquid est doloribus delectus. Enim illum odio porro ut omnis dolor debitis natus. Voluptas possimus deserunt sit delectus est saepe nihil. Qui voluptate possimus et quia. Eligendi voluptas voluptas dolor cum. Rerum est quos quos id ut molestiae fugit.
</p>
```

### Tailwind CSS Debug Screens

A Tailwind CSS component that shows the currently active screen (responsive breakpoint).

```vue[layouts/default.vue]
<template>
  <div :class="{ 'debug-screens': devMode }">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      devMode: process.env.NODE_ENV !== 'production',
    }
  },
}
</script>
```
