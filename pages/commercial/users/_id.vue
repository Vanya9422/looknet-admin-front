<template lang="pug">
  main.main
    section.commercial
      button-back.color-blue(blue :to="`/commercial/users?group=${$route.query.group}`") Back
      change-languages.pt-0(withoutPlus)
      commercial-user-form

</template>

<script>
export default {
  middleware: ['showCommercial'],
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
}
</script>

<style lang="scss">

</style>
