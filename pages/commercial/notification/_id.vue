<template lang="pug">
  main.main
    section.commercial
      button-back.color-blue(blue :to="`/commercial/notification`") Back
      .commercial__column.commercial__column_left
        change-languages.pt-0(withoutPlus)
      commercial-notifications-form

</template>

<script>
export default {
  middleware:['showCommercial'],
  data() {
    return {}
  },
}
</script>
