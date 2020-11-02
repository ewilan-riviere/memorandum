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
