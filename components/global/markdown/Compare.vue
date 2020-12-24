<template>
  <div class="compare">
    <section class="rounded-md advantages">
      <div class="mb-5 text-2xl advantages__title">
        {{ language(advantages) }}
      </div>
      <div class="text-white bg-green-400 bg-opacity-75 rounded-md pre-wrap">
        <slot name="advantages"></slot>
      </div>
    </section>
    <section class="rounded-md disadvantages">
      <div class="mb-5 text-2xl disadvantages__title">
        {{ language(disadvantages) }}
      </div>
      <div class="text-white bg-red-400 bg-opacity-75 rounded-md pre-wrap">
        <slot name="disadvantages"></slot>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Compare',
  props: {
    lang: {
      type: String,
      default: 'en',
    },
  },
  data() {
    return {
      advantages: {
        fr: 'Avantages',
        en: 'Advantages',
      },
      disadvantages: {
        fr: 'Désavantages',
        en: 'Disadvantages',
      },
    }
  },
  methods: {
    language(title) {
      const lang = this.lang
      return title[lang]
    },
  },
}
</script>

<style lang="postcss" scoped>
.advantages {
  padding: 1rem;
  font-weight: bold;
}
.disadvantages {
  padding: 1rem;
  font-weight: bold;
}
.pre-wrap {
  white-space: pre-wrap;
}
</style>
