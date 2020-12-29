---
title: Tips & tricks
description: ''
position: 2
category: 'JavaScript'
---

## VS Code

- [**code.visualstudio.com/docs/languages/javascript**](https://code.visualstudio.com/docs/languages/javascript)

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

## Export modules

Get data from hand...

```js[config-file.js]
module.exports = {
  getData: (param) => {
    // Do something
    return myVar
  }
}
```

...manage data in other hand

```js[use-data.js]
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
async function printFiles () {
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
async function printFiles () {
  const files = await getFilePaths();

  await Promise.all(files.map(async (file) => {
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  }));
}
```

## Manage `Date` and time without plugin

<md-img source="dates.jpg" from="https://elijahmanor.com/blog/format-js-dates-and-times"></md-img>

Source :

- [**developer.mozilla.org/docs/JavaScript/Date**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [**The definitive guide to JavaScript Dates**](https://flaviocopes.com/javascript-dates/)

If we get a SQL DateTime from an API, we have an output like `2020-10-16T08:18:49.000000Z`

```js
function getDate(date) { // the param is raw DateTime from API like 2020-10-16T08:18:49.000000Z
  // convert date to JS Date
  // example here date param is '2020-10-16T08:18:49.000000Z'
  const date = new Date(date)

  // define options
  const userLang = navigator.language || navigator.userLanguage
  const dateOptions = {
    year: 'numeric',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  const hoursOptions = {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  // get Date Time
  // 16/10/2020 à 10:18:49
  const dateTimeLocale = date.toLocaleString()
  console.log(dateTimeLocale)

  // Fri Oct 16 2020 10:18:49 GMT+0200 (heure d’été d’Europe centrale)
  const dateTimeToStringFullLocale = date.toString()
  console.log(dateTimeToStringFullLocale)

  // Fri, 16 Oct 2020 08:18:49 GMT
  const dateTimeToStringFull = date.toUTCString()
  console.log(dateTimeToStringFull)

  // vendredi 16 octobre 2020
  const dateToStringLocale = date.toLocaleString(userLang, dateOptions)
  console.log(dateToStringLocale)

  // 08:18:49
  const timeToString = date.toLocaleString(userLang, hoursOptions)
  console.log(timeToString)

  // 10:18:49
  const timeToStringLocale = date.toLocaleTimeString()
  console.log(timeToStringLocale)
}
```

Check [**developer.mozilla.org/docs/JavaScript/Date**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) to know how to get time with Date methods.

## Shuffle

```js
function shuffle(a) {
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
