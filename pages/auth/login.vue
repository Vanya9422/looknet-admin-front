<template lang="pug">
  section-registration(title="Login")
    .registration-form__fields
      .registration-form__field
        label.registration-form__label.p.b Phone or mail
        form-input(
          placeholder="Enter your phone number or email"
          v-model.trim.lazy="form.confirmation_auth"
          @input="$v.form.confirmation_auth.$touch()"
          :error="$v.form.confirmation_auth.$error || confirmation_authError ||  errors.hasOwnProperty('email') || errors.length || errors "
          :valid="$v.form.confirmation_auth.$dirty && (!$v.form.confirmation_auth.$error || ! confirmation_authError ||  !errors.hasOwnProperty('email'))"
        )
      .registration-form__field
        label.registration-form__label.p.b Password
        form-input(
          placeholder="Enter the password"
          :icon="isPassword ? 'eyeHide' : 'eyeShow' "
          :type="isPassword ? 'password':'text'"
          @click="isPassword = !isPassword"
          v-model.trim.lazy="form.password"
          @input="$v.form.password.$touch()"
          :error="$v.form.password.$error ||  errors.hasOwnProperty('password') || errors.length || errors"
          :valid="$v.form.password.$dirty && !$v.form.password.$error"
        )

    template(v-slot:bottom)
      button-primary.registration-form__btn(
        blue
        @click.prevent.native="login"
      ) Log in

</template>
<script>
import {minLength, required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";

export default {
  layout: 'default_small',
  middleware: ['ghost'],
  data() {
    return {
      errors: false,
      isPassword: true,
      form: {
        confirmation_auth: '',
        password: '',
      },
      loading: false,
    }
  },
  computed: {
    confirmation_authError() {
      let errors = false
      if (!this.$v.form.confirmation_auth.$dirty) return errors
      if (!this.$v.form.confirmation_auth.required) errors = true
      const isEmail = this.$validateEmail(this.form.confirmation_auth)
      const isPhone = this.$validatePhone(this.form.confirmation_auth)
      if (!isEmail && !isPhone) errors = true
      return errors
    }
  },
  validations: {
    form: {
      password: {required, minLength: minLength(8)},
      confirmation_auth: {required}
    }
  },
  methods: {
    ...mapActions({
      SET_USER_LOCAL: 'user/SET_USER_LOCAL'
    }),
    async login() {
      try {
        if (this.loading) return
        this.loading = true
        this.$v.form.$touch()
        if (!this.$v.form.$error && !this.confirmation_authError) {
            let loginResponse = await this.$auth.loginWith('laravelSanctum', {data: this.form});
            this.$auth.strategy.token.set(loginResponse.data.data.access_token);
            await this.SET_USER_LOCAL(loginResponse.data.data.access_token);
          if (loginResponse.data.data.user.role.id === 3) {
              const form = {
                user_id: loginResponse.data.data.user.id,
                permissions: [1, 2, 3, 4, 5, 6, 7]
              }
              let permissionResponse = await this.$axios.$post('/admin/give-permission', form);
              this.$auth.fetchUser().catch(() => this.$auth.logout());
              await this.$router.push('/announcement-list')
            } else if (loginResponse.data.data.user.role.id === 2){
              await this.$router.push('/announcement-list')
            } else {
              this.errors = {"email": ["The selected email is invalid."]}
              await this.$auth.logout();
            }
        }
      } catch (error) {
        this.errors = error.response.data.errors || {};
      } finally {
        this.loading = false;
        }
     },
    socialAuth(social) {
      this.$auth.loginWith(social)
    }
  }
}

</script>
