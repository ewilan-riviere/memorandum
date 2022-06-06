const toast = {
  toasts: [] as Toast[],
  visible: [] as Toast[],
  push(toast: Toast) {
    toast.id = Date.now()
    if (!toast.title) {
      toast.title = this.capitalizeFirstLetter(toast.type)
    }
    this.toasts.push(toast)
    this.fire(toast.id)
  },
  fire(id: number) {
    let toast = this.toasts.find((toast) => toast.id == id)
    if (toast) {
      this.visible.push(toast)
      const timeShown = 2000
      setTimeout(() => {
        this.kill(id)
      }, timeShown)
    }
  },
  kill(id: number) {
    const toast = this.visible.find((toast) => toast.id == id)
    if (toast) {
      const index = this.visible.indexOf(toast)
      this.visible.splice(index, 1)
      setTimeout(() => {
        const original = this.toasts.find((toast) => toast.id == id)
        if (original) {
          const index = this.toasts.indexOf(original)
          this.toasts.splice(index, 1)
        }
      }, 250)
    }
  },
  capitalizeFirstLetter(string: string | undefined) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  },
}

export default toast

// const toastHandler = () => ({
//   toasts: [] as Toast[],
//   visible: [] as Toast[],
//   add(toast: Toast) {
//     toast.id = Date.now()
//     this.toasts.push(toast)

//     this.fire(toast.id)
//   },
//   fire(id: number) {
//     let toast = this.toasts.find((toast) => toast.id == id)
//     if (toast) {
//       this.visible.push(toast)
//       const timeShown = 2000 * this.visible.length
//       setTimeout(() => {
//         this.remove(id)
//       }, timeShown)
//     }
//   },
//   remove(id: number) {
//     const toast = this.visible.find((toast) => toast.id == id)
//     if (toast) {
//       const index = this.visible.indexOf(toast)
//       this.visible.splice(index, 1)
//     }
//   },
// })

// export default toastHandler
