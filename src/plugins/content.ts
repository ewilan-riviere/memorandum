import fs from 'fs'
import type { Plugin } from 'vite'
import readingTime from 'reading-time'
// @ts-ignore
import parseMarkdown from 'front-matter-markdown'
import { Index, MeiliSearch } from 'meilisearch'
import MarkdownIt from 'markdown-it'
import jsdom from 'jsdom'

const groupBy = <T, K extends keyof T>(
  array: T[],
  groupOn: K | ((i: T) => string)
): Record<string, T[]> => {
  const groupFn = typeof groupOn === 'function' ? groupOn : (o: T) => o[groupOn]

  return Object.fromEntries(
    array.reduce((acc, obj) => {
      const groupKey = groupFn(obj)
      return acc.set(groupKey, [...(acc.get(groupKey) || []), obj])
    }, new Map())
  ) as Record<string, T[]>
}

const slugify = (text: string) => {
  return text
    .toString() // Cast to string (optional)
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-') // Replace spaces with -
    // .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

const capitalizeFirstLetter = (string: string) => {
  string = string.charAt(0).toUpperCase() + string.slice(1)
  string = string.replace('-', ' ')
  return string
}

const getToc = (text: string): ITocItem[] => {
  const md = new MarkdownIt();
  const result = md.render(text);

  const encode = (str: string) => {
    return str.replaceAll('/', '%2F')
  }

  /**
   * From https://stackoverflow.com/questions/187619/is-there-a-javascript-solution-to-generating-a-table-of-contents-for-a-page
   * */
  const parse = (headingSet: NodeListOf<HTMLElement>) => {
    const tocData: ITocItem[] = []
    const curLevel = 0
    const preTocItem: ITocItem = {}
    headingSet.forEach((heading) => {
      const tocItem: ITocItem = {}
      const hLevel = heading.outerHTML.match(/<h([\d]).*>/)
      if (hLevel) {
        tocItem.level = parseInt(hLevel[1])
        tocItem.text = heading.textContent || ''

        // const reg = /[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s
        const id = tocItem.text
        // id = id?.replace(reg, '').trim().replace(/ /g, '-').toLowerCase()

        tocItem.id = encode(slugify(id))
        if (!tocItem.id.includes('title:')) {
          tocData.push(tocItem)
        }
      }
    })

    return tocData
  }

  const create = (body: string): ITocItem[] => {
    const doc = new jsdom.JSDOM(body).window.document
    const headingSet: NodeListOf<HTMLHeadingElement> = doc.querySelectorAll('h2, h3, h4')

    return parse(headingSet)
  }

  return create(result)
}

const addToMeilisearch = async (list: ContentFile[]) => {
  let client: MeiliSearch
  let index: Index<any>
  try {
    client = new MeiliSearch({
      host: 'http://127.0.0.1:7700',
      apiKey: '',
    })
    index = client.index('memorandum')
    await index.deleteAllDocuments()
  } catch (error) {
    console.log(error);
    return
  }

  const documents: ContentFileSearch[] = []

  list.forEach((file, key) => {
    documents.push({
      id: key,
      title: file.title,
      firstChar: file.firstChar,
      slug: file.slug,
      hierarchyCategory: file.hierarchy?.category,
      hierarchyDomain: file.hierarchy?.domain,
      hierarchySubject: file.hierarchy?.subject,
      image: file.image
    })
  });
  const response = await index.addDocuments(documents)
  console.log(response);
}

const getFilesList = (dirPath: string, filesList: string[] = []): string[] => {
  const files = fs.readdirSync(dirPath)

  filesList = filesList || []

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory())
      filesList = getFilesList(`${dirPath}/${file}`, filesList)
    else filesList.push(`${dirPath}/${file}`)
  })

  return filesList
}

