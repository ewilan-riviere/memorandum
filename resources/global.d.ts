import { Alpine as AlpineType } from 'alpinejs'

/**
 * From https://bobbyhadz.com/blog/typescript-make-types-global
 */
declare global {
  const Alpine: AlpineType
  interface Window {
    Alpine: AlpineType
    // eslint-disable-next-line @typescript-eslint/ban-types
    setupEditor: () => {}
  }
  interface Toast {
    id?: number
    type?: 'info' | 'success' | 'warning' | 'danger'
    title?: string
    text?: string
  }
}

export {}
