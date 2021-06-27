module.exports = {
  settings: {
    robots: 'index, follow',
    disallow: [],
    color: '#6C63FF',
    locale: 'en_US',
    lang: 'en',
    googleToken: process.env.GOOGLE_SITE_VERIFICATION_TOKEN,
  },
  tags: {
    title: 'Memorandum, personal development documentation with nuxt/content',
    titleTemplate: '%s · Ewilan Rivière',
    description:
      'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
    rating: 'general',
    keywords: ['documentation', 'markdown', 'technology'],
    author: 'Ewilan Rivière',
    publisher: 'Ewilan Rivière',
    copyright: 'MIT license',
    language: 'english',
    designer: 'Ewilan Rivière',
  },
  og: {
    type: 'website',
    siteName: 'Memorandum, personal development documentation',
  },
  twitter: {
    creator: '@ewilanriviere',
    site: '@ewilanriviere',
    link: 'https://twitter.com/ewilanriviere',
  },
}
