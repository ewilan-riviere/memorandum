<script setup lang="ts">

</script>

<template>
  <nav text-xl mt-6 inline-flex gap-2>
    <RouterLink class="icon-btn mx-2" to="/" title="home">
      home
    </RouterLink>

    <RouterLink class="icon-btn mx-2" to="/about" title="about">
      about
    </RouterLink>

    <a
      class="icon-btn"
      i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
