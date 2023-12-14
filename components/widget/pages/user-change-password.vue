<template lang="pug">
  .edit-field.settings__field
    .edit-field___wrap(v-if="edit")
      .edit-field__row
        .edit-field__column.edit-field__column_left
          .edit-field__label.color-gray.p  Password
        .edit-field__column.edit-field__column_center
          form-input.pb-4(
            v-model="form.password"
            placeholder="••••••••••"
            @click="isPassword2 = !isPassword2"
            @input="recommendedPassword(form.password)"
            :icon="isPassword2 ? 'eyeHide' : 'eyeShow' "
            :type="isPassword2 ? 'password':'text'"
            :error="current_password_error || $v.form.password.$dirty && ($v.form.password.$error || recommended.lowerCaseLetters || recommended.upperCaseLetters || recommended.numbers || recommended.symbols) "
            :valid="!current_password_error && $v.form.password.$dirty && !$v.form.password.$error"
          )
          .input-error-text.color-red.pt-4.p {{  $v.form.password.$dirty ?  (recommended.lowerCaseLetters || recommended.upperCaseLetters || recommended.numbers || recommended.symbols || '') : '' }}
          recommended-password(
            class="pt-4 pb-2"
            :recommended="recommended"
            :recommendedText="recommendedText"
            :recommendedType="recommendedType"
            :recommendedPasswordCount="recommendedPasswordCount"
          )
        .edit-field__column.edit-field__column_right
          .edit-field__nav
            .edit-field__nav-item
              .edit-field__link.color-gray(@click="closeEdit") Cancel
            .edit-field__nav-item
              .edit-field__link.color-blue(@click="saveEdit") Save
      .edit-field__row
        .edit-field__column.edit-field__column_left
          .edit-field__label.color-gray.p  New password
        .edit-field__column.edit-field__column_center
          form-input(
            v-model="form.password_confirmation"
            placeholder="••••••••••"
            @click="isPassword3 = !isPassword3"
            @input="$v.form.password_confirmation.$touch()"
            :error="current_password_error || $v.form.password_confirmation.$error"
            :valid="!current_password_error && $v.form.password_confirmation.$dirty && !$v.form.password_confirmation.$error"
            :icon="isPassword3 ? 'eyeHide' : 'eyeShow' "
            :type="isPassword3 ? 'password':'text'"
          )

    .edit-field__row(v-else)
      .edit-field__column.edit-field__column_left
        .edit-field__label.color-gray.p Password
      .edit-field__column.edit-field__column_center
        .edit-field__placeholder.h4 ••••••••••
      .edit-field__column.edit-field__column_right
        .edit-field__nav.mobile-hidden
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="showEdit") Edit
        .edit-field__nav.mobile-visible
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="$bvModal.show(`fieldPassword`)") Edit
    modal-field(id="fieldPassword" title="Safety")
      .modal-field__list
        .modal-field__item
          .modal-field__label Password
          form-input.modal-field__input(
            v-model="form.password"
            placeholder="••••••••••"
            @click="isPassword2 = !isPassword2"
            @input="recommendedPassword(form.password)"
            :icon="isPassword2 ? 'eyeHide' : 'eyeShow' "
            :type="isPassword2 ? 'password':'text'"
            :error="current_password_error || $v.form.password.$dirty && ($v.form.password.$error || recommended.lowerCaseLetters || recommended.upperCaseLetters || recommended.numbers || recommended.symbols) "
            :valid="!current_password_error && $v.form.password.$dirty && !$v.form.password.$error"
          )
        .modal-field__item
          .modal-field__label New password
          form-input.modal-field__input(
            v-model="form.password_confirmation"
            placeholder="••••••••••"
            @click="isPassword3 = !isPassword3"
            @input="()=>{ this.$v.form.password_confirmation.$touch(); this.current_password_error = false }"
            :error="current_password_error || $v.form.password_confirmation.$error && $v.form.password_confirmation.$error && $v.form.password.$error"
            :valid="!current_password_error && $v.form.password_confirmation.$dirty && !$v.form.password_confirmation.$error "
            :icon="isPassword3 ? 'eyeHide' : 'eyeShow' "
            :type="isPassword3 ? 'password':'text'"
          )
</template>

<script>
import recommendedPassword from "@/mixins/auth/recommendedPassword";
import {minLength, required, sameAs} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      edit: false,
      form: {
        password: '',
        password_confirmation: '',
      },
      current_password_error: false,
      isPassword1: true,
      isPassword2: true,
      isPassword3: true,
      isShow: false,
    }
  },
  mixins: [recommendedPassword],
  validations: {
    form: {
      password: {required, minLength: minLength(8)},
      password_confirmation: {required, sameAsPassword: sameAs('password')}
    }
  },
  watch: {
    form(val) {
      console.log(val)
    }
  },
  methods: {
    showEdit() {
      this.edit = true;
    },
    closeEdit() {
      this.edit = false;
      this.$v.form.$reset()
      this.form = {
        password: '',
        password_confirmation: '',
      }
      this.isShow = false
    },
    saveEdit() {
      this.$v.form.$touch()
      if (!this.$v.form.$error && this.recommendedErrorCount === 5) {
        let form = {
          id:this.$route.params.id,
          ...this.form
        }
        this.$axios.$put(`/admin/moderators`, form).then((res) => {
          this.closeEdit()
        })
      }
    }
  }

}
</script>

<style scoped>

</style>