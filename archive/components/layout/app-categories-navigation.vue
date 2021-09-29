<template>
  <nav>
    <ul class="space-y-6">
      <li v-for="(subCategories, categoryKey) in categories" :key="categoryKey">
        <h2 class="text-lg font-semibold title font-quicksand w-max">
          {{ $t(categoryKey) }}
        </h2>
        <ul>
          <li
            v-for="(subCategory, subCategoryName) in subCategories"
            :key="subCategoryName"
          >
            <nuxt-link
              v-if="subCategory[0].hierarchy"
              :to="{
                name: 'category-subcategory-subject',
                params: {
                  category: categoryKey,
                  subcategory: subCategoryName,
                  subject: subCategory[0].hierarchy.subject,
                },
              }"
              class="
                flex
                items-center
                justify-between
                px-2
                py-2
                mt-1
                space-x-2
                text-sm
                font-medium
                leading-5
                text-gray-600
                transition-colors
                duration-100
                ease-in-out
                rounded-md
                group
                hover:text-gray-900 hover:bg-gray-300
                dark:hover:bg-gray-800
                focus:outline-none focus:text-gray-900 focus:bg-gray-200
                dark:focus:bg-gray-700
              "
            >
              <div class="flex items-center space-x-2">
                <svg-icon
                  :name="`nav/${$slugify(subCategoryName)}`"
                  class="w-6 h-6 text-gray-800 dark:text-gray-200"
                />
                <span>{{ $t(subCategoryName) }}</span>
              </div>
              <span
                class="
                  ml-auto
                  inline-block
                  py-0.5
                  px-3
                  text-xs
                  leading-4
                  rounded-full
                  text-gray-600
                  bg-gray-200
                  dark:bg-gray-600
                  dark:group-hover:bg-gray-700
                  dark:text-gray-200
                  group-hover:bg-gray-200
                  group-focus:bg-gray-300
                  transition
                  ease-in-out
                  duration-150
                "
              >
                {{ subCategory.length }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'CategoriesNavigation',
  props: {
    categories: {
      type: Object,
      default: () => {},
    },
    routeParam: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss">
.title::after {
  @apply border-b border-purple-600 mt-1 mb-2 rounded block w-4/5;
  content: ' ';
}
</style>
