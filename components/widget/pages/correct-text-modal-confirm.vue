<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Modal
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Confirm
            .correct-text__label.correct-text__label_small  Confirm
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Send
            form-input.correct-text__input(
              v-model="content.send"
              @input="$v.content.send.$touch()"
              :error="$v.content.send.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Resend code
            form-input.correct-text__input(
              v-model="content.resendCode"
              @input="$v.content.resendCode.$touch()"
              :error="$v.content.resendCode.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Send the code again
            form-input.correct-text__input(
              v-model="content.sendCodeAgain"
              @input="$v.content.sendCodeAgain.$touch()"
              :error="$v.content.sendCodeAgain.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Confirm Email
            .correct-text__label.correct-text__label_small Confirm Email
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
            form-input.correct-text__input(
              v-model="content.confirmEmail.title"
              @input="$v.content.confirmEmail.title.$touch()"
              :error="$v.content.confirmEmail.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description
            form-input.correct-text__input(
              v-model="content.confirmEmail.desc"
              @input="$v.content.confirmEmail.desc.$touch()"
              :error="$v.content.confirmEmail.desc.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Confirm Phone
            .correct-text__label.correct-text__label_small Confirm Phone
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
            form-input.correct-text__input(
              v-model="content.confirmPhone.title"
              @input="$v.content.confirmPhone.title.$touch()"
              :error="$v.content.confirmPhone.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description
            form-input.correct-text__input(
              v-model="content.confirmPhone.desc"
              @input="$v.content.confirmPhone.desc.$touch()"
              :error="$v.content.confirmPhone.desc.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Confirmation type
            .correct-text__label.correct-text__label_small  Confirmation type
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
            form-input.correct-text__input(
              v-model="content.confirmation.title"
              @input="$v.content.confirmation.title.$touch()"
              :error="$v.content.confirmation.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description
            form-input.correct-text__input(
              v-model="content.confirmation.desc"
              @input="$v.content.confirmation.desc.$touch()"
              :error="$v.content.confirmation.desc.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Email
            form-input.correct-text__input(
              v-model="content.confirmation.email"
              @input="$v.content.confirmation.email.$touch()"
              :error="$v.content.confirmation.email.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 SMS
            form-input.correct-text__input(
              v-model="content.confirmation.sms"
              @input="$v.content.confirmation.sms.$touch()"
              :error="$v.content.confirmation.sms.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Send
            form-input.correct-text__input(
              v-model="content.confirmation.send"
              @input="$v.content.confirmation.send.$touch()"
              :error="$v.content.confirmation.send.$error"
            )
    correct-text-save(@save="save()")

</template>

<script>
import {minLength, required} from "vuelidate/lib/validators";
import constructorPage from "@/mixins/constructorPage";

export default {
  data() {
    return {
      loading: false,
      id: null,
      content: {
        send: 'Send',
        resendCode: 'Resend code',
        sendCodeAgain: 'Send the code again',
        confirmEmail: {
          title: 'Confirm your Email',
          desc: 'Enter the code from the Email',
        },
        confirmPhone: {
          title: 'Confirm your Phone',
          desc: 'Enter the code from the SMS',
        },
        confirmation: {
          title: 'Contact method for confirmation',
          desc: 'You must receive confirmation to apply the change. Select one of the options provided:',
          email: 'Email',
          sms: 'SMS',
          send: 'Send',
        },
      },
    }
  },
  validations: {
    content: {
      send: {required, minLength: minLength(2)},
      resendCode: {required, minLength: minLength(2)},
      sendCodeAgain: {required, minLength: minLength(2)},
      confirmEmail: {
        title: {required, minLength: minLength(2)},
        desc: {required, minLength: minLength(2)},
      },
      confirmPhone: {
        title: {required, minLength: minLength(2)},
        desc: {required, minLength: minLength(2)},
      },
      confirmation: {
        title: {required, minLength: minLength(2)},
        desc: {required, minLength: minLength(2)},
        email: {required, minLength: minLength(2)},
        sms: {required, minLength: minLength(2)},
        send: {required, minLength: minLength(2)},
      },
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
