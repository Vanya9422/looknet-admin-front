<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Modal
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Modal
            .correct-text__label.correct-text__label_small Modal

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
              .correct-text__field-title.h4 Description
            form-input.correct-text__input(
              v-model="content.description"
              @input="$v.content.description.$touch()"
              :error="$v.content.description.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Cancel
            form-input.correct-text__input(
              v-model="content.cancel"
              @input="$v.content.description.$touch()"
              :error="$v.content.description.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Exit
            form-input.correct-text__input(
              v-model="content.exit"
              @input="$v.content.description.$touch()"
              :error="$v.content.description.$error"
            )

    correct-text-save(@save="save()")

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {minLength, required} from "vuelidate/lib/validators";
import constructorPage from "@/mixins/constructorPage";

export default {
  data() {
    return {
      loading: false,
      id: null,
      content: {
        title: 'Exit from site',
        description: 'Are you sure you want to log out of your account?'
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      description: {required, minLength: minLength(2)},
    }
  },
  mixins:[constructorPage],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
