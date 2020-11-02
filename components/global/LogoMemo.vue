<template>
  <div class="flex items-center w-full h-8 group">
    <img src="/logo/logo-icon-black.png" alt="" class="max-w-full max-h-full" />
    <div
      class="ml-2 transition-colors duration-300 border-b-2 border-transparent font-quicksand group-hover:border-primary"
    >
      {{ $store.state.settings.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoMemo',
}
</script>
