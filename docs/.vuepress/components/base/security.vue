<template>
  <div>
    <div v-if="tokenDetected()">
      safe
    </div>
    <div v-else>
      You have to be login to see this
    </div>
  </div>
</template>

<script>
export default {
  name: 'Security',
}
</script>

<style lang="stylus"></style>
