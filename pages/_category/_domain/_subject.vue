<template>
  <layout-page :entities="subjects" type="subjects">
    <template #document>
      <div class="py-4 lg:pt-8 lg:pb-8 lg:px-8">
        <div>
          <div class="flex items-center">
            <app-md-img
              class="object-contain w-6 h-6"
              :src="`/documentation/logo/${$route.params.subject}.webp`"
              title=""
            />
            <div
              class="
                inline-block
                text-2xl
                font-semibold font-quicksand
                after:w-4/5
                after:block
                after:border-b-2
                after:border-primary-400
                after:rounded-md
                ml-2
              "
            >
              {{ $t($route.params.subject) }}
            </div>
          </div>
          <div class="mt-3">
            <p
              v-if="subject.description"
              class="max-w-full italic hyphenate text-gray-400"
            >
              {{ subject.description }}
            </p>
            <div
              v-if="subject.url"
              class="flex items-center mt-2 ml-auto w-max"
            >
              More information:
              <a
                :href="subject.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block ml-1 underline hover:text-gray-400"
              >
                {{ getDomain(subject.url) }}
              </a>
            </div>
          </div>
        </div>
        <blocks-guides-list :guides="guides" class="mt-6" />
      </div>
    </template>
    <template #toc>
      <!-- <app-toc :toc="welcome.toc" /> -->
    </template>
  </layout-page>
</template>

<script>
import { groupBy } from 'lodash'
export default {
  name: 'PageCategoryDomainSubject',
  async asyncData({ $content, params }) {
    const [guidesData, categoriesData] = await Promise.all([
      $content(`/${params.category}/${params.domain}/${params.subject}`, {
        deep: true,
      })
        .only([
          'title',
          'description',
          'path',
          'readingTime',
          'createdAt',
          'updatedAt',
          'position',
        ])
        .sortBy('position')
        .fetch(),
      $content(`/${params.category}/${params.domain}`, {
        deep: true,
      })
        .only(['title', 'path', 'hierarchy'])
        .fetch(),
    ])

    const newCategories = groupBy(categoriesData, 'hierarchy.subject')
    const categoriesOrdered = Object.keys(newCategories)
      .sort()
      .reduce((obj, key) => {
        obj[key] = newCategories[key]
        return obj
      }, {})
    const guides = guidesData
    const subjects = categoriesOrdered

    return {
      guides,
      subjects,
    }
  },
  data() {
    return {
      subject: {},
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const meta = require('@/plugins/config/metadata')
    const title = `${this.$t(this.$route.params.subject)} in ${this.$t(
      this.$route.params.domain
    )}`
    return {
      title,
      meta: [
        ...dynamicMetadata(
          {
            title,
            description: this.subject.description || meta.settings.description,
            url: this.$nuxt.$route.path,
          },
          this.$config.baseURL
        ),
      ],
    }
  },
  created() {
    this.subject = this.$getEntity(this.$route.params.subject)
  },
  methods: {
    getDomain(url) {
      const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
      return matches && matches[1]
    },
  },
}
</script>
