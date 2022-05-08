---
title: Tips & tricks
description: ''
position: 2
category: 'JavaScript'
---

## VS Code

- [**code.visualstudio.com/docs/languages/javascript**](https://code.visualstudio.com/docs/languages/javascript)

## Decode / Encode HTML entities

```html
<template>
  <div>
    {{ decodeHTMLEntities('&#9986;') }}
  </div>
</template>

<script setup lang="ts">
const decodeHTMLEntities = (text: string, reverse = false) => {
  let value = ''
  const textArea = document.createElement('textarea')
  if (reverse) {
    textArea.innerText = text
    value = textArea.innerHTML
  } else {
    textArea.innerHTML = text
    value = textArea.value
  }
  
  return value
}
</script>
```

## Export modules

Get data from hand...

```js:config-file.js
module.exports = {
  getData: (param) => {
    // Do something
    return myVar
  }
}
```

...manage data in other hand

```js:use-data.js
const myConfig = require('./config/config-file')

useData() {
 let data = myConfig.getData()
}
```

## `async` in loop

Source : [**stackoverflow.com/questions/using-async-await-with-a-foreach-loop**](https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop) by Bergi

Sure the code does work, but I'm pretty sure it doesn't do what you expect it to do. It just fires off multiple asynchronous calls, but the `printFiles` function does immediately return after that.

### Reading in sequence

If you want to read the files in sequence, **you cannot use `forEach` indeed**. Just use a modern `for … of` loop instead, in which `await` will work as expected:

```js
const printFiles = async () => {
  const files = await getFilePaths();

  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }
}
```

### Reading in parallel

If you want to read the files in parallel, **you cannot use `forEach` indeed**. Each of the `async` callback function calls does return a promise, but you're throwing them away instead of awaiting them. Just use `map` instead, and you can await the array of promises that you'll get with `Promise.all`:

```js
const printFiles = async () => {
  const files = await getFilePaths();

  await Promise.all(files.map(async (file) => {
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  }));
}
```

## Shuffle

```js
const shuffle = (a) => {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  
  return a
}
```

## Replace `switch` with Object Literal

```ts
const getDrink = (type: string) => {
  const drinks = {
    'coke': 'Coke',
    'pepsi': 'Pepsi',
    'lemonade': 'Lemonade',
    'default': 'Default item'
  }

  return drinks[type] || drinks['default']
}

const drink = getDrink('coke')
console.log(drink) // Coke
```
