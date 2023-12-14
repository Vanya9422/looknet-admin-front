<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Modal
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Cookie
            .correct-text__label.correct-text__label_small  Cookie
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title 1
            form-input.correct-text__input(
              v-model="content.title1"
              @input="$v.content.title1.$touch()"
              :error="$v.content.title1.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title 2 (link)
            form-input.correct-text__input(
              v-model="content.title2"
              @input="$v.content.title2.$touch()"
              :error="$v.content.title2.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title 3
            form-input.correct-text__input(
              v-model="content.title3"
              @input="$v.content.title3.$touch()"
              :error="$v.content.title3.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Allow cookies
            form-input.correct-text__input(
              v-model="content.allow"
              @input="$v.content.allow.$touch()"
              :error="$v.content.allow.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Decline
            form-input.correct-text__input(
              v-model="content.decline"
              @input="$v.content.decline.$touch()"
              :error="$v.content.decline.$error"
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
      title1: "We use",
      title2: "cookies",
      title3: "on our website",
      allow: "Allow cookies",
      decline: "Decline",
    },
  }),
  validations: {
    content: {
      title1: { required, minLength: minLength(2) },
      title2: { required, minLength: minLength(2) },
      title3: { required, minLength: minLength(2) },
      allow: { required, minLength: minLength(2) },
      decline: { required, minLength: minLength(2) },
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
