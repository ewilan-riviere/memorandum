<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div v-for="person in people" :key="person.id" class="swiper-slide">
        <citation :person="person"></citation>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Citation from '@/components/blocks/Citation.vue'
import { teams } from '~/static/utils/team'

export default {
  name: 'SwiperTeamCitations',
  components: {
    Citation,
  },
  data() {
    return {
      teams,
      swiperOption: {
        autoplay: true,
        loop: true,
        delay: 5000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // ...
      },
      people: [],
    }
  },
  created() {
    this.getPeople()
  },
  methods: {
    getPeople() {
      const people = []
      // eslint-disable-next-line no-unused-vars
      for (const [key, team] of Object.entries(this.teams)) {
        people.push(team)
      }
      let merged = [].concat.apply([], people)
      merged = merged.filter((person) => person.citations)
      this.people = this.$shuffle(merged)
    },
  },
}
</script>

<style>
.swiper-slide {
  cursor: grabbing;
}
.swiper-pagination-bullet {
}
.swiper-pagination-bullet-active {
  @apply bg-blue-useweb !important;
}
</style>
