import './app.css'

import Alpine from 'alpinejs'
import { typescript } from '~/views/ts/test'
import toast from './ts/toast'
import imageLozad from './ts/image-lozad'
import markdown from './ts/markdown'
import tocItem from './ts/toc-item'
import sidebar from './ts/sidebar'
import quill from './ts/quill'
// import editor from './ts/editor'
import meilisearch from './ts/meilisearch'

typescript()

window.Alpine = Alpine

Alpine.store('toast', toast)
Alpine.data('imageLozad', imageLozad)
Alpine.data('markdown', markdown)
Alpine.data('tocItem', tocItem)
Alpine.store('sidebar', sidebar)
Alpine.data('quill', quill)
// Alpine.data('editor', editor)
Alpine.data('meilisearch', meilisearch)

Alpine.start()