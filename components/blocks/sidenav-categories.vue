<template>
  <li>
    <div class="sidenav-title">
      {{ $t(name) }}
    </div>
    <ul class="mt-3 mb-4">
      <nuxt-link
        v-for="(domain, domainName) in domains"
        :key="domainName"
        :to="{
          name: 'category-domain-subject',
          params: {
            category: name,
            domain: domainName,
            subject: domain[0] ? domain[0].hierarchy.subject : '',
          },
        }"
        class="sidenav-link"
      >
        <div class="sidenav-link__wrapper">
          <svg-icon
            :name="`nav/${$slugify(domainName)}`"
            class="w-6 h-6 text-gray-800 dark:text-gray-200"
          />
          <span class="line-clamp-1">{{ $t(domainName) }}</span>
        </div>
        <span class="sidenav-chip">
          {{ domain.length }}
        </span>
      </nuxt-link>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'SidenavCategories',
  props: {
    name: {
      type: String,
      default: '',
    },
    domains: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
