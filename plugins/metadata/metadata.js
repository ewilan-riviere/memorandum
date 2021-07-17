const app = 'Memorandum, personal development documentation with nuxt/content'
const author = 'Ewilan Rivière'
const tailwind = require('../../tailwind.config')
const color = tailwind.theme.extend.colors.primary[600]
const description =
  'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.'

module.exports = {
  settings: {
    robots: 'index, follow',
    disallow: '/sign-in,/sign-up,/dashboard,/admin,/profile',
    color,
    locale: 'en_US',
    lang: 'en',
    googleToken: process.env.GOOGLE_SITE_VERIFICATION_TOKEN,
  },
  tags: {
    title: app,
    titleTemplate: `%s · ${author}`,
    description,
    rating: 'general',
    keywords: ['documentation', 'markdown', 'technology'],
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
    creator: '@ewilanriviere',
    site: '@ewilanriviere',
    link: 'https://twitter.com/ewilanriviere',
  },
}
