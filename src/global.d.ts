import { ReadTimeResults } from 'reading-time'
import { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export { }

/**
 * From https://bobbyhadz.com/blog/typescript-make-types-global
 */
declare global {
  interface NavigationItem {
    name?: string
    href?: string
    icon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}>
    current?: boolean
  }

  type ContentSearch = 'local' | 'meilisearch'

  interface FrontMatterMarkdownContent {
    title: string
    path: string
  }

  interface FrontMatterMarkdown {
    title?: string
    ordered?: boolean
    skipSize: number
    contents?: FrontMatterMarkdownContent[]
  }

  type ContentHierarchyType = 'category' | 'domain' | 'subject'
  interface ContentHierarchy {
    category?: string
    domain?: string
    subject?: string
  }

  interface ContentFile {
    title?: string
    firstChar?: string
    slug?: string
    fullPath?: string
    path?: string
    route?: string
    time?: ReadTimeResults
    front?: FrontMatterMarkdown
    hierarchy?: ContentHierarchy
    toc?: ITocItem[]
    image?: string
    text?: string
  }

  interface ContentFileSearch {
    id?: number
    title?: string
    firstChar?: string
    slug?: string
    hierarchyCategory?: string
    hierarchyDomain?: string
    hierarchySubject?: string
    image?: string
  }

  interface ContentNavigation {
    items?: ContentCategoryItem[]
  }

  // Development
  interface ContentCategoryItem {
    label?: string
    slug?: string
    category?: string
    domains?: ContentDomainItem[]
  }

  // Frameworks
  interface ContentDomainItem {
    label?: string
    slug?: string
    domain?: string
    subjects?: ContentSubjectItem[]
  }

  // Laravel
  interface ContentSubjectItem {
    label?: string
    slug?: string
    subject?: string
    files?: ContentFile[]
  }

  interface ITocItem {
    text?: string
    level?: number
    id?: string
    parent?: TocItem
    children?: TocItem[]
  }
}



export class TocItem implements ITocItem {
  constructor(
    text?: string,
    level?: number,
    id?: string,
    parent?: TocItem,
    children?: []
  ) {
    this.text = text
    this.level = level
    this.id = id
    this.parent = parent
    this.children = children
  }
}
