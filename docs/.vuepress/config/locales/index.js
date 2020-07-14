export default function translation(Vue) {
  const langs = {
    'fr-FR': require('./fr.js'),
    'en-US': require('./en.js'),
  }

  Vue.mixin({
    computed: {
      getTranslation() {
        return { ...langs[this.$lang] }
      },
    },
    methods: {
      $t(key) {
        return this.getTranslation[key] || key
      },
    },
  })
}
