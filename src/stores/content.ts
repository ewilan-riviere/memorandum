import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    domain: {} as ContentDomainItem,
    subject: {} as ContentSubjectItem
  }),
  actions: {
    setDomain(domain?: ContentDomainItem) {
      if (domain) {
        this.$patch({
          domain: domain
        })
      }
    },
    setSubject(subject?: ContentSubjectItem) {
      if (subject) {
        this.$patch({
          subject: subject
        })
      }
    }
  },
})
