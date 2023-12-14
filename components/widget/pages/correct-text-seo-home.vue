<template>
  <form class="correct-text__section-list" id="correct-text__section-form" v-if="loading" :key="key">
    <h3 class="correct-text__label h3 tablet-hidden">SEO</h3>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Page Metadata</div>
            <div class="correct-text__label correct-text__label_small">Page Metadata</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.title" @input="$v.content.title.$touch()" :error="$v.content.title.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">H1</div>
            </div>
            <form-input class="correct-text__input" v-model="content.h1" @input="$v.content.h1.$touch()" :error="$v.content.h1.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Description</div>
            </div>
            <form-input class="correct-text__input" v-model="content.description" @input="$v.content.description.$touch()" :error="$v.content.description.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <correct-text-save @save="save()"></correct-text-save>
  </form>
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
        title: '',
        h1: '',
        description: ''
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      h1: {required, minLength: minLength(2)},
      description: {required, minLength: minLength(2)},
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
