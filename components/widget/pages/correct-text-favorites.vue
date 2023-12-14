<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Favorites
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Favorites
            .correct-text__label.correct-text__label_small  Favorites
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
            form-input.correct-text__input(
              v-model="content.title"
              @input="$v.content.title.$touch()"
              :error="$v.content.title.$error"
            )
    //- .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Nav
            .correct-text__label.correct-text__label_small  Nav
        .correct-text__column.correct-text__column_right
          .correct-text__field(v-for="(item,index) in content.nav" :key="'new'+index")
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 {{item.label}}
            form-input.correct-text__input(
              v-model="item.text"
              @input="$v.content.nav.$each[index].text.$touch()"
              :error="$v.content.nav.$each[index].text.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Sort
            .correct-text__label.correct-text__label_small  Sort
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4  Text
            form-input.correct-text__input(
              v-model="content.sortBy"
              @input="$v.content.sortBy.$touch()"
              :error="$v.content.sortBy.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Sort types
            .correct-text__label.correct-text__label_small  Sort types
        .correct-text__column.correct-text__column_right
          .correct-text__field(v-for="(item,index) in content.sortList" :key="index")
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 {{item.label}}
            form-input.correct-text__input(
              v-model="item.text"
              @input="$v.content.sortList.$each[index].text.$touch()"
              :error="$v.content.sortList.$each[index].text.$error"
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
        title: 'Favorites ad',
        nav: [
          {
            text: 'Favorites',
            class: 'isActive'
          }
        ],
        sortBy:'Sort by',
        sortList:[
          {
            label: 'Newest',
            text: 'Newest',
            value: 'orderBy=id&sortedBy=desc'
          },
          {
            label: 'Older',
            text: 'Older',
            value: 'orderBy=id&sortedBy=asc'
          },
          {
            label: 'Expensive',
            text: 'Expensive',
            value: 'orderBy=price&sortedBy=desc'
          },
          {
            label: 'Cheap',
            text: 'Cheap',
            value: 'orderBy=price&sortedBy=asc'
          }
        ]
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      nav: {
        $each: {
          text: {required, minLength: minLength(3)}
        }
      },
      sortBy: {required, minLength: minLength(2)},
      sortList: {
        $each: {
          text: {required, minLength: minLength(3)}
        }
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
