<template>
    <div v-if="isDisplay">
        <div v-for="(sshKey,ssKeyId) in sshKeys" :key="ssKeyId">
            <h2>{{ sshKey.computerName }}</h2>
            <pre
                class="ssh-key"
                v-html="sshKey.sshKey"
                v-clipboard:copy="sshKey.sshKey"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            ></pre>
        </div>
    </div>
</template>

<script>
import { sshKeys } from '../env'
import { checkAuthValid } from '../login/helper'

export default {
    data() {
        return {
            sshKeys: sshKeys,
            isDisplay: false
        }
    },
    mounted() {
        this.auth()
    },
    methods: {
        auth() {
            if (checkAuthValid()) {
                this.isDisplay = true
            }
        },
        onCopy(e) {
            this.$dlg.toast('You copied this in your clipboard!', function(){}, {
                messageType: 'success',
                language: 'en',
                closeTime: 1.5
            })
        },
        onError(e) {
            this.$dlg.toast('Error when copy this!', function(){}, {
                messageType: 'error',
                language: 'en',
                closeTime: 1.5
            })
        }
    },
}
</script>

<style lang="scss">
// .ssh-key {
//     color: white;
//     white-space: pre-wrap !important;
//     cursor: pointer;
//     transition: background-color 0.3s ease-in-out;
//     &:hover {
//         background-color: #373b44;
//     }
// }
.v-dialog-toast__container {
    height: 80px;
}
</style>