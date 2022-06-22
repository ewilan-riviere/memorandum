import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export const typescript = () => {
  console.log('TypeScript works')

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const element = e.target as unknown as HTMLElement

      document
        .querySelector(element.getAttribute('href') as 'a')
        ?.scrollIntoView({
          behavior: 'smooth',
        })
    })
  })
}
