<template lang="pug">
  main.main
    section.commercial
      button-switcher.commercial__switcher(:items="switchers" blue)
      commercial-banner-form

</template>

<script>
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
}
</script>
