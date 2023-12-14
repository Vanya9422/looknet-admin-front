<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(:key="key" v-if="loading")
    h3.correct-text__label.h3.tablet-hidden Form
    correct-text-item(
      name="Text"
      title="Title"
      v-model="content.sing"
      @input="$v.content.sing.$touch()"
      :error="$v.content.sing.$error"
    )
    correct-text-item(
      name="Login"
      title="Placeholder"
      v-model="content.username.placeholder"
      @input="$v.content.username.placeholder.$touch()"
      :error="$v.content.username.placeholder.$error"
    )
    correct-text-item(
      name="Password"
      title="Placeholder"
      v-model="content.password.placeholder"
      @input="$v.content.password.placeholder.$touch()"
      :error="$v.content.password.placeholder.$error"
    )
    correct-text-item(
      name="Forgot password"
      title="Text"
      v-model="content.forget"
      @input="$v.content.forget.$touch()"
      :error="$v.content.forget.$error"
    )
    correct-text-item(
      name="Button"
      title="Button Text"
      v-model="content.login"
      @input="$v.content.login.$touch()"
      :error="$v.content.login.$error"
    )
    h3.correct-text__label.h3.tablet-hidden.border-top Login with
    correct-text-item(
      name="Title"
      title="Text"
      v-model="content.loginWith"
      @input="$v.content.loginWith.$touch()"
      :error="$v.content.loginWith.$error"
    )
    correct-text-item(
      name="Button"
      title="Text"
      v-model="content.registration"
      @input="$v.content.registration.$touch()"
      :error="$v.content.registration.$error"
    )
    correct-text-save(@save="save()")

</template>

<script>
import constructorPage from "@/mixins/constructorPage";
import login from "@/mixins/pages/login";
export default {
  data() {
    return {
      loading: false,
      id: null,
    }
  },
  mixins: [constructorPage,login],
}
</script>
