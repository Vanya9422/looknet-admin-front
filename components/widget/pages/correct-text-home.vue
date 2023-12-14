<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(:key="key" v-if="loading")
    h3.correct-text__label.h3.tablet-hidden Home
    //- correct-text-item(
    //-   name="Vip"
    //-   title="Title"
    //-   v-model="content.vip.title"
    //-   @input="$v.content.vip.title.$touch()"
    //-   :error="$v.content.vip.title.$error"
    //- )
    correct-text-item(
      name="Recommend"
      title="Recommend"
      v-model="content.recommend.title"
      @input="$v.content.recommend.title.$touch()"
      :error="$v.content.recommend.title.$error"
    )
    correct-text-item(
      name="Search"
      title="Title"
    )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Title
        form-input.correct-text__input(
          v-model="content.search.title"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Title blue
        form-input.correct-text__input(
          v-model="content.search.titleBlue"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 City
        form-input.correct-text__input(
          v-model="content.search.city"
          @input="$v.content.search.city.$touch()"
          :error="$v.content.search.city.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Search
        form-input.correct-text__input(
          v-model="content.search.search"
          @input="$v.content.search.search.$touch()"
          :error="$v.content.search.search.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Placeholder
        form-input.correct-text__input(
          v-model="content.search.placeholder"
          @input="$v.content.search.placeholder.$touch()"
          :error="$v.content.search.placeholder.$error"
        )
    correct-text-item(
      name="Search Modal"
      title="Title"
    )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Categories
        form-input.correct-text__input(
          v-model="content.searchModal.categories"
          @input="$v.content.searchModal.categories.$touch()"
          :error="$v.content.searchModal.categories.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 All categories
        form-input.correct-text__input(
          v-model="content.allCategories"
          @input="$v.content.allCategories.$touch()"
          :error="$v.content.allCategories.$error"
        )
    correct-text-save(@save="save()")
</template>

<script>
import constructorPage from "@/mixins/constructorPage";
import home from "@/mixins/pages/home";

export default {
  data() {
    return {
      loading: false,
      id: null,
    }
  },
  mixins: [constructorPage,home],
}
</script>

