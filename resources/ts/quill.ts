import Quill from 'quill'

let refsAlpine: {
  quillEditor: HTMLImageElement
}

const quill = () => ({
  description: '',
  $dispatch: (value: string, action: any) => {},

  init() {
    // @ts-ignore
    refsAlpine = this.$refs
    // const quill = new Quill(refsAlpine.quillEditor, { theme: 'snow' })
    // quill.on('text-change', () => {
    //   console.log(quill.root.innerHTML)
    //   // this.$dispatch('input', quill.root.innerHTML)
    // })
    const toolbarOptions = [
      ['bold', 'italic'],
      ['link', 'image'],
    ]
    const quill = new Quill(refsAlpine.quillEditor, {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    })
    quill.on('text-change', () => {
      this.description = quill.root.innerHTML
      // this.$dispatch('quill', )
    })
  },
})

export default quill
