<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Title
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Title
            .correct-text__label.correct-text__label_small  Title
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
            .correct-text__label.h4.min-tablet-hidden Nav
            .correct-text__label.correct-text__label_small  Nav
        .correct-text__column.correct-text__column_right
          .correct-text__field(v-for="(item,index) in content.nav" :key="index" )
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Nav Item
            form-input.correct-text__input(
              v-model="item.text"

            )
          //- .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Mark all as read
            form-input.correct-text__input(
              v-model="content.all"
              @input="$v.content.all.$touch()"
              :error="$v.content.all.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Delete
            form-input.correct-text__input(
              v-model="content.delete"
              @input="$v.content.delete.$touch()"
              :error="$v.content.delete.$error"
            )
          //- .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Actions
            form-input.correct-text__input(
              v-model="content.actions"
              @input="$v.content.actions.$touch()"
              :error="$v.content.actions.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 More detailed
            form-input.correct-text__input(
              v-model="content.moreDetailed"
              @input="$v.content.moreDetailed.$touch()"
              :error="$v.content.moreDetailed.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Roll up
            form-input.correct-text__input(
              v-model="content.rollUp"
              @input="$v.content.rollUp.$touch()"
              :error="$v.content.rollUp.$error"
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
        title: 'My advertises',
        nav: [
          {
            text: 'new',
            key: "new",
            to: '/notifications',
          },
          {
            text: 'all',
            key: "all",
            to: '/notifications/all',
          },
        ],
        // all: 'Mark all as read',
        delete: 'Delete',
        // actions: 'Actions',
        moreDetailed: 'More detailed',
        rollUp: 'Roll up',
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      // all: {required, minLength: minLength(2)},
      delete: {required, minLength: minLength(2)},
      // actions: {required, minLength: minLength(2)},
      moreDetailed: {required, minLength: minLength(2)},
      rollUp: {required, minLength: minLength(2)},
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
