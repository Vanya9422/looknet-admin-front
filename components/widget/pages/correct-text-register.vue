<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(:key="key" v-if="loading")
    h3.correct-text__label.h3.tablet-hidden Register with
    correct-text-item(name="Create your profile")
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Title
        form-input.correct-text__input(
          v-model="content.create"
          @input="$v.content.create.$touch()"
          :error="$v.content.create.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Text
        form-input.correct-text__input(
          v-model="content.singWith"
          @input="$v.content.singWith.$touch()"
          :error="$v.content.singWith.$error"
        )

    h3.correct-text__label.h3.tablet-hidden.border-top Form
    correct-text-item(name="Name")
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Label
        form-input.correct-text__input(
          v-model="content.name.label"
          @input="$v.content.name.label.$touch()"
          :error="$v.content.name.label.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Placeholder
        form-input.correct-text__input(
          v-model="content.name.placeholder"
          @input="$v.content.name.placeholder.$touch()"
          :error="$v.content.name.placeholder.$error"
        )
    correct-text-item(name="Second name")
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Label
        form-input.correct-text__input(
          v-model="content.lName.label"
          @input="$v.content.lName.label.$touch()"
          :error="$v.content.lName.label.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Placeholder
        form-input.correct-text__input(
          v-model="content.lName.placeholder"
          @input="$v.content.lName.placeholder.$touch()"
          :error="$v.content.lName.placeholder.$error"
        )
    correct-text-item(name="Email/Phone")
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Email
        form-input.correct-text__input(
          v-model="content.username.email"
          @input="$v.content.username.email.$touch()"
          :error="$v.content.username.email.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Phone
        form-input.correct-text__input(
          v-model="content.username.phone"
          @input="$v.content.username.phone.$touch()"
          :error="$v.content.username.phone.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Placeholder
        form-input.correct-text__input(
          v-model="content.username.placeholder"
          @input="$v.content.username.placeholder.$touch()"
          :error="$v.content.username.placeholder.$error"
        )
    correct-text-item(name="Exist")
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Email error
        form-input.correct-text__input(
          v-model="content.existEmail"
          @input="$v.content.existEmail.$touch()"
          :error="$v.content.existEmail.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Phone error
        form-input.correct-text__input(
          v-model="content.existPhone"
          @input="$v.content.existPhone.$touch()"
          :error="$v.content.existPhone.$error"
        )

    correct-text-item(name="Password")
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Label
        form-input.correct-text__input(
          v-model="content.password.label"
          @input="$v.content.password.label.$touch()"
          :error="$v.content.password.label.$error"
        )
      .correct-text__field
        .correct-text__field-head.flex.flex_vertical.flex_justify
          .correct-text__field-title.h4 Placeholder
        form-input.correct-text__input(
          v-model="content.password.placeholder"
          @input="$v.content.password.placeholder.$touch()"
          :error="$v.content.password.placeholder.$error"
        )
    module-text-list(
      v-model="content.password.rules.list"
      name="Password rules"
      title="Rule"
    )
      template(slot="prepend")
        .correct-text__field
          .correct-text__field-head.flex.flex_vertical.flex_justify
            .correct-text__field-title.h4 Title
          form-input.correct-text__input(
            v-model="content.password.rules.title"
            @input="$v.content.password.rules.title.$touch()"
            :error="$v.content.password.rules.title.$error"
          )
    correct-text-item(name="Checkbox"  title="Text"
      v-model="content.checkbox"
      @input="$v.content.checkbox.$touch()"
      :error="$v.content.checkbox.$error")
    correct-text-item(name="Button"  title="Text"
      v-model="content.sing"
      @input="$v.content.sing.$touch()"
      :error="$v.content.sing.$error")
    h3.correct-text__label.h3.tablet-hidden.border-top Or Login
    correct-text-item(name="Text"  title="Text"
      v-model="content.haveProfile"
      @input="$v.content.haveProfile.$touch()"
      :error="$v.content.haveProfile.$error")
    correct-text-item(name="Link"  title="Link"
      v-model="content.login"
      @input="$v.content.login.$touch()"
      :error="$v.content.login.$error")
    correct-text-save(@save="save()")
</template>

<script>
import constructorPage from "@/mixins/constructorPage";
import register from "@/mixins/pages/register";

export default {
  data() {
    return {
      loading: false,
      id: null,
    }
  },
  mixins:[constructorPage,register],
}
</script>
