# Introduction

## Decode / Encode HTML entities

```vue
<template>
  <div>
    {{ decodeHTMLEntities('&#9986;') }}
  </div>
</template>

<script>
export default {
  methods: {
    decodeHTMLEntities(text) {
      var textArea = document.createElement('textarea')
      textArea.innerHTML = text
      return textArea.value
    },
    encodeHTMLEntities(text) {
      var textArea = document.createElement('textarea')
      textArea.innerText = text
      return textArea.innerHTML
    },
  },
}
</script>
```
