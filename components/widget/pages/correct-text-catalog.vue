<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(:key="key")
    h3.correct-text__label.h3.tablet-hidden Catalog
    correct-text-item(name="Title")
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
          .correct-text__field-title.h4 All categories
        form-input.correct-text__input(
          v-model="content.allCategories"
          @input="$v.content.allCategories.$touch()"
          :error="$v.content.allCategories.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Filters
        form-input.correct-text__input(
          v-model="content.filters"
          @input="$v.content.filters.$touch()"
          :error="$v.content.filters.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Reset
        form-input.correct-text__input(
          v-model="content.reset"
          @input="$v.content.reset.$touch()"
          :error="$v.content.reset.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Cost
        form-input.correct-text__input(
          v-model="content.cost"
          @input="$v.content.cost.$touch()"
          :error="$v.content.cost.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Apply
        form-input.correct-text__input(
          v-model="content.apply"
          @input="$v.content.apply.$touch()"
          :error="$v.content.apply.$error"
        )
    correct-text-item(name="Sort" title="Text" v-model="content.sortBy"
      @input="$v.content.sortBy.$touch()"
      :error="$v.content.sortBy.$error")
    correct-text-item(name="Sort types")
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
import constructorPage from "@/mixins/constructorPage";
import catalog from "@/mixins/pages/catalog";
export default {
  data() {
    return {
      loading: false,
      id: null,
    }
  },
  mixins:[constructorPage,catalog],
}
</script>
