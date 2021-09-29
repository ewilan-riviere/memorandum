const app = 'Memorandum, personal development documentation with nuxt/content'
const author = 'Ewilan Rivière'
const tailwind = require('../../tailwind.config')
const color = tailwind.theme.extend.colors.primary[600]
const description =
  'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.'

const twitter = '@ewilanriviere'
const twitterLink = twitter ? twitter.replace('@', '') : null

module.exports = {
  settings: {
    robots: process.env.META_ROBOT || 'index, follow',
    disallow: '',
    color,
    locale: 'en_US',
    lang: 'en',
    googleToken: process.env.GOOGLE_SITE_VERIFICATION_TOKEN || null,
  },
  website: {
    title: 'Memorandum',
    titleTemplate: `%s · ${app}`,
    description,
    rating: 'general',
    keywords: ['epub', 'book', 'ebook'],
    author,
    publisher: app,
    copyright: 'MIT License',
    language: 'english',
    designer: author,
  },
  og: {
    type: 'website',
    siteName: app,
  },
  twitter: {
    creator: twitter,
    site: twitter,
    url: `https://twitter.com/${twitterLink}`,
  },
}
