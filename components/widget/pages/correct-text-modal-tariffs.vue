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
              .correct-text__field-title.h4 Description
            form-input.correct-text__input(
              v-model="content.desc"
              @input="$v.content.desc.$touch()"
              :error="$v.content.desc.$error"
            )
          //- .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Pery month
            form-input.correct-text__input(
              v-model="content.month"
              @input="$v.content.month.$touch()"
              :error="$v.content.month.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Choose
            form-input.correct-text__input(
              v-model="content.choose"
              @input="$v.content.choose.$touch()"
              :error="$v.content.choose.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 More
            form-input.correct-text__input(
              v-model="content.more"
              @input="$v.content.more.$touch()"
              :error="$v.content.more.$error"
            )
    correct-text-save(@save="save()")

</template>

<script>
import constructorPage from "@/mixins/constructorPage";
import tariffs from "@/mixins/pages/modal/tariffs";
export default {
  mixins:[constructorPage,tariffs],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
