module.exports = [
  ['@vuepress/back-to-top', true],
  ['@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: true
  }],
  ['@vuepress/medium-zoom', true],
  ['@vuepress/google-analytics', {
    ga: 'UA-128189152-1'
  }],
  ['container', {
    type: 'vue',
    before: '<pre class="vue-container"><code>',
    after: '</code></pre>'
  }],
  ['container', {
    type: 'upgrade',
    before: info => `<UpgradePath title="${info}">`,
    after: '</UpgradePath>'
  }],
  ['flowchart'],
  [
    '@vuepress/last-updated',
    {
      dateOptions:{
        hour12: false
      }
    }
  ]
]
