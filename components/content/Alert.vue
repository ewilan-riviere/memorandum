<script setup lang="ts">
// interface Props {
//   icon?: string
//   type?: 'info' | 'success' | 'warning' | 'danger' | 'primary'
// }
// const { icon = '', type = 'info' } = defineProps<Props>()
defineProps({
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'info',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary'].includes(value)
    },
  },
})
</script>

<template>
  <!-- <div class="p-4 rounded-md bg-yellow-50">
    <div class="flex">
      <div v-if="icon" class="flex-shrink-0 mr-3">
        <Icon class="w-5 h-5 text-yellow-400" aria-hidden="true" :name="icon" />
      </div>
      <div>
        <h4 class="m-0 text-base font-medium text-yellow-800">
          <Markdown :use="$slots.title" unwrap="div" />
        </h4>
        <div class="mt-2 text-sm text-yellow-700">
          <Markdown :use="$slots.default" unwrap="p" />
        </div>
      </div>
    </div>
  </div> -->
  <div
    class="px-4 py-3 mt-4 mb-4 text-sm leading-relaxed alert rounded-xl"
    :class="[type]"
  >
    <div class="flex items-start">
      <div class="flex-grow alert-content">
        <Markdown unwrap="p" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.alert {
  :deep() {
    strong {
      @apply font-semibold text-current;
    }

    a {
      @apply border-none font-semibold text-current underline;
      code {
        @apply border border-dashed border-transparent;
      }
    }

    .prose-code {
      @apply my-4;

      code {
        @apply bg-transparent;
      }
    }
  }
}

.alert :deep(p) {
  @apply m-0 !important;
}

.dark .alert {
  :deep() {
    a {
      @apply text-current;
    }
  }
}
</style>
