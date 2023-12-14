<template lang="pug">
  main.main
    section.commercial
      button-back.color-blue(blue @click.prevent.native="$router.go(-1)") Back
      button-back.color-blue(blue :to="`/commercial/business?clientId=${$route.query.clientId}`") Back
      commercial-business-form

</template>

<script>
import {mapActions} from "vuex";

export default {
  middleware:['showCommercial'],
  mounted() {
    this.changeLanguage()
  },
  methods: {
    ...mapActions({
      CHANGE_LANGUAGE: 'correctText/SET_LANGUAGE'
    }),
    changeLanguage() {
      this.CHANGE_LANGUAGE('en')
    }
  }
}
</script>
