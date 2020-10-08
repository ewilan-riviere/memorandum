<template>
  <div>
    <team></team>
  </div>
</template>

<script>
import Team from '@/components/blocks/Team.vue'
// import { teams } from '~/static/utils/team'

export default {
  name: 'TeamIndex',
  components: {
    Team,
  },
  data() {
    return {
      // teams,
    }
  },
  mounted() {
    // this.$store.commit('setTeams', teams)
  },
}
</script>
