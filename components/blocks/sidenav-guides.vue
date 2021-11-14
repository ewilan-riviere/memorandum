<template>
  <div class="list">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <app-md-img
          :src="`/documentation/logo/${hierarchy.subject}.webp`"
          class="object-cover object-center h-5 w-5 hidden xl:block"
        />
        <div class="sidenav-title xl:ml-2">
          <span class="line-clamp-1">
            {{ $t(hierarchy.subject) }}
          </span>
        </div>
      </div>
      <blocks-sidenav-back
        :to="
          localePath({
            name: 'category-domain-subject',
            params: {
              category: hierarchy.category,
              domain: hierarchy.domain,
              subject: hierarchy.subject,
            },
          })
        "
      />
    </div>
    <ul class="mt-3 mb-4">
      <nuxt-link
        v-for="(guide, id) in guides"
        :key="id"
        :to="localePath(guide.path)"
        class="sidenav-link"
        :class="{
          'sidenav-link-active': guide.slug === current,
        }"
      >
        <div class="sidenav-link__wrapper">
          <span>{{ id + 1 }}.</span>
          <span class="line-clamp-1">{{ guide.title }}</span>
        </div>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidenavGuides',
  props: {
    guides: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      hierarchy: {},
      params: {},
      current: null,
    }
  },
  created() {
    let params = { ...this.$route.params }
    params = params.pathMatch.split('/')
    this.current = params[3]
    this.params = params
    this.hierarchy = {
      category: this.params[0],
      domain: this.params[1],
      subject: this.params[2],
    }
  },
}
</script>
