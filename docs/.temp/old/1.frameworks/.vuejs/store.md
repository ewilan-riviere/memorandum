---
title: Store
description: ''
position: 2
category: 'Vue.js'
---

## Concept

Store is useful to stock some variables globally and we can access to them from entire app. For exemple, we can stock API result during 1 hour or set sidebar status. Store is very usefull and, in some case, it's necessary to use it.

## Example

```js title="store/index.js"
export const state = () => ({
  sidebarOpened: false,
  layerVisible: false,
})

export const mutations = {
  toggleSidebar(state, data) {
    state.sidebarOpened = !state.sidebarOpened
  },
  setLayerVisible(state, data) {
    state.layerVisible = data
  },
}
```

```vue title="src/components/MyComponent.vue"
<template>
    <button @click="toggleSidebar">
        Open sidebar
    </button>
    <button @click="updateLayer(true)">
        Update layer
    </button>
    <div v-if="$store.state.sidebarOpened">
        Hello World!
    </div>
    <div v-if="$store.state.layerVisible">
        Hello World?
    </div>
</template>

<script>
export default {
    methods: {
        toggleSidebar() {
            this.$store.commit('toggleSidebar')
        },
        updateLayer(bool) {
            this.$store.commit('setLayerVisible', bool)
        }
    }
}
</script>
```
