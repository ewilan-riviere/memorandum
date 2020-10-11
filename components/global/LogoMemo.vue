<template>
  <div class="flex w-full h-full group">
    <img src="/small-icon.png" alt="" class="max-w-full max-h-full" />
    <div
      class="ml-2 transition-colors duration-300 border-b-2 border-transparent font-quicksand group-hover:border-green-500"
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
