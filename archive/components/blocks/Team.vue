<template>
  <div>
    <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
    <div v-cloak class="bg-white">
      <div class="container mx-auto">
        <swiper-team-citations
          v-cloak
          data-aos="fade-up-right"
        ></swiper-team-citations>
      </div>
      <div
        v-for="(team, teamId) in members"
        :key="teamId"
        data-aos="fade-up-left"
        class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8 lg:py-24"
      >
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div class="space-y-5 sm:space-y-4">
            <h2
              class="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl"
            >
              {{ teamsTranslatations[teamId].label }}
            </h2>
            <p class="text-xl leading-7 text-gray-500">
              Libero fames augue nisl porttitor nisi, quis. Id ac elit odio
              vitae elementum enim vitae ullamcorper suspendisse. Vivamus
              fringilla.
            </p>
          </div>
          <div class="lg:col-span-2">
            <ul
              class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
            >
              <team-card
                v-for="(member, memberID) in shuffleTeam(team)"
                :key="memberID"
                :member="member"
              ></team-card>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div v-for="item in members" :key="item.id">
        {{ teamsTranslatations[teamId].label }}
        <pre>{{ item }}</pre>
      </div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import TeamCard from '@/components/blocks/TeamCard.vue'
import SwiperTeamCitations from '@/components/blocks/SwiperTeamCitations.vue'
import { teamsTranslatations, teams } from '~/static/utils/team'
import members from '~/static/members.json'

export default {
  name: 'Team',
  components: {
    TeamCard,
    SwiperTeamCitations,
  },
  data() {
    return {
      teamsTranslatations,
      teams,
      members,
    }
  },
  methods: {
    shuffleTeam(team) {
      return this.$shuffle(team)
    },
    setTeamsNames() {
      this.teamsNames = Object.keys(this.teams)
    },
    /**
     * Sort alphabetically team array
     * @returns array
     */
    sortedTeam(team) {
      team.sort(function (a, b) {
        if (a.name.lastname < b.name.lastname) {
          return -1
        }
        if (a.name.lastname > b.name.lastname) {
          return 1
        }
        return 0
      })
      return team
    },
  },
}
</script>

<style lang="postcss" scoped></style>
