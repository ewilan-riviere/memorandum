export const getPages = async ($content, $store) => {
  let pages = []

  if (!$store.state.pages.length) {
    const content = await $content('documentation', { deep: true })
      .only(['title', 'path'])
      .fetch()

    const categories = []
    // setup titles for each categories
    content.forEach((markdownFile) => {
      const path = markdownFile.path.replace('/documentation/', '').split('/')
      markdownFile.category = path[0]
      const Page = {
        title: path[0],
        list: [],
        number: 0,
      }
      categories.pushIfNotExist(Page, function (e) {
        return e.title === Page.title
      })
    })
    categories.sort((a, b) => (a.title > b.title ? 1 : -1))

    // insert categories from path
    content.forEach((markdownFile) => {
      const path = markdownFile.path.replace('/documentation/', '').split('/')
      markdownFile.category = path[0]
      const Page = {
        title: path[0],
        list: path[1],
        number: 0,
      }
      // find category
      const currentCategory = categories.find(
        (category) => category.title === path[0]
      )
      // push and increase number
      currentCategory.list.push(Page)
      currentCategory.number += 1
    })
    // eslint-disable-next-line no-unused-vars
    const originalCategories = categories

    // assign number of document into each categories
    categories.forEach((category, key) => {
      // eslint-disable-next-line no-unused-vars
      const currentList = category.list
      const originalList = originalCategories[key].list
      originalList.forEach((originalCategory) => {
        currentList.forEach((currentCategory) => {
          if (originalCategory.list === currentCategory.list) {
            currentCategory.number += 1
          }
        })
      })
    })

    // remove duplicates
    categories.forEach((category) => {
      category.list = category.list.filter(
        (v, i, a) => a.findIndex((t) => t.list === v.list) === i
      )
      category.list.sort((a, b) =>
        a.list > b.list ? 1 : b.list > a.list ? -1 : 0
      )
    })

    pages = categories
    // store pages
    $store.commit('setPages', pages)
  } else {
    pages = $store.state.pages
  }

  return pages
}
