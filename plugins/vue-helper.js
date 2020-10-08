import Vue from 'vue'

import { statusTranslations } from '~/static/utils/team'

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

const formatUser = (user) => {
  // id
  const id = `${slugify(user.name.firstname)}-${slugify(user.name.lastname)}`
  // photo
  let photo = null
  try {
    photo = require(`~/static/images/members/${id}.jpg`)
  } catch (error) {
    photo = `https://eu.ui-avatars.com/api/?size=256&name=${user.name.firstname}+${user.name.lastname}`
  }
  user.photo = photo
  // status
  user.status =
    statusTranslations[user.profile.type][
      user.profile.status ? user.profile.status : 'base'
    ][user.gender]

  // name
  user.nameComplete = `${user.name.firstname} ${user.name.lastname}`

  return user
}

Vue.prototype.$formatUser = formatUser
