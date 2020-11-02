<template>
  <div>
    <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
    <!-- This component requires Tailwind CSS >= 1.5.1 and @tailwindcss/ui >= 0.4.0 -->
    <div class="bg-white">
      <div class="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mx-auto text-base max-w-prose lg:max-w-none">
          <div
            class="text-base font-semibold leading-6 tracking-wide text-indigo-600 uppercase font-quicksand"
          >
            <div
              class="overflow-hidden text-sm font-medium leading-5 text-white max-h-10"
            >
              <span
                v-for="tag in post.tags"
                :key="tag.id"
                class="inline-flex px-3 py-1 my-1 mr-2 transition-colors duration-300 rounded-full bg-blue-useweb-light hover:bg-blue-useweb-dark"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <h1
            class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 font-quicksand"
          >
            {{ post.title }}
          </h1>
        </div>
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <div class="mb-8 lg:mb-0 lg:row-start-1 lg:col-start-2">
            <svg
              class="absolute top-0 right-0 hidden -mt-20 lg:block"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
              />
            </svg>
            <div
              class="sticky mx-auto text-base top-10 max-w-prose lg:max-w-none"
            >
              <figure>
                <div class="relative pb-7/12 lg:pb-0">
                  <img
                    :src="`/images/posts/covers/${post.image}`"
                    :alt="post.title"
                    width="1184"
                    height="1376"
                    class="absolute inset-0 object-cover object-center w-full h-full rounded-lg shadow-lg lg:static lg:h-auto"
                  />
                </div>
                <figcaption class="flex mt-3 text-sm text-gray-500">
                  <!-- Heroicon name: camera -->
                  <svg
                    class="flex-none w-5 h-5 mr-2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ post.title }}
                </figcaption>
                <div class="my-5 ml-2 text-lg font-bold font-quicksand">
                  <a
                    v-for="(title, titleId) in post.toc"
                    :key="titleId"
                    v-scroll-to="`#title-${$slugify(title.id)}`"
                    class="table my-2 cursor-pointer"
                  >
                    <span
                      :class="{ 'ml-5': title.depth === 3 }"
                      class="transition-colors duration-300 border-b-2 border-opacity-25 hover:bg-opacity-50 border-blue-useweb hover:border-blue-useweb-dark hover:bg-blue-useweb-light"
                    >
                      {{ title.text }}
                    </span>
                  </a>
                </div>
              </figure>
            </div>
          </div>
          <div>
            <div class="mx-auto text-base max-w-prose lg:max-w-none">
              <p
                class="mb-5 text-lg leading-7 text-gray-500 word-wraping font-quicksand"
                lang="fr"
                v-html="post.description"
              ></p>
              <nuxt-link
                :to="{
                  name: 'authors-slug',
                  params: { slug: $slugify(post.author) },
                }"
                class="bottom-5 left-5"
              >
                <div
                  class="flex items-center p-3 transition-colors duration-300 rounded-md hover:bg-gray-200 w-max-content"
                >
                  <div class="flex-shrink-0">
                    <div>
                      <img
                        class="w-10 h-10 rounded-full"
                        :src="`/images/members/${$slugify(post.author)}.jpg`"
                        :alt="post.author"
                      />
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium leading-5 text-gray-900">
                      <div>Par {{ post.author }}</div>
                    </div>
                    <div class="flex text-sm leading-5 text-gray-500">
                      <time :datetime="post.date">
                        {{ $moment(post.date).format('Do MMM YYYY') }}
                      </time>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div
              class="mx-auto prose prose-lg text-gray-500 lg:max-w-none lg:row-start-1 lg:col-start-1"
            >
              <nuxt-content :document="post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Post from '@/components/blocks/Post.vue'
import AppCopyButton from '~/components/global/markdown/AppCopyButton'

export default {
  name: 'PostsSlug',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Post,
  },
  async asyncData({ $content, params }) {
    let post = await $content('posts', params.slug).fetch()
    if (Array.isArray(post)) {
      post = post[0]
    }
    return {
      post,
    }
  },
  mounted() {
    const paragraphs = document.querySelectorAll('p')
    paragraphs.forEach((paragraph) => {
      paragraph.setAttribute('lang', 'fr')
    })
    const titlesH2 = document.querySelectorAll('h2')
    const titlesH3 = document.querySelectorAll('h3')
    titlesH2.forEach((title) => {
      const id = title.getAttribute('id')
      title.setAttribute('id', `title-${this.$slugify(id)}`)
    })
    titlesH3.forEach((title) => {
      const id = title.getAttribute('id')
      title.setAttribute('id', `title-${this.$slugify(id)}`)
    })

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  },
  methods: {
    scrollTo(anchor) {
      return window.scrollTo({
        bottom: document.querySelector(anchor),
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style></style>
