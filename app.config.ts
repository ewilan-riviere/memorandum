export default defineAppConfig({
  docus: {
    title: 'Memorandum',
    description: 'The best place to start your documentation.',
    image: 'https://raw.githubusercontent.com/ewilan-riviere/memorandum/main/public/images/default.jpg',
    socials: {
      twitter: 'ewilanriviere',
      github: 'ewilan-riviere/memorandum',
    },
    aside: {
      level: 1,
      collapsed: true,
      exclude: [],
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
    },
    footer: {
      iconLinks: [
        {
          href: 'https://nuxt.com',
          icon: 'simple-icons:nuxtdotjs',
        },
      ],
    },
  },
})
