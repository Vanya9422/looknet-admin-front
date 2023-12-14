<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Footer
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Text
            .correct-text__label.correct-text__label_small  Text
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Copyright
            form-input.correct-text__input(
              v-model="content.сopyright"
              @input="$v.content.сopyright.$touch()"
              :error="$v.content.сopyright.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Links
            .correct-text__label.correct-text__label_small  Links
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Contacts
            form-input.correct-text__input(
              v-model="content.links.contacts"
              @input="$v.content.links.contacts.$touch()"
              :error="$v.content.links.contacts.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Support
            form-input.correct-text__input(
              v-model="content.links.support"
              @input="$v.content.links.support.$touch()"
              :error="$v.content.links.support.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Policy privicy
            form-input.correct-text__input(
              v-model="content.links.policy"
              @input="$v.content.links.policy.$touch()"
              :error="$v.content.links.policy.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Login
            form-input.correct-text__input(
              v-model="content.links.login"
              @input="$v.content.links.login.$touch()"
              :error="$v.content.links.login.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Register
            form-input.correct-text__input(
              v-model="content.links.register"
              @input="$v.content.links.register.$touch()"
              :error="$v.content.links.register.$error"
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
      type: 'footer',
      content: {
        сopyright: 'Copyright © 2023',
        links: {
          contacts: 'Contacts',
          support: 'Support',
          policy: 'Policy privicy',
          login: 'Login',
          register: 'Register',
        },
      },
    }
  },
  validations: {
    content: {
      сopyright: {required, minLength: minLength(2)},
      links: {
        contacts: {required, minLength: minLength(2)},
        support: {required, minLength: minLength(2)},
        policy: {required, minLength: minLength(2)},
        login: {required, minLength: minLength(2)},
        register: {required, minLength: minLength(2)},
      },
    },
  },
  mixins:[constructorPage],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
