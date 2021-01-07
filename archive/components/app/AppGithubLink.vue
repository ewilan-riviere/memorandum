<template>
  <div v-if="link" class="flex pt-4 pb-4 lg:px-8">
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline"
    >
      {{ 'article.github' }}
      <IconExternalLink class="w-4 h-4 ml-1" />
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['settings', 'githubUrls', 'lastRelease']),
    link() {
      if (!this.settings.github) {
        return
      }

      return [
        this.githubUrls.repo,
        'edit',
        this.settings.defaultBranch,
        this.settings.defaultDir,
        `content${this.document.path}${this.document.extension}`,
      ]
        .filter((path) => !!path)
        .join('/')
    },
  },
}
</script>
