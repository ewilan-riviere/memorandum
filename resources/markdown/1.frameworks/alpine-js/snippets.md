---
title: Snippets
description: Same snippets to use with AlpineJS
---

## Alpine Data

```ts [ts/dropdown.ts]
const dropdown = () => ({
  open: false,

  toggle() {
    this.open = !this.open
  },
})

export default dropdown
```

Import it into `app.ts`

```ts [app.ts]
import dropdown from './ts/dropdown'

Alpine.data('dropdown', dropdown)
```

In any HTML file

```html
<div x-data="dropdown">
  <button @click="toggle">
    Open
  </button>
 
  <div x-show="open">
    About
  </div>
</div>
```

## Alpine Store

```ts [ts/item-store.ts]
const itemStore = {
  items: [] as Item[],

  add(item: Item) {
    //
  },
  remove(id: number) {
    //
  },
}

export default itemStore
```

Import it into `app.ts`

```ts [app.ts]
import itemStore from './ts/item-store'

Alpine.store('itemStore', itemStore)
```

In any HTML file

```html
<div x-data>
  <ul>
    <template x-for="item in $store.itemStore.items" :key="item.id">
      <li x-text="item.text"></li>
    </template>
  </ul>
</div>
```
