<template lang="pug">
  main.main
    section.commercial
      button-back.color-blue(blue :to="`/commercial/business?clientId=${$route.query.clientId}`") Back
      .commercial__column.commercial__column_left
        change-languages.pt-0(withoutPlus)
      commercial-business-form

</template>

<script>
export default {
  middleware:['showCommercial'],
}
</script>
