<template>
  <div
    id="app"
    class="container mx-auto bg-white border-grey-light border mt-20"
  >
    <accordion title="Trevor Belmont">
      <p class="pb-5">
        Lorem ipsum dolor sit amet, ut alii voluptaria est, ad illum inimicus
        deterruisset eam. His eu bonorum adipisci definiebas, no vis nostrud
        conclusionemque. Ad his virtute accusata, pro habemus singulis
        temporibus ut, ne bonorum dolores euripidis quo. No nam amet erant
        intellegebat. Rationibus instructior id pri, vis case abhorreant ea, id
        sea meis feugiat.
      </p>

      <p class="pb-5">
        Ut vel percipit facilisi, sea partem veritus mandamus eu, at debet
        deleniti eos. Iudico suscipit mel ut. Per ad habeo sadipscing
        concludaturque. Pri lorem fastidii in, accusam honestatis signiferumque
        est ut, ea eos omnium senserit reprehendunt. Eu est nibh invenire.
      </p>
    </accordion>
    <accordion title="Alucard">
      <p class="pb-5">
        Lorem ipsum dolor sit amet, ut alii voluptaria est, ad illum inimicus
        deterruisset eam. His eu bonorum adipisci definiebas, no vis nostrud
        conclusionemque. Ad his virtute accusata, pro habemus singulis
        temporibus ut, ne bonorum dolores euripidis quo. No nam amet erant
        intellegebat. Rationibus instructior id pri, vis case abhorreant ea, id
        sea meis feugiat.
      </p>

      <p class="pb-5">
        Ut vel percipit facilisi, sea partem veritus mandamus eu, at debet
        deleniti eos. Iudico suscipit mel ut. Per ad habeo sadipscing
        concludaturque. Pri lorem fastidii in, accusam honestatis signiferumque
        est ut, ea eos omnium senserit reprehendunt. Eu est nibh invenire.
      </p>
    </accordion>
    <accordion title="Sypha Belnades">
      <p class="pb-5">
        Lorem ipsum dolor sit amet, ut alii voluptaria est, ad illum inimicus
        deterruisset eam. His eu bonorum adipisci definiebas, no vis nostrud
        conclusionemque. Ad his virtute accusata, pro habemus singulis
        temporibus ut, ne bonorum dolores euripidis quo. No nam amet erant
        intellegebat. Rationibus instructior id pri, vis case abhorreant ea, id
        sea meis feugiat.
      </p>

      <p class="pb-5">
        Ut vel percipit facilisi, sea partem veritus mandamus eu, at debet
        deleniti eos. Iudico suscipit mel ut. Per ad habeo sadipscing
        concludaturque. Pri lorem fastidii in, accusam honestatis signiferumque
        est ut, ea eos omnium senserit reprehendunt. Eu est nibh invenire.
      </p>
    </accordion>
  </div>
  <!-- #app -->
</template>

<script>
export default {
  name: 'Collapsable',
  components: {
    // accordion
  },
  props: ['title'],
  data() {
    return {
      active: false,
      template: `
    <div class="">
        <div class="tab__header">
            <a href="#" class="tab__link p-4 block bg-blue-dark hover:bg-blue-darker no-underline text-white border-b-2 border-white flex justify-between" @click.prevent="active = !active">
                <strong>{{title}}</strong>
                <span class="down-Arrow" v-show="!active">&#9660;</span>
                <span class="up-Arrow" v-show="active">&#9650;</span>
            </a>
        </div>
        <div class="tab__content p-2" v-show="active"><slot /></div>
    </div>
    `,
    }
  },
}
</script>

<style lang="stylus">
body {
  background-color: #f1f5f8;
}
</style>
