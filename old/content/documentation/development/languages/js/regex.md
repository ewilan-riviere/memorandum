---
title: REGEX
description: 'Examples of REGEX'
position: 2
category: 'REGEX'
---

## Slugify

```js
function slugify(text) {
  if (text !== null && text !== undefined) {
    return text
    .toString()
    .toLowerCase()
    .replace(/["']/i, '-')
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
  }
}
```

## Overflow text

```js
const overflow = (text) => {
  let overflow = text.replace(/^(.{80}[^\s]*).*/, '$1')
  if (text.length > 80) {
    overflow = `${overflow}...`
  }
  return overflow
}
```

## Git repository

[**stackoverflow.com/questions/regular-expression-for-git-repository**](https://stackoverflow.com/questions/2514859/regular-expression-for-git-repository/22312124)

## With URL

### Remove `http://`

```js
let url = 'https://www.google.com'
url = url.replace(/(^\w+:|^)\/\//, '') // www.google.com
```

### Get domain

With URL object

```js
const getHostname = (url) => {
  // use URL constructor and return hostname
  return new URL(url).hostname;
}
```

With REGEX

```js
const getHostnameFromRegex = (url) => {
  // run against regex
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  // extract hostname (will be null if no match is found)
  return matches && matches[1];
}
```
