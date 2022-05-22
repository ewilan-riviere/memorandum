const runtimeConfigPrivate = {}
const runtimeConfigPublic = {
  baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
  googleSiteVerificationToken: process.env.GOOGLE_SITE_VERIFICATION_TOKEN ?? '',
}

export { runtimeConfigPrivate, runtimeConfigPublic }
