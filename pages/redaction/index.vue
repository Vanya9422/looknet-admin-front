<template lang="pug">
  main.main
    part-correct-head
    section-correct-text
      modal-thank(@close="SET_OPEN_MODAL")
      //correct-text-support
      template(v-if="PAGE")
        component(:is="showComponent" v-if="showComponent")
      //correct-text-contact

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  middleware: ['showRedactionSite'],
  computed: {
    ...mapGetters({
      OPEN_MODAL: 'correctText/OPEN_MODAL',
      CORRECT: 'correctText/CORRECT',
      PAGE: 'correctText/PAGE'
    }),
    showComponent() {
      return `correct-text-${this.PAGE}`
    }
  },
  watch:{
    OPEN_MODAL(){
      console.log(this.OPEN_MODAL)
      if(this.OPEN_MODAL === true) this.$bvModal.show('modal-thank')
    }
  },
  methods:{
    ...mapActions({
      SET_OPEN_MODAL:'correctText/SET_OPEN_MODAL'
    })
  }
}
</script>
