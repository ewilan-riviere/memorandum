<template>
  <div>
    <div v-for="(item, i) in items" :key="i" class="flex mt-3">
      <span :class="`list-${type}`" class="flex-shrink-0 mt-px mr-3">
        <svg-icon :name="`md/${iconName}`" class="w-6 h-6" />
      </span>
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'info', 'success', 'warning', 'danger'].includes(
          value
        )
      },
    },
  },
  computed: {
    iconName() {
      return (
        this.icon ||
        {
          primary: 'badge-check',
          info: 'information-circle',
          success: 'check-circle',
          warning: 'exclamation-circle',
          danger: 'x-circle',
        }[this.type]
      )
    },
  },
}
</script>

<style lang="postcss">
/* Primary */
.list-primary {
  @apply text-primary-500;
}
/* Info */
.list-info {
  @apply text-blue-500;
}
/* Success */
.list-success {
  @apply text-green-500;
}
/* Warning */
.list-warning {
  @apply text-yellow-500;
}
/* Danger */
.list-danger {
  @apply text-red-500;
}
</style>
