let refsAlpine: {
  inputSearch: HTMLInputElement
  results: HTMLElement
}

const meilisearch = () => ({
  opened: false,
  openedBackdrop: false,
  openModal: false,

  init() {
    // @ts-ignore
    refsAlpine = this.$refs

    refsAlpine.inputSearch.dispatchEvent(new Event('input'))
    setTimeout(() => {
      refsAlpine.results.classList.remove('hidden')
    }, 250)
  },
  toggle() {
    if (this.opened) {
      this.close()
    } else {
      this.open()
      setTimeout(() => {
        refsAlpine.inputSearch.focus()
      }, 100)
    }
  },
  open() {
    this.opened = true

    setTimeout(() => {
      this.openedBackdrop = true
      setTimeout(() => {
        this.openModal = true
      }, 150)
    }, 150)
  },
  close() {
    this.openModal = false

    setTimeout(() => {
      this.openedBackdrop = false
      setTimeout(() => {
        this.opened = false
      }, 150)
    }, 150)
    refsAlpine.inputSearch.value = ''
  },
})

export default meilisearch
