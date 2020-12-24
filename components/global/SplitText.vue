<template>
  <div class="split-text">
    <span :class="colorFirst" class="text-blue-useweb">
      {{ text[0] }}
    </span>
    <span :class="colorSecond" class="text-black">
      {{ text[1] }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'SplitText',
  props: {
    textToSplit: {
      type: String,
      default: '',
    },
    numberOfLines: {
      type: Number,
      default: 0,
    },
    colorFirst: {
      type: String,
      default: 'split-color-one',
    },
    colorSecond: {
      type: String,
      default: 'split-color-two',
    },
  },
  data() {
    return {
      text: '',
    }
  },
  created() {
    // this.text = this.splitText(this.textToSplit, this.numberOfLines)
    this.text = this.splitInTwo()
  },
  methods: {
    splitText(str, num) {
      // return str.match(new RegExp('(?:(?:^|\\s)\\S+){1,' + num + '}', 'g'))
    },
    splitInTwo() {
      // create array of words
      const stringSplitted = this.textToSplit.split(' ')
      // find middle of this array
      const stringSplittedMiddle = Math.ceil(stringSplitted.length / 2)
      // create two string with the first and the second part
      const firstPart = stringSplitted
        .slice(0, stringSplittedMiddle)
        .join(' ')
        .toLowerCase()
      const secondPart = stringSplitted
        .slice(stringSplittedMiddle)
        .join(' ')
        .toLowerCase()
      const text = [firstPart, secondPart]
      return text
    },
  },
}
</script>

<style lang="postcss" scoped>
.split-text {
  font-size: 4rem !important;
  letter-spacing: -7px;
}
</style>
