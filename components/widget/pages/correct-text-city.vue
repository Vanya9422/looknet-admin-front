<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Modal
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Modal
            .correct-text__label.correct-text__label_small  Modal
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
            .correct-text__label.h4.min-tablet-hidden Search
            .correct-text__label.correct-text__label_small  Search
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Search
            form-input.correct-text__input(
              v-model="content.search"
              @input="$v.content.search.$touch()"
              :error="$v.content.search.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Automatically
            .correct-text__label.correct-text__label_small  Automatically
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Detect automatically
            form-input.correct-text__input(
              v-model="content.automatically"
              @input="$v.content.automatically.$touch()"
              :error="$v.content.automatically.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden City
            .correct-text__label.correct-text__label_small  City
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 City
            form-input.correct-text__input(
              v-model="content.city"
              @input="$v.content.city.$touch()"
              :error="$v.content.city.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden State
            .correct-text__label.correct-text__label_small  State
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 State
            form-input.correct-text__input(
              v-model="content.state"
              @input="$v.content.state.$touch()"
              :error="$v.content.state.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden no Data
            .correct-text__label.correct-text__label_small  no Data
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 no Data
            form-input.correct-text__input(
              v-model="content.noData"
              @input="$v.content.noData.$touch()"
              :error="$v.content.noData.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Is it your city?
            .correct-text__label.correct-text__label_small  Is it your city?
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Is it your city?
            form-input.correct-text__input(
              v-model="content.isItYourCity"
              @input="$v.content.isItYourCity.$touch()"
              :error="$v.content.isItYourCity.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden We can’t find your city
            .correct-text__label.correct-text__label_small  We can’t find your city
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 We can’t find your city
            form-input.correct-text__input(
              v-model="content.weCantFindYourCity"
              @input="$v.content.weCantFindYourCity.$touch()"
              :error="$v.content.weCantFindYourCity.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Can't take location
            .correct-text__label.correct-text__label_small  Can't take location
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Can't take location
            form-input.correct-text__input(
              v-model="content.cantTakeLocation"
              @input="$v.content.cantTakeLocation.$touch()"
              :error="$v.content.cantTakeLocation.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Can't take city
            .correct-text__label.correct-text__label_small  Can't take city
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Can't take city
            form-input.correct-text__input(
              v-model="content.cantTakeCity"
              @input="$v.content.cantTakeCity.$touch()"
              :error="$v.content.cantTakeCity.$error"
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
        title: 'Choose a city',
        search:'Your city',
        automatically:'Detect automatically',
        city:'City',
        state:'State',
        noData:'no Data',
        isItYourCity: 'Is it your city?',
        weCantFindYourCity: 'We can’t find your city',
        cantTakeLocation: `Can't take location`,
        cantTakeCity: `Can't take city`,
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      search: {required, minLength: minLength(2)},
      automatically: {required, minLength: minLength(2)},
      city: {required, minLength: minLength(2)},
      state: {required, minLength: minLength(2)},
      noData: {required, minLength: minLength(2)},
      isItYourCity: {required, minLength: minLength(2)},
      weCantFindYourCity: {required, minLength: minLength(2)},
      cantTakeLocation: {required, minLength: minLength(2)},
      cantTakeCity: {required, minLength: minLength(2)},
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
