<template lang="pug">
  main.main
    section.commercial
      button-back.color-blue(blue :to="`/commercial/users?group=${$route.query.group}`") Back
      commercial-user-form
</template>

<script>
import {mapActions} from "vuex";

export default {
  middleware:['showCommercial'],
  data() {
    return {
      switchers: [
        {
          value: 'For correctText',
          text: 'For correctText',
          checked: true
        },
        {
          value: 'For business',
          text: 'For business',
        },
      ],
    }
  },
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
