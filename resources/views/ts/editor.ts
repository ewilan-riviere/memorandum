import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

let refsAlpine: {
  editor: HTMLElement
}

const editor = () => ({
  editor: undefined as any,

  init(element: HTMLElement) {
    this.editor = new Editor({
      element: element,
      extensions: [StarterKit],
      content: this.content,
      onUpdate: ({ editor }) => {
        this.content = editor.getHTML()
      },
    })
    // @ts-ignore
    refsAlpine = this.$refs
  },
})

export default editor
