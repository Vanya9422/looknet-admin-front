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

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Sort by
            form-input.correct-text__input(
              v-model="content.sortBy"
              @input="$v.content.sortBy.$touch()"
              :error="$v.content.sortBy.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Select all

            form-input.correct-text__input(
              v-model="content.selectAll"
              @input="$v.content.selectAll.$touch()"
              :error="$v.content.selectAll.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Left

            form-input.correct-text__input(
              v-model="content.left"
              @input="$v.content.left.$touch()"
              :error="$v.content.left.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Days

            form-input.correct-text__input(
              v-model="content.days"
              @input="$v.content.days.$touch()"
              :error="$v.content.days.$error"
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

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Sort types
            .correct-text__label.correct-text__label_small Sort types

        .correct-text__column.correct-text__column_right
          .correct-text__field(v-for="(item,index) in content.sortList" :key="index")
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 {{ item.label }}

            form-input.correct-text__input(
              v-model="item.text"
              @input="$v.content.sortList.$each[index].text.$touch()"
              :error="$v.content.sortList.$each[index].text.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Banner
            .correct-text__label.correct-text__label_small  Banner

        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Hello

            form-input.correct-text__input(
              v-model="content.banner.name"
              @input="$v.content.banner.name.$touch()"
              :error="$v.content.banner.name.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description

            form-input.correct-text__input(
              v-model="content.banner.description"
              @input="$v.content.banner.description.$touch()"
              :error="$v.content.banner.description.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Favorites

            form-input.correct-text__input(
              v-model="content.banner.favorites"
              @input="$v.content.banner.favorites.$touch()"
              :error="$v.content.banner.favorites.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 View

            form-input.correct-text__input(
              v-model="content.banner.view"
              @input="$v.content.banner.view.$touch()"
              :error="$v.content.banner.view.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Calls

            form-input.correct-text__input(
              v-model="content.banner.call"
              @input="$v.content.banner.call.$touch()"
              :error="$v.content.banner.call.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Buttons
            .correct-text__label.correct-text__label_small  Buttons

        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Delete

            form-input.correct-text__input(
              v-model="content.buttons.delete"
              @input="$v.content.buttons.delete.$touch()"
              :error="$v.content.buttons.delete.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Draft

            form-input.correct-text__input(
              v-model="content.buttons.draft"
              @input="$v.content.buttons.draft.$touch()"
              :error="$v.content.buttons.draft.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Sale Faster

            form-input.correct-text__input(
              v-model="content.buttons.saleFaster"
              @input="$v.content.buttons.saleFaster.$touch()"
              :error="$v.content.buttons.saleFaster.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Setting

            form-input.correct-text__input(
              v-model="content.buttons.settings"
              @input="$v.content.buttons.settings.$touch()"
              :error="$v.content.buttons.settings.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Chat
            form-input.correct-text__input(
              v-model="content.buttons.chat"
              @input="$v.content.buttons.chat.$touch()"
              :error="$v.content.buttons.chat.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Deactivation
            form-input.correct-text__input(
              v-model="content.buttons.deactivation"
              @input="$v.content.buttons.deactivation.$touch()"
              :error="$v.content.buttons.deactivation.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Active
            form-input.correct-text__input(
              v-model="content.buttons.activation"
              @input="$v.content.buttons.activation.$touch()"
              :error="$v.content.buttons.activation.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Edit

            form-input.correct-text__input(
              v-model="content.buttons.edit"
              @input="$v.content.buttons.edit.$touch()"
              :error="$v.content.buttons.edit.$error"
            )


    h3.correct-text__label.h3.tablet-hidden.mt-2 Modals
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Active
            .correct-text__label.correct-text__label_small Active

        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title

            form-input.correct-text__input(
              v-model="content.modals.activate.title"
              @input="$v.content.modals.activate.title.$touch()"
              :error="$v.content.modals.activate.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description

            form-input.correct-text__input(
              v-model="content.modals.activate.description"
              @input="$v.content.modals.activate.description.$touch()"
              :error="$v.content.modals.activate.description.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Button
            form-input.correct-text__input(
              v-model="content.modals.activate.button"
              @input="$v.content.modals.activate.button.$touch()"
              :error="$v.content.modals.activate.button.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Draft
            .correct-text__label.correct-text__label_small  Draft

        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title

            form-input.correct-text__input(
              v-model="content.modals.draft.title"
              @input="$v.content.modals.draft.title.$touch()"
              :error="$v.content.modals.draft.title.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description

            form-input.correct-text__input(
              v-model="content.modals.draft.description"
              @input="$v.content.modals.draft.description.$touch()"
              :error="$v.content.modals.draft.description.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Button

            form-input.correct-text__input(
              v-model="content.modals.draft.button"
              @input="$v.content.modals.draft.button.$touch()"
              :error="$v.content.modals.draft.button.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Delete
            .correct-text__label.correct-text__label_small Delete

        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title

            form-input.correct-text__input(
              v-model="content.modals.delete.title"
              @input="$v.content.modals.delete.title.$touch()"
              :error="$v.content.modals.delete.title.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description

            form-input.correct-text__input(
              v-model="content.modals.delete.description"
              @input="$v.content.modals.delete.description.$touch()"
              :error="$v.content.modals.delete.description.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Button

            form-input.correct-text__input(
              v-model="content.modals.delete.button"
              @input="$v.content.modals.delete.button.$touch()"
              :error="$v.content.modals.delete.button.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Deactivate
            .correct-text__label.correct-text__label_small Deactivate

        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title

            form-input.correct-text__input(
              v-model="content.modals.deactivate.title"
              @input="$v.content.modals.deactivate.title.$touch()"
              :error="$v.content.modals.deactivate.title.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description

            form-input.correct-text__input(
              v-model="content.modals.deactivate.description"
              @input="$v.content.modals.deactivate.description.$touch()"
              :error="$v.content.modals.deactivate.description.$error"
            )

          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Button

            form-input.correct-text__input(
              v-model="content.modals.deactivate.button"
              @input="$v.content.modals.deactivate.button.$touch()"
              :error="$v.content.modals.deactivate.button.$error"
            )

    correct-text-save(@save="save()")

</template>

<script>
import constructorPage from "@/mixins/constructorPage";
import myAdvertises from "@/mixins/pages/my-advertises";

export default {
  data() {
    return {
      loading: false,
      id: null,
    }
  },
  mixins: [constructorPage, myAdvertises],
}
</script>
