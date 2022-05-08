import content from '@/node_modules/.pnpm/content.json'

export const useContent = () => {
  const list: ContentNavigation = content
  let navigation = list.items

  const objectIsEmpty = (object: object): boolean => {
    const isEmpty =
      object &&
      Object.keys(object).length === 0 &&
      object.constructor === Object
    return isEmpty || object === undefined
  }

  return {
    list,
    navigation,
    objectIsEmpty,
  }
}
