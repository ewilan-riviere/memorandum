import content from '@/node_modules/.pnpm/content.json'

export const useContent = () => {
  const list: ContentNavigation = content
  const navigation = list.items

  const objectIsEmpty = (object: object): boolean => {
    const isEmpty =
      object &&
      Object.keys(object).length === 0 &&
      object.constructor === Object
    return isEmpty || object === undefined
  }

  const findNestedObj = <T>(entireObj: ContentNavigation, keyToFind: string, valToFind: string): T => {
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue;
      }
      return nestedValue;
    })

    return foundObj as unknown as T;
  }

  const getFileFromRoute = (route: string): ContentFile => {
    const subject = findNestedObj<ContentSubjectItem>(list, 'subject', 'laravel')
    console.log(subject);

    const file = findNestedObj<ContentFile>(list, 'route', route)
    return file
  }

  return {
    list,
    navigation,
    objectIsEmpty,
    getFileFromRoute
  }
}
