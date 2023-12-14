<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(:key="key" v-if="loading")
    h3.correct-text__label.h3.tablet-hidden Password error
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Errors
            .correct-text__label.correct-text__label_small  Errors
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Lowercase letter
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Lowercase letter
            form-input.correct-text__input(
              v-model="content.lowerCaseLetters"
              @input="$v.content.lowerCaseLetters.$touch()"
              :error="$v.content.lowerCaseLetters.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Uppercase letter
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Uppercase letter
            form-input.correct-text__input(
              v-model="content.upperCaseLetters"
              @input="$v.content.upperCaseLetters.$touch()"
              :error="$v.content.upperCaseLetters.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Numbers
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Numbers
            form-input.correct-text__input(
              v-model="content.numbers"
              @input="$v.content.numbers.$touch()"
              :error="$v.content.numbers.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Symbols
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Symbols
            form-input.correct-text__input(
              v-model="content.symbols"
              @input="$v.content.symbols.$touch()"
              :error="$v.content.symbols.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Length Text
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Length Text
            form-input.correct-text__input(
              v-model="content.lengthText"
              @input="$v.content.lengthText.$touch()"
              :error="$v.content.lengthText.$error"
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
      type: 'password-error',
      id: null,
      content: {
          lowerCaseLetters: 'Must contain a lowercase letter.',
          upperCaseLetters: 'Must contain an uppercase letter.',
          numbers: 'Must contain a number.',
          symbols: 'Must contain a special character.',
          lengthText: 'Must be at least 8 characters long.'
        },
      loading: false
    }
  },
  validations: {
    content: {
      lowerCaseLetters: {required, minLength: minLength(3)},
      upperCaseLetters: {required, minLength: minLength(3)},
      numbers: {required, minLength: minLength(3)},
      symbols: {required, minLength: minLength(3)},
      lengthText: {required, minLength: minLength(3)},
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
