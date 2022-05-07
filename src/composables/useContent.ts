import content from '@/node_modules/.vite/content.json'

export const useContent = () => {
  const list: ContentNavigation = content
  let navigation = list.items

  return {
    list,
    navigation
  }
}
