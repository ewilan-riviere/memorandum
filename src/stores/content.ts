import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    domain: {} as ContentDomainItem,
    subject: {} as ContentSubjectItem,
    file: {} as ContentFile,
    displaySubject: false,
  }),
  actions: {
    setDomain(domain?: ContentDomainItem) {
      if (domain) {
        this.$patch({
          domain: domain,
          displaySubject: false
        })
      }
    },
    setSubject(subject?: ContentSubjectItem) {
      if (subject) {
        this.$patch({
          subject: subject,
          displaySubject: true
        })
        if (subject.files && subject.files[0]) {
          this.setFile(subject.files[0])
        }
      }
    },
    setFile(file?: ContentFile) {
      if (file) {
        this.$patch({
          file: file
        })
      }
    }
  },
})
