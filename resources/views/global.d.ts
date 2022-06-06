import { Alpine as AlpineType } from 'alpinejs'

declare global {
  var Alpine: AlpineType
  var setupEditor: () => {}
}
interface Window {
  Alpine: AlpineType
  setupEditor: () => {}
}

/**
 * From https://bobbyhadz.com/blog/typescript-make-types-global
 */
declare global {
  interface Toast {
    id?: number
    type?: 'info' | 'success' | 'warning' | 'danger'
    title?: string
    text?: string
  }
}

export {}
