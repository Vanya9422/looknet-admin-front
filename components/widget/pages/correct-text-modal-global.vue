<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Modal
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Global
            .correct-text__label.correct-text__label_small  Global
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Edit
            form-input.correct-text__input(
              v-model="content.edit"
              @input="$v.content.edit.$touch()"
              :error="$v.content.edit.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Close
            form-input.correct-text__input(
              v-model="content.close"
              @input="$v.content.close.$touch()"
              :error="$v.content.close.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Save
            form-input.correct-text__input(
              v-model="content.save"
              @input="$v.content.save.$touch()"
              :error="$v.content.save.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Delete
            form-input.correct-text__input(
              v-model="content.delete"
              @input="$v.content.delete.$touch()"
              :error="$v.content.delete.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Search
            form-input.correct-text__input(
              v-model="content.search"
              @input="$v.content.search.$touch()"
              :error="$v.content.search.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 OK
            form-input.correct-text__input(
              v-model="content.ok"
              @input="$v.content.ok.$touch()"
              :error="$v.content.ok.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Change
            form-input.correct-text__input(
              v-model="content.change"
              @input="$v.content.change.$touch()"
              :error="$v.content.change.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Yes
            form-input.correct-text__input(
              v-model="content.yes"
              @input="$v.content.yes.$touch()"
              :error="$v.content.yes.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 No
            form-input.correct-text__input(
              v-model="content.no"
              @input="$v.content.no.$touch()"
              :error="$v.content.no.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Cancel
            form-input.correct-text__input(
              v-model="content.cancel"
              @input="$v.content.cancel.$touch()"
              :error="$v.content.cancel.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Continue
            form-input.correct-text__input(
              v-model="content.continue"
              @input="$v.content.continue.$touch()"
              :error="$v.content.continue.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Save changes
            form-input.correct-text__input(
              v-model="content.saveChanges"
              @input="$v.content.saveChanges.$touch()"
              :error="$v.content.saveChanges.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Back
            form-input.correct-text__input(
              v-model="content.back"
              @input="$v.content.back.$touch()"
              :error="$v.content.back.$error"
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
        edit: 'Edit',
        close: 'Close',
        save: 'Save',
        delete: 'Delete',
        search: 'Search',
        ok: 'OK',
        change: 'Change',
        yes: 'Yes',
        no: 'No',
        cancel: 'Cancel',
        continue: 'Continue',
        saveChanges: 'Save changes',
        back: 'Back',
      },
    }
  },
  validations: {
    content: {
      edit: {required, minLength: minLength(2)},
      close: {required, minLength: minLength(2)},
      save: {required, minLength: minLength(2)},
      delete: {required, minLength: minLength(2)},
      search: {required, minLength: minLength(2)},
      ok: {required, minLength: minLength(2)},
      change: {required, minLength: minLength(2)},
      yes: {required, minLength: minLength(2)},
      no: {required, minLength: minLength(2)},
      cancel: {required, minLength: minLength(2)},
      continue: {required, minLength: minLength(2)},
      saveChanges: {required, minLength: minLength(2)},
      back: {required, minLength: minLength(2)},
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
