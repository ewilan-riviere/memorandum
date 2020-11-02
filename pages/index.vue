<template>
  <div>
    <main-layout>
      <div slot="aside"></div>
      <div slot="main">
        <icon name="github-stroke" stroke />
        <icon name="google-play-store" :size="150" ratio />
      </div>
      <div slot="toc"></div>
    </main-layout>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
}
</script>
