---
title: Date & Time
description: 'How to manage Date and Time'
position: 3
category: 'JavaScript'
---

<!-- <content-image source="dates.jpg" from="https://elijahmanor.com/blog/format-js-dates-and-times"></content-image> -->

Source :

- [**developer.mozilla.org/docs/JavaScript/Date**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [**The definitive guide to JavaScript Dates**](https://flaviocopes.com/javascript-dates/)

If we get a SQL DateTime from an API, we have an output like `2020-10-16T08:18:49.000000Z`

```js
const getDate = (date) => { // the param is raw DateTime from API like 2020-10-16T08:18:49.000000Z
  // convert date to JS Date
  // example here date param is '2020-10-16T08:18:49.000000Z'
  date = new Date(date)

  // define options
  let userLang = 'en'
  // for Nuxt
  if (process.client)
    userLang = navigator.language || navigator.userLanguage

  // for vanilla js
  userLang = navigator.language || navigator.userLanguage

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const dateOptions = {
    year: 'numeric',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  const hoursOptions = {
    // timeZone: 'UTC',
    timeZone,
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
