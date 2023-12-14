<template lang="pug">
  b-modal(
    id="modal-add-moderator"
    ref="modal-add-moderator"
    size="photo-size"
    modal-class="modal-add-moderator"
    body-class="modal-add-moderator__body"
    header-class="modal-add-moderator__header"
    footer-class="modal-add-moderator__footer"
    @show="openModal"
    @hide="closeModal"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='close()')
    h3.modal-add-moderator__title.h3 {{ title }}
    form(ref="form")
      .modal-login__field
        modal-avatar(  isAddModerator @change="changeAvatar")
        module-add-avatar.commercial__add-avatar( :img="form.img" @click.native.prevent="$bvModal.show('modal-avatar')" @change="changeAvatar")
          | Add your photo for answers, comments and reviews
      .modal-login__field
        label.registration-form__label.p.b First name
        form-input.modal-login__input(
          placeholder="Enter first name" name="first_name"
          v-model.trim.lazy="form.first_name"
          :error="$v.form.first_name.$error || error.form.first_name"
          @input="$v.form.first_name.$touch()"
        )
      .errors(v-if="error.form.first_name")
        div.p.color-red() {{ error.form.first_name[0] }}
      .modal-login__field
        label.registration-form__label.p.b Last name
        form-input.modal-login__input(
          placeholder="Enter last name" name="last_name"
          v-model.trim.lazy="form.last_name"
          :error="$v.form.last_name.$error || error.form.last_name"
          @input="$v.form.last_name.$touch()"
        )
      .errors(v-if="error.form.first_name")
        div.p.color-red() {{ error.form.first_name[0] }}
      .modal-login__field
        label.registration-form__label.p.b Email
        form-input.modal-login__input(
          placeholder="Enter Email" name="email"
          v-model.trim.lazy="form.email"
          :error="$v.form.email.$error || error.form.email"
          @input="$v.form.email.$touch()"
        )
      .errors(v-if="error.form.email")
        div.p.color-red() {{ error.form.email[0] }}
      .modal-login__field
        label.registration-form__label.p.b Phone
        phone-mask.with-border( :value="form.phone" :error="$v.form.phone.$error || error.form.phone"
          @input="isPhoneValid" )
        .errors(v-if="error.form.phone")
          div.p.color-red() {{ error.form.phone[0] }}

        .modal-login__field
          label.registration-form__label.p.b Password
          form-input(
            placeholder="Enter the password"
            name="password"
            :icon="isPassword ? 'eyeHide' : 'eyeShow' "
            :type="isPassword ? 'password':'text'"
            @click="isPassword = !isPassword"
            v-model.trim.lazy="form.password"
            @input="recommendedPassword(form.password)"
            :error="$v.form.password.$dirty &&  recommendedError "

          )
          .recommended-password-content
            .input-error-text.color-red.pt-2 {{  $v.form.password.$dirty ?  recommendedErrorText  : '' }}
            recommended-password(
              :recommended="recommended"
              :recommendedText="recommendedText"
              :recommendedType="recommendedType"
              :recommendedPasswordCount="recommendedPasswordCount"
            )
        .modal-login__field
          label.registration-form__label.p.b Repeat the password
          form-input(
            placeholder="Enter the password"
            name="password_confirmation"
            :icon="isPasswordConfirm ? 'eyeHide' : 'eyeShow'"
            :type="isPasswordConfirm ? 'password':'text'"
            @click="isPasswordConfirm = !isPasswordConfirm"
            v-model.trim.lazy="form.password_confirmation"
            @input="$v.form.password_confirmation.$touch()"
            :error="$v.form.password_confirmation.$error"
          )
        .errors(v-if="error.form.password")
          div.p.color-red() {{ error.form.password[0] }}

    template(#modal-footer='{ close }')
      .modal-add-moderator__buttons.flex
        div
        button-primary.modal-add-moderator__btn(small gray @click.native='closeModal()') Close
        button-primary.modal-add-moderator__btn(small :loading="loading" blue @click.native='save()') Save
</template>
<script>
import {required, minLength, email, sameAs} from "vuelidate/lib/validators";
import {parsePhoneNumber} from 'libphonenumber-js'
import recommendedPassword from '@/mixins/auth/recommendedPassword'

export default {
  props: {
    title: {
      type: String,
      default: 'Add new Moderator'
    },
    avatar: {
      type: String,
      default: ''
    },
    userId: {
      type: Number,
      default: 0
    }
  },
  mixins: [recommendedPassword],
  data() {
    return {
      name: 'file',
      error: {
        phone: false,
        form: {}
      },
      loading: false,
      isPassword: true,
      isPasswordConfirm: true,
      blob:'',
      form: {
        img: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        token: Math.floor(Math.random() * 10000000)
      },
    }
  },
  validations: {
    form: {
      first_name: {required, minLength: minLength(2)},
      last_name: {required, minLength: minLength(4)},
      email: {required, email},
      phone: {required},
      password: {required, minLength: minLength(8)},
      password_confirmation: {sameAsPassword: sameAs('password')}
    }
  },
  methods: {
    changeAvatar(val) {
      let urlCreator = window.URL || window.webkitURL;
      this.form.img = urlCreator.createObjectURL(val);
      this.blob = val
    },
    closeModal() {
      this.$refs['modal-add-moderator'].hide();
      this.error.form = {}
      Object.assign(this.$data, this.$options.data.call(this));
    },
    isPhoneValid(val) {
      this.form.phone = val
      this.error.phone = false
      const error = this.$v.form.phone.$touch()
    },
    openModal() {
      this.$v.form.$reset()
    },
    save() {
      this.$v.form.$touch()
      if(!this.$v.form.$error && !this.loading){
        const form = this.$refs.form
        const formData = new FormData(form)
        const parse = parsePhoneNumber(`+${this.form.phone}`)
        if(this.blob !=='') formData.append(
            "file",
            this.blob,
            "myImageName.png"
        );
        formData.append('phone_view', this.form.phone)
        formData.append('phone', parse.number.substring(1))
        this.loading = true
        this.$axios.$post('/admin/moderators', formData).then(res=>{
          this.$refs['modal-add-moderator'].hide();
          this.$emit('close')
        })
        .catch(e => this.error.form = e.response.data.errors)
        .finally(()=>this.loading = false)
      }
    }
  }
}
</script>


<style lang="scss">
.modal-login__field:not(:first-child) {
  margin-top: 20rem;
}
.commercial__add-avatar .button-photo__wrap{
  border-radius: 50%;
}
.modal-add-moderator {
  .modal-dialog {
    max-width: 737px;
    width: 100%;
  }

  &__buttons {
    @include items(3, 5);
  }

  .button-photo__img {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-height: 100%;
    }
  }

  &__footer {
    padding: 0;
    margin-top: 20rem;
    display: block;
    border: none;
  }

  .add-avatar__btn-full {
    margin: 24rem 0 20rem;
    height: 600px;

    width: 100%;

    .button-photo__wrap {
      border-radius: 16px;
      border-width: 2px;

      svg {
        width: 56px;
        height: 56px;
      }


    }
  }
}

.errors {
  margin-top: 5px;
}
.recommended-password-content {
  margin: 15px 0;
}
</style>
