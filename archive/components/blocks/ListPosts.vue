<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div
    class="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
  >
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3"></div>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <div class="text-center">
        <h2
          class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
        >
          From the blog
        </h2>
        <p
          class="max-w-2xl mx-auto mt-3 text-xl leading-7 text-gray-500 sm:mt-4"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero
          labore natus atque, ducimus sed.
        </p>
      </div>
      <div class="grid gap-5 mx-auto mt-12 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="post in posts"
          :key="post.id"
          data-aos="fade-up"
          class="relative transition-colors duration-300 bg-white group hover:bg-gray-100"
        >
          <nuxt-link
            :to="{ name: 'posts-slug', params: { slug: post.slug } }"
            class="flex flex-col h-full overflow-hidden rounded-lg shadow-lg"
          >
            <div
              class="flex-shrink-0 transition-transform duration-300 transform group-hover:scale-105"
            >
              <img
                class="object-cover w-full h-48"
                :src="`/images/posts/covers/${post.image}`"
                :alt="post.title"
              />
            </div>
            <div class="flex flex-col justify-between flex-1 p-6 mt-8">
              <div class="flex-1">
                <div class="block pb-20">
                  <h3
                    class="mt-2 text-xl font-semibold leading-7 text-gray-900"
                  >
                    {{ post.title }}
                  </h3>
                  <p class="mt-3 text-base leading-6 text-gray-500">
                    {{ post.description }}
                  </p>
                </div>
              </div>
            </div>
          </nuxt-link>
          <div class="absolute top-52 left-5">
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
          <nuxt-link
            :to="{
              name: 'authors-slug',
              params: { slug: $slugify(post.author) },
            }"
            class="absolute bottom-5 left-5"
          >
            <div
              class="flex items-center p-3 transition-colors duration-300 rounded-md hover:bg-gray-200"
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
                  <div>
                    {{ post.author }}
                  </div>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListPosts',
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // readingTime(post) {
    //   const WORDS_PER_MINUTE = 200
    //   const result = {} // Matches words
    //   // See
    //   // https://regex101.com/r/q2Kqjg/6    const regex=/\w+/g;
    //   result.wordCount = (post || '').match(/\w+/g).length
    //   result.readingTime = Math.ceil(result.wordCount / WORDS_PER_MINUTE)
    //   return result
    // },
  },
}
</script>

<style lang="postcss">
.zoom {
  transition: transform 0.3s;
}
.zoom:hover {
  transform: scale(1.03);
}
</style>
