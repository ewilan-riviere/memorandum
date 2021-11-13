<template>
  <li>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <svg-icon
          :name="`nav/${$route.params.domain}`"
          class="w-5 h-5 text-gray-200 hidden xl:block"
        />
        <span class="xl:ml-2 sidenav-title">
          <div class="line-clamp-1">
            {{ $t($route.params.domain) }}
          </div>
        </span>
      </div>
      <blocks-sidenav-back :to="{ name: 'index' }" />
    </div>
    <ul class="mt-2">
      <nuxt-link
        v-for="(subject, name) in subjects"
        :key="subject.id"
        :to="{
          name: 'category-domain-subject',
          params: {
            category: $route.params.category,
            domain: $route.params.domain,
            subject: name,
          },
        }"
        class="sidenav-link"
        :class="{
          'sidenav-link-active': name === $route.params.subject,
        }"
      >
        <div class="sidenav-link__wrapper">
          <app-md-img
            class="object-contain w-6 h-6"
            :src="`/documentation/logo/${name}.webp`"
            title=""
          />
          <span class="line-clamp-1">{{ $t(name) }}</span>
        </div>
        <span class="sidenav-chip">
          {{ subjects[name].length }}
        </span>
      </nuxt-link>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'SidenavSubjects',
  props: {
    subjects: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
