<template>
  <main class="main">
    <part-correct-head></part-correct-head>
    <section-correct-text>
      <modal-thank @close="SET_OPEN_MODAL"></modal-thank>
      <template v-if="PAGE">
        <component
          v-if="showComponent"
          :is="showComponent"
        />
      </template>
    </section-correct-text>
  </main>
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
