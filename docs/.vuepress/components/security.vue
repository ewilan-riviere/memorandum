<template>
    <div></div>
</template>

<script>
import { checkAuth } from '../login/helper'
import Login from '../login/Login'

import Vue from 'vue'

export default {
    mounted() {
      const doCheck = () => {
        if (!checkAuth()) {
          this.$dlg.modal(Login, {
            width: 300,
            height: 300,
            title: 'Memorandum Security',
            singletonKey: 'memorandum-login',
            maxButton: false,
            closeButton: false,
            callback: data => {
              if (data === true) {
                // do some stuff after login
              }
            }
          })
        }
      }

      if (this.$dlg) {
        doCheck()
      } else {
        import('v-dialogs').then(resp => {
          Vue.use(resp.default)
          this.$nextTick(() => {
            doCheck()
          })
        })
      }
    }
}
</script>

<style lang="scss">

</style>