<template>
  <div>
    <div v-for="librairy in librairies" :key="librairy.id" class="h-36">
      <a
        :href="librairy.link"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full h-full max-w-sm my-5 font-normal transition-all duration-300 rounded-md shadow-md lg:max-w-full lg:flex"
      >
        <div
          class="flex-none h-full overflow-hidden text-center bg-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
          :style="`background-image: url(/${path}/${librairy.id}.webp)`"
          title="Woman holding a mug"
        ></div>
        <div
          class="flex flex-col justify-between w-full h-full p-4 overflow-y-auto leading-normal bg-white rounded-b lg:rounded-b-none lg:rounded-r"
        >
          <div>
            <div class="flex items-center mb-2 text-sm text-gray-600">
              <span v-if="librairy.love">❤️</span>
              <span v-if="librairy.pay">💰</span>
              <span v-if="librairy.medal">🏅</span>
            </div>
            <div class="mb-2 text-xl font-bold text-gray-900">
              {{ librairy.title }}
            </div>
            <div class="text-base italic text-gray-400 word-wraping" lang="en">
              {{ librairy.desc }}
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TailwindLibrairies',
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: 'No informations',
    },
    love: {
      type: Boolean,
      default: false,
    },
    pay: {
      type: Boolean,
      default: false,
    },
    medal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      path: null,
      librairies: [
        {
          id: 'awesome-tailwind-css',
          title: 'Awesome Tailwind CSS',
          link: 'https://github.com/aniftyco/awesome-tailwindcss',
          medal: true,
          desc: 'GitHub Awesome!',
        },
        {
          id: 'tailwind-ui',
          title: 'Tailwind UI',
          link: 'https://tailwindui.com/components',
          medal: true,
          pay: true,
          desc:
            'Official Tailwind UI, need to pay but amazing layouts and components.',
        },
        {
          id: 'tailblocks',
          title: 'Tailblocks',
          link: 'https://mertjf.github.io/tailblocks',
          medal: true,
          desc: 'Amazing collection of components.',
        },
        {
          id: 'meraki-ui',
          title: 'MerakiUI',
          link: 'https://merakiui.com',
          desc: 'Some beautiful components.',
        },
        {
          id: 'headless-ui',
          title: 'Headless UI',
          link: 'https://headlessui.dev',
          medal: true,
          desc: 'From Tailwind Labs, some React/Vue components.',
        },
        {
          id: 'tailwind-toolbox',
          title: 'Tailwind Toolbox',
          link: 'https://www.tailwindtoolbox.com',
          desc: 'Some templates and some components.',
        },
        {
          id: 'tailwind-templates',
          title: 'Tailwind Templates',
          pay: true,
          medal: true,
          link: 'https://www.creative-tim.com/templates/tailwind',
          desc: 'Beautiful templates by Creative Tim',
        },
      ],
    }
  },
  mounted() {
    this.getPath()
  },
  methods: {
    getPath() {
      let path = this.$route.fullPath.split('/')
      path.splice(0, 1)
      path = path.join('/')
      this.path = path
    },
  },
}
</script>

<style lang="postcss" scoped>
section {
  all: revert;
}
a {
  @apply transition-all duration-300 !important;
  border: none !important;
  @apply shadow-sm !important;
  &:hover {
    @apply bg-transparent border-none !important;
    @apply shadow-md !important;
  }
}
</style>
