/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  readonly VITE_SEARCH: ContentSearch
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
