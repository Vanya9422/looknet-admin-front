<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Modal
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Error
            .correct-text__label.correct-text__label_small  Error
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
            form-input.correct-text__input(
              v-model="content.title"
              @input="$v.content.title.$touch()"
              :error="$v.content.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Default description
            form-input.correct-text__input(
              v-model="content.desc"
              @input="$v.content.desc.$touch()"
              :error="$v.content.desc.$error"
            )
    correct-text-save(@save="save()")

</template>

<script>
import { minLength, required } from "vuelidate/lib/validators";
import constructorPage from "@/mixins/constructorPage";

export default {
  data: () => ({
    loading: false,
    id: null,
    content: {
      title: 'Error!',
      desc: 'Unknown error',
    },
  }),
  validations: {
    content: {
      title: { required, minLength: minLength(2) },
      desc: { required, minLength: minLength(2) },
    }
  },
  mixins: [constructorPage],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
