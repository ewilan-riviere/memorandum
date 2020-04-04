export const STORAGE_KEY = 'memorandum-auth'

// Do user authorization verify
export function checkAuth () {
  const auth = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
  return auth && Object.keys(auth).length
}

export function checkAuthValid() {
  let authInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
  if (authInfo !== null) {
      return true
  }
  return false
}