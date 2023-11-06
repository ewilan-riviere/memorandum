export default defineAppConfig({
  docus: {
    title: 'Memorandum',
    description: 'The best place to start your documentation.',
    image: 'https://raw.githubusercontent.com/ewilan-riviere/memorandum/main/public/images/default.jpg',
    socials: {
      twitter: 'ewilanriviere',
      github: 'ewilan-riviere/memorandum',
      nuxt: {
        label: 'Nuxt',
        icon: 'simple-icons:nuxtdotjs',
        href: 'https://nuxt.com',
      },
    },
    github: {
      dir: '',
      branch: 'main',
      repo: 'memorandum',
      owner: 'ewilan-riviere',
      edit: true,
    },
    aside: {
      level: 1,
      collapsed: true,
      exclude: [],
    },
    main: {
      padded: true,
      fluid: true,
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
    },
  },
})
