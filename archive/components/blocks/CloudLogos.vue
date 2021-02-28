<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div class="bg-white">
    <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <p
        class="text-base font-semibold leading-6 tracking-wider text-center text-gray-600 uppercase"
      >
        Nous travaillons avec des technologies solides et fiables,<br />alliant
        efficacité et qualité du code
      </p>
      <div
        class="mt-6 grid grid-cols-1 gap-0.5 sm:grid-cols-2 md:grid-cols-3 lg:mt-8"
      >
        <a
          v-for="logo in logos"
          :key="logo.id"
          :href="logo.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-center col-span-1 transition-colors duration-300 bg-gray-100 hover:bg-gray-200"
        >
          <icon
            :name="`tech-${logo.logo}`"
            :size="250"
            class="w-full px-2 py-2 text-gray-400"
            :class="logo.logo"
            svg-class="mx-auto"
          />
          <!-- <img
            class="max-h-12"
            src="https://tailwindui.com/img/logos/transistor-logo.svg"
            alt="Workcation"
          /> -->
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CloudLogos',
  data() {
    return {
      logos: [
        {
          label: 'Laravel',
          logo: 'laravel-text',
          link: 'https://laravel.com/',
        },
        {
          label: 'Vue.js',
          logo: 'vuejs-text',
          link: 'https://vuejs.org/',
        },
        {
          label: 'NuxtJS',
          logo: 'nuxtjs-text',
          link: 'https://nuxtjs.org/',
        },
        {
          label: 'Tailwind CSS',
          logo: 'tailwind-text',
          link: 'https://tailwindcss.com/',
        },
        {
          label: 'Flutter',
          logo: 'flutter-text',
          link: 'https://flutter.dev/',
        },
        {
          label: 'Backpack',
          logo: 'backpack-text',
          link: 'https://backpackforlaravel.com/',
        },
        {
          label: 'CoreUI',
          logo: 'coreui-text',
          link: 'https://coreui.io/',
        },
        {
          label: 'Node.js',
          logo: 'nodejs-text',
          link: 'https://nodejs.org/en/',
        },
        {
          label: 'Java',
          logo: 'java-text',
          link: 'https://www.java.com/fr/',
        },
        // {
        //   label: 'PHP',
        //   logo: 'php-text',
        //   link: 'https://www.php.net/',
        // },
        // {
        //   label: 'Docker',
        //   logo: 'docker-text',
        //   link: 'https://www.docker.com/',
        // },
      ],
    }
  },
}
</script>

<style lang="postcss">
path {
  @apply transition-colors duration-300;
}
/* laravel  */
.laravel-text:hover path {
  color: #ff2d20;
}
/* vuejs  */
.vuejs-text path:nth-child(2) {
  @apply text-gray-500;
}
.vuejs-text:hover path:nth-child(1) {
  color: #41b883;
}
.vuejs-text:hover path:nth-child(2) {
  color: #34495e;
}
.vuejs-text:hover path:nth-child(3) {
  color: #273849;
}
/* nuxtjs */
.nuxtjs-text:hover path:nth-child(1) {
  color: #2f495e;
}
.nuxtjs-text:hover path:nth-child(2) {
  color: #00c58e;
}
.nuxtjs-text:hover path:nth-child(3) {
  color: #00c58e;
}
.nuxtjs-text:hover path:nth-child(4) {
  color: #108775;
}
.nuxtjs-text:hover path:nth-child(5) {
  color: #2f495e;
}
/* tailwind  */
.tailwind-text:hover path:nth-child(1) {
  color: #14b4c6;
}
.tailwind-text:hover path:nth-child(2) {
  color: #000000;
}
/* flutter  */
.flutter-text:hover path:nth-child(1) {
  color: #02539a;
}
.flutter-text:hover path:nth-child(2) {
  color: #45d1fd;
}
.flutter-text:hover path:nth-child(3) {
  color: #45d1fd;
}
.flutter-text:hover path:nth-child(4) {
  color: #6a6a6a;
}
.flutter-text:hover path:nth-child(5) {
  color: #6a6a6a;
}
.flutter-text:hover path:nth-child(6) {
  color: #6a6a6a;
}
.flutter-text:hover path:nth-child(7) {
  color: #6a6a6a;
}
.flutter-text:hover path:nth-child(8) {
  color: #6a6a6a;
}
.flutter-text:hover path:nth-child(9) {
  color: #6a6a6a;
}
.flutter-text:hover path:nth-child(10) {
  color: #6a6a6a;
}
/* backapck  */
.backpack-text:hover path:nth-child(1) {
  color: #506690;
}
.backpack-text:hover path:nth-child(2) {
  color: #7c69ef;
}
.backpack-text:hover path:nth-child(3) {
  color: #506690;
}
.coreui-text:hover path {
  color: black;
}
.docker-text:hover path {
  color: #0091e2;
}
.nodejs-text:hover path:nth-child(1) {
  color: #539e43;
}
.nodejs-text:hover path:nth-child(2) {
  color: #333333;
}
.nodejs-text:hover path:nth-child(3) {
  color: #539e43;
}
.nodejs-text:hover path:nth-child(4) {
  color: #539e43;
}

.java-text:hover path:nth-child(-n + 4) {
  color: #ed1e24;
}
.java-text:hover path:nth-child(5) {
  color: #ed1e24;
}
.java-text:hover path:nth-child(6) {
  color: #3c8ace;
}
.java-text:hover path:nth-child(7) {
  color: #ed1e24;
}
.java-text:hover path:nth-child(n + 8) {
  color: #3c8ace;
}
</style>
