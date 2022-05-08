<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Tab',
  props: ['title', 'titleSlot', 'disabled'],
})
</script>

<template>
  <div class="tab-panel" role="tabPanel">
    <div class="tab-content"><slot></slot></div>
  </div>
</template>

<style lang="css">
.tab-panel {
  .tab-content {
    padding: 0.5rem;
  }
}
</style>
