import './app.css'

import Alpine from 'alpinejs'
import { typescript } from '~/app/ts/test'
import toast from '~/app/ts/toast'
import imageLozad from '~/app/ts/image-lozad'
import markdown from '~/app/ts/markdown'
import tocItem from '~/app/ts/toc-item'
import sidebar from '~/app/ts/sidebar'
import quill from '~/app/ts/quill'
// import editor from '~/app/ts/editor'
import search from '~/app/ts/search'

typescript()

window.Alpine = Alpine

Alpine.store('toast', toast)
Alpine.data('imageLozad', imageLozad)
Alpine.data('markdown', markdown)
Alpine.data('tocItem', tocItem)
Alpine.store('sidebar', sidebar)
Alpine.data('quill', quill)
// Alpine.data('editor', editor)
Alpine.data('search', search)

Alpine.start()
