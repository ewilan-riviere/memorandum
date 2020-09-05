<template>
  <div>
    <!-- <div v-if="tokenDetected()">
      Vous êtes connecté·e
      <button @click="logout()">
        Se déconnecter
      </button>
    </div>
    <form v-else method="POST" @submit.prevent="login(mail, password)">
      <div class="mb-8">
        <div style="min-height: 2rem;">
          {{ errorMessage }}
        </div>
        <input
          ref="mail"
          v-model="mail"
          class="mb-4 text-black"
          placeholder="E-mail"
          type="email"
          name="mail"
          required
        />
        <input
          ref="password"
          v-model="password"
          placeholder="Password"
          type="password"
          required
        />
        <div class="mt-10">
          <button
            class="px-4 py-2 mr-2 font-bold text-white transition-colors duration-300 bg-teal-700 hover:bg-teal-900"
          >
            Sign in
          </button>
        </div>
      </div>
    </form> -->

    <!-- <router-link
      v-if="tokenDetected()"
      class="px-4 py-2 font-bold text-white transition-colors duration-300 bg-teal-700 hover:bg-teal-900"
      :to="{ name: 'tasks-list' }"
    >
      Login with {{ cookieUser }}
    </router-link> -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      token: null,
      mail: '',
      password: '',
      errorMessage: null,
      // cookieUser: this.$cookies.get('user'),
      tasks: [],
    }
  },
  methods: {
    login(mail, password) {
      this.$axios
        .post(`${this.$api}login`, {
          email: mail,
          password: password,
        })
        .then((response) => {
          this.token = response.data.success.token
          // this.$cookies.set('token', this.token, 60 * 60 * 24 * 30)
          // this.$cookies.set('user', mail, 60 * 60 * 24 * 30)
          // this.errorMessage = null

          setTimeout(() => {
            location.reload()
          }, 500)
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.errorMessage = 'Identifiants incorrects'
          } else if (e.response.status === 404) {
            this.errorMessage = 'Erreur inattendue (404)'
          } else {
            console.log(e)

            this.errorMessage = 'Erreur'
          }
        })
    },
    logout() {
      // this.$cookies.remove('token')
      // this.$cookies.remove('user')
      location.reload()
    },
  },
}
</script>

<style lang="stylus" scoped>
input {
  color: black !important;
  border-radius: 0 !important;
  border-color: black;
  background-color: rgba(black, 0.1);
  &::placeholder {
    color: lightgray;
    font-weight: bold;
    font-family: 'DancingScript-Regular';
  }
}
</style>
