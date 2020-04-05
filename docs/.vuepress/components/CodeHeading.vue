<template>
    <div :class="[ 'code-heading', colorClass ]">
        <slot/>
        <span v-if="path">
            <span class="expand">·</span><i>{{ path }}</i>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        path: String
    },
    computed: {
        colorClass() {
            return this.type ? `code-heading__${this.type}` : "code-heading__default";
        }
    }
}
</script>

<style lang="scss" scoped>
.code-heading {
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

    &__sh-output {
        background-color: #000000;

        &::before {
            content: "COMMAND OUTPUT";
        }
    }

    &__apache {
        background-color: #D22128;

        &::before {
            content: "APACHE";
        }
    }

    &__default {
        background-color: #4e6e8e;
    }
}
</style>