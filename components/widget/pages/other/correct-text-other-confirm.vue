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
              .correct-text__field-title.h4 Title Email
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Title Email
            form-input.correct-text__input(
              v-model="content.titleEmail"
              @input="$v.content.titleEmail.$touch()"
              :error="$v.content.titleEmail.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title Phone
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Title Phone
            form-input.correct-text__input(
              v-model="content.titlePhone"
              @input="$v.content.titlePhone.$touch()"
              :error="$v.content.titlePhone.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Send the code again
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Send the code again
            form-input.correct-text__input(
              v-model="content.codeAgain"
              @input="$v.content.codeAgain.$touch()"
              :error="$v.content.codeAgain.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Reset
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Reset
            form-input.correct-text__input(
              v-model="content.codeReset"
              @input="$v.content.codeReset.$touch()"
              :error="$v.content.codeReset.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Reset ofter
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Reset ofter
            form-input.correct-text__input(
              v-model="content.codeResetText"
              @input="$v.content.codeResetText.$touch()"
              :error="$v.content.codeResetText.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Go to the mail
              .correct-text__label.correct-text__label_small.min-tablet-hidden Go to the mail
            form-input.correct-text__input(
              v-model="content.goToTheMail"
              @input="$v.content.goToTheMail.$touch()"
              :error="$v.content.goToTheMail.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Email
            .correct-text__label.correct-text__label_small  Email
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description 1
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Description 1
            form-input.correct-text__input(
              v-model="content.isEmail.desc1"
              @input="$v.content.isEmail.desc1.$touch()"
              :error="$v.content.isEmail.desc1.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description 2
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Description 2
            form-input.correct-text__input(
              v-model="content.isEmail.desc2"
              @input="$v.content.isEmail.desc2.$touch()"
              :error="$v.content.isEmail.desc2.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description 3
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Description 4
            form-input.correct-text__input(
              v-model="content.isEmail.desc3"
              @input="$v.content.isEmail.desc3.$touch()"
              :error="$v.content.isEmail.desc3.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Phone
            .correct-text__label.correct-text__label_small  Phone
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description 1
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Description 1
            form-input.correct-text__input(
              v-model="content.isPhone.desc1"
              @input="$v.content.isPhone.desc1.$touch()"
              :error="$v.content.isPhone.desc1.$error"
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
import {minLength, required} from "vuelidate/lib/validators";
import constructorPage from "@/mixins/constructorPage";

export default {
  data() {
    return {
      type: 'confirm',
      id: null,
      content: {
        titleEmail: 'Confirm your Email',
        titlePhone: 'Confirm your Phone',
        email: {
          label: 'Phone or mail',
          placeholder: 'Enter your phone number or email',
        },
        isEmail: {
          desc1: 'To continue registration, follow the link in the email, we sent it to.',
          desc2: 'If you have not received it, then click ',
          desc3: 'or write to',
        },
        isPhone: {
          desc1: 'Enter the code from the SMS',
        },
        codeReset: 'Resend code',
        codeResetText: 'Resend after ',
        codeAgain: 'Send the code again',
        goToTheMail: 'Go to the mail',
        button: 'Send',
        text: 'Do you already have a profile?',
        link: 'Log in',
      },
      loading: false
    }
  },
  validations: {
    content: {
      titleEmail: {required, minLength: minLength(3)},
      titlePhone: {required, minLength: minLength(3)},
      codeReset: {required, minLength: minLength(3)},
      codeResetText: {required, minLength: minLength(3)},
      // description: {required, minLength: minLength(3)},
      isEmail: {
        desc1: {required, minLength: minLength(3)},
        desc2: {required, minLength: minLength(3)},
        desc3: {required, minLength: minLength(3)},
      },
      isPhone: {
        desc1: {required, minLength: minLength(3)},
      },
      codeAgain: {required, minLength: minLength(3)},
      goToTheMail: {required, minLength: minLength(3)},
      button: {required, minLength: minLength(3)},
      text: {required, minLength: minLength(3)},
      link: {required, minLength: minLength(3)},

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
