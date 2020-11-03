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
