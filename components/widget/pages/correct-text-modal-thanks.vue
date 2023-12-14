<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Modal
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden From
            .correct-text__label.correct-text__label_small  From
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
              .correct-text__field-title.h4 Button
            form-input.correct-text__input(
              v-model="content.btn"
              @input="$v.content.btn.$touch()"
              :error="$v.content.btn.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Password changed successfully
            form-input.correct-text__input(
              v-model="content.passwordChanged"
              @input="$v.content.passwordChanged.$touch()"
              :error="$v.content.passwordChanged.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Password restored successfully
            form-input.correct-text__input(
              v-model="content.passwordRestored"
              @input="$v.content.passwordRestored.$touch()"
              :error="$v.content.passwordRestored.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 This changes have been saved
            form-input.correct-text__input(
              v-model="content.changesSaved"
              @input="$v.content.changesSaved.$touch()"
              :error="$v.content.changesSaved.$error"
            )
    correct-text-save(@save="save()")

</template>

<script>
import { minLength, required } from "vuelidate/lib/validators";
import constructorPage from "@/mixins/constructorPage";

export default {
  data() {
    return {
      loading: false,
      id: null,
      content: {
        title: 'Thank you!',
        passwordChanged: 'Password changed successfully',
        passwordRestored: 'Password restored successfully',
        changesSaved: 'This changes have been saved',
        btn: 'Back to home page',
      },
    }
  },
  validations: {
    content: {
      title: { required, minLength: minLength(2) },
      passwordChanged: { required, minLength: minLength(2) },
      passwordRestored: { required, minLength: minLength(2) },
      changesSaved: { required, minLength: minLength(2) },
      btn: { required, minLength: minLength(2) }
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
