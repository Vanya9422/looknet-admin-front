<template lang="pug">
  main.main
    part-correct-head(title="Categories corrections")
      button-primary.correct-head__btn(blue icon="plusBig" v-b-modal.modal-category) Add category
    section-correct-categories
    modal-thank

</template>
<script>
export default {
  middleware: ['showRedactionCategory']
}
</script>

<style lang="scss">
.correct-head {
  &__row, &__column_right {
    flex-wrap: nowrap;
  }

  &__title {
    @include large-tablet {
      font-size: 24rem;
    }
  }

  &__btn {
    @include small-tablet {
      display: none;
 } 
   }
}
</style>
