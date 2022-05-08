import fs from 'fs'
import type { Plugin } from 'vite'
import readingTime from 'reading-time'
// @ts-ignore
import parseMarkdown from 'front-matter-markdown'

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
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

const capitalizeFirstLetter = (string: string) => {
  string = string.charAt(0).toUpperCase() + string.slice(1)
  string = string.replace('-', ' ')
  return string
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

const getContentFiles = (dirPath: string): ContentFile[] => {
  const files = getFilesList(dirPath)
  const contentList: ContentFile[] = []

  files.forEach((file) => {
    const text = fs.readFileSync(file, 'utf8')
    const fullPath = file.replace('//', '/')

    const front: FrontMatterMarkdown = parseMarkdown(text)

    const path = file.replace(dirPath, '')
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

    if (pathList.length) {
      contentList.push({
        title: front.title,
        firstChar: front.title?.charAt(0),
        slug: slugify(front.title!),
        fullPath: fullPath,
        path: path,
        route: route,
        time: readingTime(text),
        front: front,
        hierarchy: hierarchy,
      })
    }
  })

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
  // yaml?: {
  //   enabled?: boolean
  //   include?: string
  //   loadMultiDocument?: boolean
  // }
}

const DEFAULT_OPTIONS: PluginOptions = {
  path: './src/pages/content/',
  include: [/\.(md)$/],
  // yaml: {
  //   enabled: true,
  //   loadMultiDocument: false,
  // },
}

const generateContentFile = (opts: PluginOptions) => {
  const contentList = getContentFiles(opts.path!)
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
