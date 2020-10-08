<template>
  <div>
    <list-posts :posts="posts"></list-posts>
  </div>
</template>

<script>
import ListPosts from '@/components/blocks/ListPosts.vue'
export default {
  name: 'PostsIndex',
  components: {
    ListPosts,
  },
  async asyncData({ $content, params }) {
    const posts = await $content('posts', { deep: true })
      .only(['title', 'description', 'image', 'slug', 'author', 'date', 'tags'])
      .sortBy('date', 'desc')
      .fetch()

    return {
      posts,
    }
  },
}
</script>
