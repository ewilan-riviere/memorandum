<template>
  <li>
    <div class="flex items-center space-x-4 lg:space-x-6">
      <img
        class="w-16 h-16 rounded-full lg:w-20 lg:h-20"
        :src="user.photo"
        alt=""
      />
      <div class="space-y-1 text-lg font-medium leading-6">
        <h4>
          {{ user.nameComplete }}
        </h4>
        <p class="text-indigo-600">
          {{ user.status }}
        </p>
        <!-- <small v-if="member.from">
          Depuis le {{ $moment(member.from).format('Do MMM YYYY') }}
        </small>
        <small v-else>
          <br />
        </small> -->
      </div>
    </div>
  </li>
</template>

<script>
import { techs } from '~/static/utils/team'

export default {
  name: 'TeamCard',
  props: {
    member: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      techs,
      user: {},
    }
  },
  mounted() {
    this.user = this.$formatUser(this.member)
  },
}
</script>

<style lang="postcss" scoped>
ul {
  margin: 0 !important;
  padding: 0 !important;
  padding-left: 1rem !important;
}
li {
  margin: 0.5rem 0 !important;
}
</style>
