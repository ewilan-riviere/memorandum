export const getPages = async ($content, $store) => {
  let pages = []
  if (!$store.state.pages.length) {
    const content = await $content('documentation', { deep: true })
      .only(['title', 'path'])
      .fetch()

    content.forEach((markdownFile) => {
      const path = markdownFile.path.replace('/documentation/', '').split('/')
      const Page = {
        label: path[0],
        guides: [],
        number: 0,
        route: 'type-slug',
      }
      pages.push(Page)
    })

    const pagesAll = pages

    // delete duplicates
    pages = pages.filter(
      (v, i, a) => a.findIndex((t) => t.label === v.label) === i
    )
    // alphabetic sorting
    pages.sort((a, b) => (a.label > b.label ? 1 : -1))

    pagesAll.forEach((pageA) => {
      pages.forEach((page) => {
        if (pageA.label === page.label) {
          page.number += 1
        }
      })
    })
    // store pages
    $store.commit('setPages', pages)
  } else {
    pages = $store.state.pages
  }

  return pages
}
