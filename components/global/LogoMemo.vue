<template>
  <div class="flex w-full h-full">
    <img src="/small-icon.png" alt="" class="max-w-full max-h-full" />
    <div class="ml-2 font-quicksand">
      {{ $store.state.settings.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoMemo',
}
</script>
