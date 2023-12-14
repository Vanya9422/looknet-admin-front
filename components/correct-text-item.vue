<template lang="pug">
  .correct-text__section
    .correct-text__row.flex
      .correct-text__column.correct-text__column_left
        .correct-text__section-head.flex.flex_vertical.flex_justify
          .correct-text__label.h4.min-tablet-hidden {{name}}
          .correct-text__label.correct-text__label_small  {{name}}
      .correct-text__column.correct-text__column_right
        slot
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 {{title}}
            form-input.correct-text__input(
              :value="value"
              @input="(val)=>$emit('input',val)"
              :error="error"
            )

</template>


<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    }
  }
}
</script>

