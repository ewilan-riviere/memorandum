import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  ignores: [
    //
  ],
}, {
  rules: {
    'no-console': 'warn',
  },
})
