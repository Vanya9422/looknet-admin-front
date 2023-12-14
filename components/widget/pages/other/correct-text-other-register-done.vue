<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(:key="key" v-if="loading")
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
              .correct-text__field-title.h4 Title 1
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Title 1
            form-input.correct-text__input(
              v-model="content.welcome"
              @input="$v.content.welcome.$touch()"
              :error="$v.content.welcome.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title 2
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Title 2
            form-input.correct-text__input(
              v-model="content.welcome2"
              @input="$v.content.welcome2.$touch()"
              :error="$v.content.welcome2.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Description
            form-input.correct-text__input(
              v-model="content.desc"
              @input="$v.content.desc.$touch()"
              :error="$v.content.desc.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Avatar
            .correct-text__label.correct-text__label_small  Avatar
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Title
            form-input.correct-text__input(
              v-model="content.avatar.title"
              @input="$v.content.avatar.title.$touch()"
              :error="$v.content.avatar.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Description
            form-input.correct-text__input(
              v-model="content.avatar.desc"
              @input="$v.content.avatar.desc.$touch()"
              :error="$v.content.avatar.desc.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Where
            .correct-text__label.correct-text__label_small  Where
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Where
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Where
            form-input.correct-text__input(
              v-model="content.where"
              @input="$v.content.where.$touch()"
              :error="$v.content.where.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Edit
            .correct-text__label.correct-text__label_small  Edit
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Edit
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Edit
            form-input.correct-text__input(
              v-model="content.edit"
              @input="$v.content.edit.$touch()"
              :error="$v.content.edit.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Next
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Next
            form-input.correct-text__input(
              v-model="content.next"
              @input="$v.content.next.$touch()"
              :error="$v.content.next.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Skip
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Skip
            form-input.correct-text__input(
              v-model="content.skip"
              @input="$v.content.skip.$touch()"
              :error="$v.content.skip.$error"
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
      type: 'register-done',
      id: null,
      content: {
        welcome: 'Welcome ',
        welcome2: 'Let`s create your profile',
        desc: 'Let others get know you better! You can do these later',
        avatar: {
          title: 'Add an avatar',
          desc: 'Add your photo for answers, comments and reviews',
        },
        where: 'Are you here?',
        edit: 'Edit',
        next: 'Next',
        skip: 'Skip',
      },
      loading: false
    }
  },
  validations: {
    content: {
      welcome: {required, minLength: minLength(3)},
      welcome2: {required, minLength: minLength(3)},
      desc: {required, minLength: minLength(3)},
      avatar: {
        title: {required, minLength: minLength(3)},
        desc: {required, minLength: minLength(3)},
      },
      where: {required, minLength: minLength(3)},
      edit: {required, minLength: minLength(3)},
      next: {required, minLength: minLength(3)},
      skip: {required, minLength: minLength(3)},
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
