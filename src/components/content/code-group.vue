<script setup lang="ts">
const tabsRef = ref<HTMLButtonElement>()
const tabs = ref<HTMLElement[]>([])
const activeTabIndex = ref(0)

const slots = useSlots()

const switchTab = (i: number) => {
  tabs.value.forEach((tab) => {
    tab.props.active = false

    // tab.classList.remove('active')
  })
  tabs.value[i].props.active = true
}

const updateTabs = (i: number) => {
  console.log(i)

  activeTabIndex.value = i
  updateHighlighteUnderlinePosition()
}

const updateHighlighteUnderlinePosition = () => {
  if (tabsRef) {
    const activeTab = tabsRef[activeTabIndex.value]
    if (!activeTab) {
      return
    }
    const highlightUnderline = tabsRef['highlight-underline']
    highlightUnderline.style.left = `${activeTab.offsetLeft}px`
    highlightUnderline.style.width = `${activeTab.clientWidth}px`
  }
}

onMounted(() => {
  // slots
  //   .default()
  //   .filter((slot) => Boolean(slot.componentOptions))
  //   .map((slot) => {
  //     return {
  //       label: slot.componentOptions.propsData.label,
  //       elm: slot.elm,
  //     }
  //   })
  nextTick(() => {
    tabs.value = slots
      .default()
      // .filter((slot) => Boolean(slot.component))
      .map((slot) => {
        return {
          label: slot.props?.label,
          props: slot.props,
        }
      })
    console.log(tabs.value)
    updateHighlighteUnderlinePosition()
  })

  // tabs.value = slots?.default
  //   .filter((slot) => Boolean(slot.componentOptions))
  //   .map((slot) => {
  //     return {
  //       label: slot.componentOptions.propsData.label,
  //       elm: slot.elm,
  //     }
  //   })
  // updateHighlighteUnderlinePosition
  // this.$nextTick(updateHighlighteUnderlinePosition)
})

watch(
  () => activeTabIndex.value,
  (newVal) => {
    console.log(newVal)

    switchTab(newVal)
  }
)
</script>

<template>
  <div class="code-group">
    <div
      class="rounded-t-md border-b-2 border-gray-700 px-2 bg-gray-800 text-sm text-white relative"
    >
      {{ activeTabIndex }}
      <button
        v-for="({ label }, i) in tabs"
        ref="tabsRef"
        :key="label"
        class="px-4 py-3 text-gray-400 font-bold font-mono"
        :class="[activeTabIndex === i && 'active']"
        @click="updateTabs(i)"
      >
        {{ label }}
      </button>
      <span ref="highlight-underline" class="highlight-underline" />
    </div>
    <slot />
  </div>
</template>

<style lang="css" scoped>
button {
  outline: none;
}

.highlight-underline {
  @apply bg-purple-500 absolute;
  bottom: -2px;
  height: 2px;
  transition: left 150ms, width 150ms;
}

.code-group ::v-deep {
  & pre[class*='language-'] {
    @apply rounded-t-none mt-0;
  }
}
</style>
