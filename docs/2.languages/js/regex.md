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
  if (text.length > 80)
    overflow = `${overflow}...`

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
  return new URL(url).hostname
}
```

With REGEX

```js
const getHostnameFromRegex = (url) => {
  // run against regex
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
  // extract hostname (will be null if no match is found)
  return matches && matches[1]
}
```

## Email

From [**4 Ways to Validate an Email with JavaScript**](https://dev.to/gaelgthomas/how-to-validate-an-email-with-javascript-25k3)

```js
function isEmailValid(email) {
  const emailRegexp = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  )

  return emailRegexp.test(email)
}

console.log(isEmailValid('helloitsme@herewecode.io')) // true
console.log(isEmailValid('hello-its-me@herewecode.io')) // true
console.log(isEmailValid('hello.its.me@herewecode.io')) // true
console.log(isEmailValid('helloitsme+test@herewecode.io')) // true
console.log(isEmailValid('.helloitsme@herewecode.io')) // false
console.log(isEmailValid('helloitsme.@herewecode.io')) // false
console.log(isEmailValid('@herewecode.io')) // false
console.log(isEmailValid('helloitsmeherewecode.io')) // false
console.log(isEmailValid('helloitsme@herewecode')) // false
console.log(isEmailValid('d@d.o')) // false
```

## Password

```js
/**
 * \d => at least one digit
 * [a-z] => at least one lower case alpha
 * [A-Z] => at least one upper case alpha
 * \W => at least one special character
 * [a-zA-Z\d\W]{12,} => at least 12 characters with precedent regex
 */
const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])[a-zA-Z\d\W]{12,}$/
if (regex.test(password)) {
  //
}
```
