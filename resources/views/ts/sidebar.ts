const sidebar = {
  opened: false,
  openedBackdrop: false,
  openedSidebar: false,

  init() {},
  toggle() {
    if (this.opened) {
      this.close()
    } else {
      this.open()
    }
  },
  open() {
    this.opened = true

    setTimeout(() => {
      this.openedBackdrop = true
      setTimeout(() => {
        this.openedSidebar = true
      }, 150)
    }, 150)
  },
  close() {
    this.openedSidebar = false

    setTimeout(() => {
      this.openedBackdrop = false
      setTimeout(() => {
        this.opened = false
      }, 150)
    }, 150)
  },
}

export default sidebar
