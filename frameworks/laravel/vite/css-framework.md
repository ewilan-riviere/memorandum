---
title: CSS Framework
description: Add a CSS framework like Tailwind CSS or Windi CSS
---

# CSS Framework

{{ $frontmatter.description }}

## Tailwind CSS

From [tailwindcss.com](https://tailwindcss.com/)

Install dependencies and generate config.

```sh
pnpm install tailwindcss postcss autoprefixer -D
npx tailwindcss init -p
```

Add Tailwind CSS to `app.css`.

```css title="resources/front/css/app.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Update config files.

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/**/*.{vue,js,ts,jsx,tsx,php}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```js title="postcss.config.js"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Plugins

You can add Tailwind CSS plugins.

```sh
pnpm add @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio @tailwindcss/line-clamp -D
```

And add it to configuration.

```js title="tailwind.config.js"
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/**/*.{vue,js,ts,jsx,tsx,php}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".debug-screens": {
          '@apply before:bottom-0 before:left-0 before:fixed before:px-1 before:text-sm before:bg-black before:text-white before:shadow-xl before:content-["screen:_"] sm:before:content-["screen:sm"] md:before:content-["screen:md"] lg:before:content-["screen:lg"] xl:before:content-["screen:xl"] 2xl:before:content-["screen:2xl"]':
            {},
          "&:before": {
            "z-index": "2147483647",
          },
        },
      });
    }),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
```

### Add TypeScript

Check [Tailwind CSS: TypeScript](/frameworks/tailwind-windi-css/typescript) if you want TypeScript with Tailwind CSS below v3.1.

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
};
```

## Windi CSS

From [windicss.org](https://windicss.org/)

Add `windicss`.

```sh
pnpm add vite-plugin-windicss windicss -D
```

Create configuration.

```sh
touch windi.config.ts
```

Windi CSS configuration.

```ts title="windi.config.ts"
import { defineConfig } from "windicss/helpers";
import defaultTheme from "windicss/defaultTheme";
import formsPlugin from "windicss/plugin/forms";
import typographyPlugin from "windicss/plugin/typography";
import plugin from "windicss/plugin";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        sm: "360px",
        md: "600px",
        lg: "900px",
        xl: "1300px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
    },
  },
  shortcuts: {
    "debug-screens": {
      "@apply":
        'before:bottom-0 before:left-0 before:fixed before:px-1 before:text-sm before:bg-black before:text-white before:shadow-xl @sm:before:content-["screen:sm"] @md:before:content-["screen:md"] @lg:before:content-["screen:lg"] @xl:before:content-["screen:xl"] @2xl:before:content-["screen:2xl"] <sm:before:content-["screen:_"]',
      "&:before": {
        "z-index": "2147483647",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        ".word-wraping": {
          "text-align": "justify",
          "-webkit-hyphens": "auto",
          "-moz-hyphens": "auto",
          "-ms-hyphens": "auto",
          hyphens: "auto",
        },
        ".word-wrap-break": {
          "word-wrap": "break-word",
        },
        ".max-content": {
          width: "max-content",
        },
      };
      addUtilities(newUtilities);
    }),
    formsPlugin,
    typographyPlugin({
      dark: true,
    }),
  ],
});
```

### Vite plugin

Add `vite-plugin-windicss` to `vite.config.ts` to create `windicssPlugin()`.

```ts title="vite.config.ts"
// ...
import windicss from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export const baseConfig = (entry: string): UserConfigExport => {
  // ...
})

export const windicssPlugin = () =>
  windicss({
    config: '../../windi.config.ts',
    scan: {
      dirs: ['.', '../views', '../components'],
      fileExtensions: ['blade.php', 'vue', 'ts'],
    },
  })
```

Import `windicssPlugin` in app `resources/app/vite.config.ts`.

```ts title="resources/views/vite.config.ts"
// ...
import { windicssPlugin } from "../../vite.config";

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  plugins: [
    // ...
    windicssPlugin(),
  ],
});
```