const getContentFiles = async (opts: PluginOptions): Promise<ContentFile[]> => {
  const files = getFilesList(opts.path!)
  const contentList: ContentFile[] = []

  files.forEach((file) => {
    const text = fs.readFileSync(file, 'utf8')
    const fullPath = file.replace('//', '/')

    const front: FrontMatterMarkdown = parseMarkdown(text)

    const path = file.replace(opts.path!, '')
    const pathList = path.split('/')
    pathList.shift()
    pathList.pop()

    const hierarchy: ContentHierarchy = {
      category: pathList[0], // Development
      domain: pathList[1], // Frameworks
      subject: pathList[2], // Laravel
    }

    let route = path.replace('.md', '')
    route = `/content${route}`

    const slug = slugify(front.title!)

    const image = `${opts.baseUrl}/content/logo/${hierarchy.subject}.webp`

    const md = new MarkdownIt();
    const result = md.render(text);

    if (pathList.length) {
      contentList.push({
        title: front.title,
        firstChar: front.title?.charAt(0),
        slug: slug,
        fullPath: fullPath,
        path: path,
        route: route,
        time: readingTime(text),
        front: front,
        hierarchy: hierarchy,
        toc: getToc(text),
        image: image,
      })
    }
  })

  if (opts.search === 'meilisearch') {
    await addToMeilisearch(contentList)
  }

  return contentList
}

const getCategories = (contentList: ContentFile[]): ContentNavigation => {
  const contentNavigation: ContentNavigation = {
    items: [],
  }

  /**
   * group by category, aka 'development'
   */
  const groupByCategories = groupBy(
    contentList,
    (file) => file.hierarchy?.category!
  )

  for (const categoryKey in groupByCategories) {
    const category = groupByCategories[categoryKey]

    const domainItems: ContentDomainItem[] = []
    const groupByDomains = groupBy(category, (file) => file.hierarchy?.domain!)
    for (const domainKey in groupByDomains) {
      const domain = groupByDomains[domainKey]

      const subjectItems: ContentSubjectItem[] = []
      const groupBySubjects = groupBy(
        domain,
        (file) => file.hierarchy?.subject!
      )
      for (const subjectKey in groupBySubjects) {
        const subject = groupBySubjects[subjectKey]

        subjectItems.push({
          label: capitalizeFirstLetter(subjectKey),
          slug: slugify(subjectKey),
          subject: slugify(subjectKey),
          files: subject,
        })
      }

      domainItems.push({
        label: capitalizeFirstLetter(domainKey),
        slug: slugify(domainKey),
        domain: slugify(domainKey),
        subjects: subjectItems,
      })
    }

    contentNavigation.items?.push({
      label: capitalizeFirstLetter(categoryKey),
      slug: slugify(categoryKey),
      category: slugify(categoryKey),
      domains: domainItems,
    })
  }
  // console.log(categories);

  return contentNavigation
}

export type PluginOptions = {
  path?: string
  include?: RegExp[]
  baseUrl?: string
  search?: ContentSearch
  // yaml?: {
  //   enabled?: boolean
  //   include?: string
  //   loadMultiDocument?: boolean
  // }
}

const DEFAULT_OPTIONS: PluginOptions = {
  path: './src/pages/content/',
  include: [/\.(md)$/],
  baseUrl: 'http://localhost:3000',
  search: 'local'
  // yaml: {
  //   enabled: true,
  //   loadMultiDocument: false,
  // },
}

const generateContentFile = async (opts: PluginOptions) => {
  const contentList = await getContentFiles(opts)
  const categories = getCategories(contentList)
  const jsonString = JSON.stringify(categories)

  fs.writeFile('./node_modules/.pnpm/content.json', jsonString, (err) => {
    if (err) {
      return console.log(err)
    }
  })
}

export default (options: PluginOptions = {}): Plugin => {
  const opts: PluginOptions = Object.assign({}, DEFAULT_OPTIONS, options)

  return {
    name: 'vite:content',
    buildStart(options) {
      generateContentFile(opts)
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.md')) {
        server.ws.send({
          type: 'full-reload',
          path: '*',
        })
      }
    },
  }
}
