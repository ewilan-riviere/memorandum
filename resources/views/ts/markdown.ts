import hljs from 'highlight.js/lib/common'

let refsAlpine: {
  proseDocument: HTMLElement
}
let clipboardRaw = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`
let clipboardCheckRaw = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`

const markdown = () => ({
  copied: false,
  // $dispatch: (value: 'toast', options: Toast) => {},
  $store: {
    toast: {
      push: (toast: Toast) => {},
    },
  },

  init() {
    // @ts-ignore
    refsAlpine = this.$refs
    this.setHighlight()
    this.setCopyBtn()
    this.setFilename()
    this.moveToc()
    this.scrollSpy()
  },
  setHighlight() {
    let preBlocks = refsAlpine.proseDocument.querySelectorAll('pre')
    preBlocks.forEach((pre) => {
      let html = hljs.highlightAuto(pre.innerText).value
      let code = document.createElement('code')
      code.innerHTML = html
      pre.innerHTML = ''
      pre.appendChild(code)
    })
  },
  scrollToTop() {
    const main = document.getElementById('markdown')
    main?.scrollIntoView({
      behavior: 'smooth',
    })

    main?.scrollTo({ top: 100, behavior: 'smooth' })
  },
  scrollSpy() {
    window.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')

          if (entry.intersectionRatio > 0) {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              ?.parentElement?.classList.add('active')
          } else {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              ?.parentElement?.classList.remove('active')
          }
        })
      })

      // Track all sections that have an `id` applied
      document.querySelectorAll('a[id]').forEach((section) => {
        observer.observe(section)
      })
    })
  },
  setFilename() {
    let preList = refsAlpine.proseDocument.querySelectorAll('pre')
    preList.forEach((pre) => {
      let filename = pre.getAttribute('data-filename')
      if (filename !== '') {
        let fnBlock = document.createElement('span')
        fnBlock.classList.add('filename')
        fnBlock.textContent = filename
        pre.appendChild(fnBlock)
      }
    })
  },
  moveToc() {
    let tocItems = document.getElementsByClassName('table-of-contents')
    let tocItem = tocItems[0]
    if (tocItem) {
      let tocPlacement = document.getElementById('toc')
      let newToc = tocItem
      newToc.classList.remove('table-of-contents')
      newToc.classList.add('toc')
      tocPlacement?.appendChild(newToc)
    }
  },
  setCopyBtn() {
    let preList = refsAlpine.proseDocument.querySelectorAll('pre')
    preList.forEach((pre) => {
      let clipboardSvg = new DOMParser().parseFromString(
        clipboardRaw,
        'text/html'
      ).body.firstElementChild

      let button = document.createElement('button')
      if (clipboardSvg) {
        button.appendChild(clipboardSvg)
      }
      button.className = 'copy-code-button'
      button.type = 'button'
      button.addEventListener(
        'click',
        () => {
          this.copy(button)
        },
        false
      )
      pre.classList.add('prettyprint')
      pre.appendChild(button)
    })
  },
  async copy(element: HTMLElement) {
    let text = ''
    let preElement = element.parentElement

    preElement?.childNodes.forEach((node) => {
      let nodeEl = node as HTMLElement
      if (nodeEl.tagName === 'CODE') {
        text = nodeEl.innerText
      }
    })

    this.copied = true
    let success = false
    let error = undefined
    if (text) {
      if (navigator.clipboard) {
        await navigator.clipboard
          .writeText(text)
          .then(() => (success = true))
          .catch((e) => {
            error = e
          })
      }
    }

    if (!success) {
      this.$store.toast.push({
        type: 'warning',
        text: 'Some error here...',
      })
      console.error('Error on copy!')
    } else {
      this.$store.toast.push({
        type: 'success',
        text: 'Code is in your clipboard.',
      })
      element.innerHTML = clipboardCheckRaw
      setTimeout(() => {
        element.innerHTML = clipboardRaw
      }, 3500)
    }
    setTimeout(() => {
      this.copied = false
    }, 3500)
  },
})

export default markdown
