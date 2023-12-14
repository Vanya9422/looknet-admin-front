<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Modal
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Statistics
            .correct-text__label.correct-text__label_small  Statistics
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
              .correct-text__field-title.h4 Name
            form-input.correct-text__input(
              v-model="content.name"
              @input="$v.content.name.$touch()"
              :error="$v.content.name.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description
            form-input.correct-text__input(
              v-model="content.description"
              @input="$v.content.description.$touch()"
              :error="$v.content.description.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Modal list
            .correct-text__label.correct-text__label_small  Modal list
        .correct-text__column.correct-text__column_right
          template(v-for="(item,index) in content.list" )
            .correct-text__field(:key="index")
              .correct-text__field-head.flex.flex_vertical.flex_justify
                .correct-text__field-title.h4 Title
              form-input.correct-text__input(
                v-model="item.title"
                @input="$v.content.list.$each[index].title.$touch()"
                :error="$v.content.list.$each[index].title.$error"
              )
            .correct-text__field
              .correct-text__field-head.flex.flex_vertical.flex_justify
                .correct-text__field-title.h4 Description
              form-input.correct-text__input(
                v-model="item.text"
                @input="$v.content.list.$each[index].text.$touch()"
                :error="$v.content.list.$each[index].text.$error"
              )

    correct-text-save(@save="save()")

</template>

<script>
import constructorPage from "@/mixins/constructorPage";
import statistics from "@/mixins/pages/modal/statistics";

export default {
  mixins: [constructorPage, statistics],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
