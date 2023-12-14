<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Reset Page
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Header
            .correct-text__label.correct-text__label_small  Header
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Title
            form-input.correct-text__input(
              v-model="content.title"
              @input="$v.content.title.$touch()"
              :error="$v.content.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Description
            form-input.correct-text__input(
              v-model="content.description"
              @input="$v.content.description.$touch()"
              :error="$v.content.description.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Form
            .correct-text__label.correct-text__label_small  Form
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Phone
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Phone
            form-input.correct-text__input(
              v-model="content.email.phone"
              @input="$v.content.email.phone.$touch()"
              :error="$v.content.email.phone.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Email
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Email
            form-input.correct-text__input(
              v-model="content.email.email"
              @input="$v.content.email.email.$touch()"
              :error="$v.content.email.email.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Placeholder
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Placeholder
            form-input.correct-text__input(
              v-model="content.email.placeholder"
              @input="$v.content.email.placeholder.$touch()"
              :error="$v.content.email.placeholder.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Button
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Button
            form-input.correct-text__input(
              v-model="content.button"
              @input="$v.content.button.$touch()"
              :error="$v.content.button.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Text
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Text
            form-input.correct-text__input(
              v-model="content.text"
              @input="$v.content.text.$touch()"
              :error="$v.content.text.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Link
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Link
            form-input.correct-text__input(
              v-model="content.link"
              @input="$v.content.link.$touch()"
              :error="$v.content.link.$error"
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
      type: 'reset',
      id: null,
      content: {
        title: 'Password recovery',
        description: 'Enter the email address you used when you joined and we’ll send you instructions to reset your password.',
        email: {
          phone: 'Phone',
          email: 'Email',
          placeholder: 'Enter your phone number or email'
        },
        button: 'Send',
        text: 'Do you already have a profile?',
        link: 'Log in',
      },
      loading: false
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(3)},
      description: {required, minLength: minLength(3)},
      email: {
        phone: {required, minLength: minLength(3)},
        email: {required, minLength: minLength(3)},
        placeholder: {required, minLength: minLength(3)},
      },
      button: {required, minLength: minLength(3)},
      text: {required, minLength: minLength(3)},
      link: {required, minLength: minLength(3)},

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
