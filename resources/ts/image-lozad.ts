import lozad from 'lozad'

let refsAlpine: {
  media: HTMLImageElement
}

const imageLozad = () => ({
  display: false,
  error: false,
  token: '' as string,
  src: '/content/logo/default.webp' as string,

  initiliaze(src: string, token: string) {
    this.display = true
    this.src = `/${src}`
    this.token = token
    // @ts-ignore
    refsAlpine = this.$refs

    this.load()
  },
  load() {
    refsAlpine.media.src = '/content/logo/default.webp'

    this.display = false
    if (refsAlpine.media.complete) {
      setTimeout(() => {
        this.display = true
      }, 50)
    }

    if (refsAlpine.media) {
      refsAlpine.media.src = this.src
      const observer = lozad(refsAlpine.media)
      observer.observe()
      refsAlpine.media.onload = () => {
        this.display = true
      }
      refsAlpine.media.onerror = () => {
        this.error = true
        const appImg = document.getElementById(this.token)
        appImg?.childNodes.forEach((node) => {
          if (node.nodeName === 'IMG') {
            // @ts-ignore
            node.src = '/content/logo/default.webp'
          }
        })
      }
    }
  },
})

export default imageLozad
