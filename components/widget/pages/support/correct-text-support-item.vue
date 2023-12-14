<template lang="pug">
  .correct-text__section
    .correct-text__row.flex
      .correct-text__column.correct-text__column_left
        .correct-text__label.correct-text__label_small.tablet-hidden FAQ
      .correct-text__column.correct-text__column_right
        .correct-text__field
          .correct-text__field-head.flex.flex_vertical.flex_justify
            .correct-text__label.correct-text__label_small.min-tablet-hidden FAQ
        .accordion__list
          .correct-text__field.correct-text__box(v-for="(item,index) in accordion" :key="index" )
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Category {{index + 1 }}
            part-correct-field.correct-text__input(v-model="item.name" @close="$emit('delete',{index})" )
            .content-text__field__inner
              .correct-text__field
              .correct-text__field(v-for="(i,ind) in item.list" :key="ind")
                .correct-text__field
                  .correct-text__field-head.flex.flex_vertical.flex_justify
                    .correct-text__field-title.h4 Title {{ind + 1}}
                  part-correct-field.correct-text__input(v-model="i.title" @close="$emit('delete',{index, ind})" )
                .correct-text__field
                  .correct-text__field-head.flex.flex_vertical.flex_justify
                    .correct-text__field-title.h4 Description {{ind + 1}}
                  form-textarea(v-model="i.desc")
              button-primary.correct-text__more(gray icon="plusBig" @click.prevent.native="$emit('add',index)") One more
        button-primary.correct-text__more(gray icon="plusBig" @click.prevent.native="$emit('addAccordion')") One more

</template>

<script>
export default {
  props: {
    accordion: {
      type: [Array, Object],
      require: true
    }
  },
}
</script>

<style scoped>

</style>
