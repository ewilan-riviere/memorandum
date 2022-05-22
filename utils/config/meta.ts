const link = [
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    href: '/apple-touch-icon.png',
  },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
  {
    rel: 'manifest',
    crossorigin: 'use-credentials',
    href: '/site.webmanifest',
  },
]
const meta = [
  {
    hid: 'robots',
    name: 'robots',
    content: 'index, follow',
  },
  { name: 'msapplication-TileColor', content: '#6c63ff' },
  { name: 'theme-color', content: '#6c63ff' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  {
    hid: 'author',
    name: 'author',
    content: 'Ewilan Rivière',
  },
  {
    hid: 'language',
    name: 'language',
    content: 'en_US',
  },
  {
    hid: 'designer',
    name: 'designer',
    content: 'Ewilan Rivière',
  },
  {
    hid: 'publisher',
    name: 'publisher',
    content: 'Memorandum',
  },
  {
    hid: 'copyright',
    name: 'copyright',
    content: 'MIT',
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Memorandum',
  },
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'en_US',
  },
  {
    hid: 'twitter:url',
    name: 'twitter:url',
    content: '@ewilanriviere',
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@ewilanriviere',
  },
  {
    hid: 'google-site-verification',
    name: 'google-site-verification',
    content: process.env.GOOGLE_SITE_VERIFICATION_TOKEN,
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: process.env.BASE_URL,
  },
  {
    hid: 'og:image:alt',
    property: 'og:image:alt',
    content: 'Memorandum',
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image',
  },
]
const script: any[] = []

export default { link, meta, script }
