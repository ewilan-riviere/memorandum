---
title: AlpineJS
---

# AlpineJS

```sh
pnpm add @types/alpinejs -D
```

```sh
cat > global.d.ts << EOF
/// <reference types="vite/client" />

import type { Axios } from 'axios'
import type { Alpine } from 'alpinejs'

declare global {
  interface Window {
    axios: Axios
    Alpine: Alpine
  }
}

window.axios = window.axios || {}
window.Alpine = window.Alpine || {}

export {}
EOF
```

In `resources/js/app.ts`:

```ts [resources/js/app.ts]
import "./bootstrap";
import type { Alpine as AlpineTS } from "alpinejs";
import {
  Alpine,
  Livewire,
} from "../../vendor/livewire/livewire/dist/livewire.esm";

import dataModule from "./modules/data-module";
import storeModule from "./modules/store-module";

const alpineTs: AlpineTS = Alpine;
alpineTs.data("dataModule", dataModule);
alpineTs.store("storeModule", storeModule);

Livewire.start();
```

### AlpineJS data and store

```ts [resources/js/data-module.ts]
import type { AlpineComponent } from "alpinejs";

function dataModule(): AlpineComponent<{
  anyVariable: boolean;
  anyMethod(url: string | undefined): Promise<boolean>;
}> {
  return {
    anyVariable: false,
    async anyMethod(src?: string): Promise<boolean> {
      // ...
    },
  };
}

export default dataModule;
```

```ts [resources/js/store-module.ts]
const sidebar = {
  anyVariable: false,
  anyMethod() {
    // ...
  },
};

export default storeModule;
```
