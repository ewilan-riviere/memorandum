const tocItem = () => ({
  collapsed: false,

  state(slug: string) {
    let url = window.location.href
    if (url.match(new RegExp(slug, 'gi'))) {
      // console.log('open!', slug)
      this.collapsed = true
    }
  },
  toggle() {
    this.collapsed = !this.collapsed
  },
})

export default tocItem
