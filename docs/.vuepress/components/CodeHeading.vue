<template>
  <div style="position: relative">
    <div
      v-if="notReachable"
      class="not-reachable"
    />
    <div
      v-if="hasHead"
      :class="[ 'code-heading', colorClass ]"
    >
      <span v-if="path">
        <span class="expand">·</span><i>{{ path }}</i>
      </span>
    </div>
    <slot />
    <div
      v-if="copiable && notReachableConsequences"
      v-clipboard:copy="content"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="copy-it"
      :class="{'forward-head': hasHead}"
    >
      <icon-base
        name="copy"
        variant="text-icon"
        height="25"
        width="25"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeHeading',
  props: {
    type: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    copiable: {
      type: Boolean,
      default: true,
    },
    hasHead: {
      type: Boolean,
      default: true,
    },
    notReachable: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      content: '',
      notReachableConsequences: true,
    }
  },
  computed: {
    colorClass () {
      return this.type ? `code-heading__${this.type}` : 'code-heading__default'
    },
  },
  mounted () {
    if (Object.keys(this.$slots).length !== 0) {
      this.getSlotContent(this.$slots.default[0].elm)
    }
    if (this.notReachable) {
      this.notReachableConsequences = false
    }
  },
  methods: {
    getSlotContent (element) {
      const content = element.innerText || element.textContent
      this.content = content
    },
    onCopy: function (e) {
      // this.$toasted.show('Sucessfully copied!')
      console.log(e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    },
  },
}
</script>

<style lang="stylus">
.not-reachable
  position absolute
  z-index 4
  top 0
  left 0
  right 0
  bottom 0
.copy-it {
    position absolute
    display flex
    top: 0rem
    right 0
    color white
    z-index 3
    height 3rem
    width 3rem
    transition background-color 0.3s
    cursor pointer
    &:hover {
        background-color rgba(0, 0, 0, .5)
        svg {
          fill red !important
        }
    }
    span {
      position absolute
      z-index 2
      margin auto
      svg {
        color white
        transition fill 0.3s
      }
    }
}
.code-heading {
    position relative
    z-index 3
    width: 100%;
    height: 45px;
    line-height: 40px;
    font-weight: bold;
    font-size: 12px;
    margin-bottom: -20px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    text-align: left;
    padding: 0 20px;
    box-sizing: border-box;
    color: white;

    .expand {
        padding: 0 0.5rem;
    }

    &__bad {
        background-color: #cc0000;

        &::before {
            content: "BAD";
        }
    }

    &__good {
    background-color: #3eaf7c;

        &::before {
            content: "GOOD";
        }
    }

    &__nginx {
        background-color: #269539;

        &::before {
            content: "NGINX";
        }
    }

    &__json {
        background-color: #000000;

        &::before {
            content: "JSON";
        }
    }

    &__js {
        color: #000000;
        background-color: #F7DF1E;

        &::before {
            content: "JS";
        }
    }

    &__env {
        background-color: #000000;

        &::before {
            content: "DOTENV";
        }
    }

    &__sh {
        background-color: #000000;

        &::before {
            content: "SH";
        }
    }

    &__apache {
        background-color: #D22128;

        &::before {
            content: "APACHE";
        }
    }

    &__ini {
        background-color: #000000;

        &::before {
            content: "INI";
        }
    }

    &__output {
        background-color: #000000;

        &::before {
            content: "Terminal output";
        }
    }

    &__mysql {
        background-color: #4479A1;

        &::before {
            content: "MySQL";
        }
    }

    &__psa {
        background-color: #012456;

        &::before {
            content: "PowerShell Admin";
        }
    }

    &__ps {
        background-color: #012456;

        &::before {
            content: "PowerShell";
        }
    }

    &__php {
        background-color: #777BB4;

        &::before {
            content: "PHP";
        }
    }

    &__default {
        background-color: #4e6e8e;
    }
}
</style>
