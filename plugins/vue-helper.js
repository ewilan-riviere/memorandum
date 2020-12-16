import Vue from 'vue'

// slugify text
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/["']/i, '-')
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
}

Vue.prototype.$slugify = slugify

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

Vue.prototype.$shuffle = shuffle

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
// eslint-disable-next-line no-extend-native
Array.prototype.inArray = function (comparer) {
  for (let i = 0; i < this.length; i++) {
    if (comparer(this[i])) return true
  }
  return false
}

// adds an element to the array if it does not already exist using a comparer
// function
// eslint-disable-next-line no-extend-native
Array.prototype.pushIfNotExist = function (element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element)
  }
}

// eslint-disable-next-line no-unused-vars
const langs = {
  en: require('./locales/en.js'),
}

const t = (key) => {
  const translate = {
    ...langs.en,
  }

  return translate[key]
    ? translate[key].label
    : key.charAt(0).toUpperCase() + key.slice(1)
}

Vue.prototype.$t = t

const o = (key) => {
  const translate = {
    ...langs.en,
  }

  return translate[key] || null
}

Vue.prototype.$o = o

const getDate = (date) => {
  let userLang = 'en-US'
  if (process.client) {
    userLang = navigator.language || navigator.userLanguage
  }
  const options = {
    year: 'numeric',
    // weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
  }
  return new Date(date).toLocaleString(userLang, options)
}

Vue.prototype.$getDate = getDate
