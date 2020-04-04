<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <div class="form-header">E-mail</div>
      <div>
        <input type="mail" class="form-control" name="email" v-model="email">
      </div>
      <div class="form-header">Password</div>
      <div>
        <input type="password" class="form-control" v-model="password">
      </div>

      <div class="btn-row">
        <button class="btn btn-login" type="submit">
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { STORAGE_KEY } from './helper'
import { authInfo } from '../env'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.email === authInfo.mail && this.password === authInfo.password) {
        const data = JSON.stringify({
          email: this.email,
          time: new Date().getTime()
        })
        window.sessionStorage.setItem(STORAGE_KEY, data)
        this.$emit('close', true)
      } else {
        this.$dlg.alert('Incorrect identification information.', {
          language: 'en',
          messageType: 'warning'
        })
        // this.$dlg.alert(`Received message:`)
        // this.$dlg.alert('message', { messageType: 'title', , closeButton: true })
      }
    }
  }
}
</script>

<style lang="stylus">
.v-dialog-header
  background-color #218838
  color white
.login-form
  padding: 1rem
  display flex
  flex-direction column
  box-sizing border-box
  .btn-row
    margin-top 1rem
  .btn
    padding 0.6rem 2rem
    outline none
    color white
    border 0
    color white
    background-color #218838
    cursor pointer
    font-weight bold
    &:hover
      background-color #1e7e34
  .form-header
    color #666
    margin-bottom 0.5rem
  .form-control
    padding 0.6rem
    border 2px solid #ddd
    width 100%
    margin-bottom 0.5rem
    box-sizing border-box
    outline none
    transition border 0.2s ease
    &:focus
      border 2px solid #aaa
</style>