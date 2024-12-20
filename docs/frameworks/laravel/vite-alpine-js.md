---
title: "Vite: Alpine JS"
description: Add Alpine JS with TypeScript
---

# Alpine JS

{{ $frontmatter.description }}

From [alpinejs.dev](https://alpinejs.dev)

## Install `alpinejs`

```sh
pnpm add @types/alpinejs alpinejs -D
```

```ts title="resources/front/global.d.ts"
import type { Alpine as AlpineType } from "alpinejs";

/**
 * From https://bobbyhadz.com/blog/typescript-make-types-global
 */
declare global {
  const Alpine: AlpineType;
  interface Window {
    Alpine: AlpineType;
  }
}

export {};
```

```ts title="resources/front/ts/app.ts"
import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();
```

In app `vite.config.ts`.

```ts title="vite.config.ts"
export default defineConfig({
  // ...
  optimizeDeps: {
    include: ["alpinejs"],
  },
});
```

## Modules

```sh
mkdir resources/front/ts/modules
```

### AlpineJS store example

```sh
touch resources/front/ts/store-example.ts
```

Add to `app.ts`

```ts title="resources/front/ts/app.ts"
// ...

window.Alpine = Alpine;

Alpine.store("shop", {
  name: "Alpine-Shop",
  products: ["Swiss Alp Chocolate", "Car Alpine A110"],
});

Alpine.start();
```

In any Blade file.

```html
<div x-data>
  <div x-text="$store.shop.name">shop-name</div>
  <div>
    Here you can buy:
    <ul>
      <template x-for="product in $store.shop.products">
        <li x-text="product"></li>
      </template>
    </ul>
  </div>
</div>
```

### AlpineJS data example

```sh
touch resources/front/ts/data-example.ts
```

```ts title="resources/front/ts/data-module.ts"
let refsAlpine: {
  text: HTMLElement;
};

const copy = () => ({
  copied: false,

  init() {
    // @ts-expect-error
    refsAlpine = this.$refs;
  },
  async copyText() {
    this.copied = true;
    let success = false;
    if (refsAlpine.text.textContent)
      await navigator.clipboard
        .writeText(refsAlpine.text.textContent)
        .then(() => (success = true));

    if (!success) console.error("Error on copy!");

    setTimeout(() => {
      this.copied = false;
    }, 3500);
  },
});

export default copy;
```

In `app.ts`

```ts title="resources/front/ts/app.ts"
// ...

window.Alpine = Alpine;

Alpine.data("copy", copy);

Alpine.start();
```

### Custom module

```sh
touch resources/front/ts/custom-module.ts
```

```ts title="resources/front/ts/custom-module.ts"
export const customModule = () => {
  const customModule = "customModule";
  console.log(customModule);
};
```

In `app.ts`

```ts title="resources/front/ts/app.ts"
import Alpine from "alpinejs";
import { customModule } from "~/app/ts/custom-module";

customModule();

window.Alpine = Alpine;
```

## Boiler plate modules

### Color mode

```sh
touch public/color-mode.js
```

```js title="public/color-mode.js"
const colorScheme = localStorage.getItem("color-scheme");

if (colorScheme) document.documentElement.classList.toggle(colorScheme, true);
else {
  const system =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  document.documentElement.classList.toggle(system, true);
}
```

```sh
touch resources/front/ts/modules/color-mode.ts
```

```ts title="resources/front/ts/modules/color-mode.ts"
type Mode = "light" | "dark";
interface ModeElement {
  label: string;
  key: string;
}

const colorMode = () => ({
  mode: "light" as Mode,
  list: [
    {
      label: "Light",
      key: "light",
    },
    {
      label: "Dark",
      key: "dark",
    },
  ] as ModeElement[],
  key: "color-scheme",

  init() {
    this.setMode();
  },
  switchMode(mode: Mode) {
    const body = document.documentElement;
    this.list.forEach((element) => {
      body.classList.remove(element.key);
    });
    body.classList.add(mode);

    localStorage.setItem(this.key, mode);
    this.setMode(mode);
  },
  setMode(mode?: Mode) {
    const currentMode = localStorage.getItem(this.key);
    if (currentMode) {
      this.mode = currentMode as Mode;
    }
    if (mode === "light") {
      this.mode = "light";
    }
  },
});

export default colorMode;
```

```ts title="resources/front/ts/app.ts"
import colorMode from "./modules/color-mode";

window.Alpine = Alpine;

Alpine.data("colorMode", colorMode);

Alpine.start();
```

```sh
touch resources/views/components/color-mode.blade.php
```

```html title="resources/views/components/color-mode.blade.php"
<div x-data="colorMode">
  <ul class="w-full space-y-1">
    <template x-for="element in list">
      <button
        type="button"
        x-text="element.label"
        :class="[mode === element.key ? 'bg-gray-100 dark:bg-gray-800' : '',
            'block w-full rounded-md px-2 py-1 text-left hover:bg-gray-100 dark:hover:bg-gray-800'
          ]"
        @click="switchMode(element.key)"
      ></button>
    </template>
  </ul>
</div>
```
