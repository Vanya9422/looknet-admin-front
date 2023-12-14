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
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Name
            .correct-text__label.correct-text__label_small  Name
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Label
            form-input.correct-text__input(
              v-model="content.name.label"
              @input="$v.content.name.label.$touch()"
              :error="$v.content.name.label.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Placeholder
            form-input.correct-text__input(
              v-model="content.name.placeholder"
              @input="$v.content.name.placeholder.$touch()"
              :error="$v.content.name.placeholder.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Email
            .correct-text__label.correct-text__label_small  Email
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Label
            form-input.correct-text__input(
              v-model="content.email.label"
              @input="$v.content.email.label.$touch()"
              :error="$v.content.email.label.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Placeholder
            form-input.correct-text__input(
              v-model="content.email.placeholder"
              @input="$v.content.email.placeholder.$touch()"
              :error="$v.content.email.placeholder.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Theme
            .correct-text__label.correct-text__label_small  Theme
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Label
            form-input.correct-text__input(
              v-model="content.theme.label"
              @input="$v.content.theme.label.$touch()"
              :error="$v.content.theme.label.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Question
            .correct-text__label.correct-text__label_small  Question
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Label
            form-input.correct-text__input(
              v-model="content.question.label"
              @input="$v.content.question.label.$touch()"
              :error="$v.content.question.label.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Placeholder
            form-input.correct-text__input(
              v-model="content.question.placeholder"
              @input="$v.content.question.placeholder.$touch()"
              :error="$v.content.question.placeholder.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Bottom
            .correct-text__label.correct-text__label_small  Bottom
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Checkbox
            form-input.correct-text__input(
              v-model="content.checkbox"
              @input="$v.content.checkbox.$touch()"
              :error="$v.content.checkbox.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Error
            form-input.correct-text__input(
              v-model="content.error"
              @input="$v.content.error.$touch()"
              :error="$v.content.error.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Send
            form-input.correct-text__input(
              v-model="content.send"
              @input="$v.content.send.$touch()"
              :error="$v.content.send.$error"
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
        title: 'Need our help?',
        name:{
          label:'Your name',
          placeholder:'Enter your name'
        },
        email:{
          label:'Your E-mail',
          placeholder:'Enter your E-mail'
        },
        theme:{
          label:'Choose theme'
        },
        question:{
          label:'Enter your question',
          placeholder:'Tell us about the product'
        },
        checkbox:'I agree with rules of this system',
        error:' Max 5 documents\\images',
        send:'Send form'
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      name:{
        label:{required, minLength: minLength(2)},
        placeholder:{required, minLength: minLength(2)},
      },
      email:{
        label:{required, minLength: minLength(2)},
        placeholder:{required, minLength: minLength(2)},
      },
      theme:{
        label:{required, minLength: minLength(2)},
      },
      question:{
        label:{required, minLength: minLength(2)},
        placeholder:{required, minLength: minLength(2)},
      },
      checkbox: {required, minLength: minLength(2)},
      error: {required, minLength: minLength(2)},
      send: {required, minLength: minLength(2)}
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
