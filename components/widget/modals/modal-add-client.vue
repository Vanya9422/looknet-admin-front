<template lang="pug">
  b-modal(
    id="modal-add-client"
    ref="modal-add-client"
    size="photo-size"
    modal-class="modal-add-moderator modal-add-client"
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
          :error="$v.form.first_name.$error"
          @input="$v.form.first_name.$touch()"
        )
      .modal-login__field
        label.registration-form__label.p.b Last name
        form-input.modal-login__input(
          placeholder="Enter last name" name="last_name"
          v-model.trim.lazy="form.last_name"
          :error="$v.form.last_name.$error"
          @input="$v.form.last_name.$touch()"
        )
      .modal-login__field
        label.registration-form__label.p.b Email
        form-input.modal-login__input(
          placeholder="Enter Email" name="email"
          v-model.trim.lazy="form.email"
          :error="$v.form.email.$error"
          @input="$v.form.email.$touch()"
        )
      .modal-login__field
        label.registration-form__label.p.b Phone
          phone-mask.with-border(
            :value="form.phone"
            :error="$v.form.phone.$error || error.phone"
            @input="isPhoneValid" )

      .modal-login__field
        label.registration-form__label.p.b Company
        form-input.modal-login__input(
          placeholder="Enter Company" name="company"
          v-model.trim.lazy="form.company"
          :error="$v.form.company.$error "
          @input="$v.form.company.$touch()"
        )

    template(#modal-footer='{ close }')
      .modal-add-moderator__buttons.flex
        div
        button-primary.modal-add-moderator__btn(small gray @click.native='closeModal()') Close
        button-primary.modal-add-moderator__btn(small :loading="loading" blue @click.native='save()') Save
</template>
<script>
import {required, minLength, email, sameAs} from "vuelidate/lib/validators";
import {parsePhoneNumber, isValidPhoneNumber} from 'libphonenumber-js'
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
        phone: false
      },
      isPassword: true,
      loading: false,
      isPasswordConfirm: true,
      blob: '',
      form: {
        img: '',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        company: '',
      },
    }
  },
  validations: {
    form: {
      first_name: {required, minLength: minLength(2)},
      last_name: {required, minLength: minLength(4)},
      email: {required, email},
      phone: {required},
      company: {required, minLength: minLength(2)},
    }
  },
  methods: {
    changeAvatar(val) {
      let urlCreator = window.URL || window.webkitURL;
      this.form.img = urlCreator.createObjectURL(val);
      this.blob = val
    },
    closeModal() {
      this.$refs['modal-add-client'].hide();
      this.$emit('close')
    },
    isPhoneValid(val) {
      this.error.phone = false
      this.form.phone = val
    },
    openModal() {
      this.$v.form.$reset()
      this.form = {
        img: '',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        company: '',
      }
    },
    save() {
      this.$v.form.$touch()
      if (!this.$v.form.$error && !this.loading) {
        const form = this.$refs.form
        const formData = new FormData(form)
        const parse = parsePhoneNumber(`+${this.form.phone}`)
        this.loading = true
        formData.append('_method', 'PUT')
        console.log(this.blob)
        if (this.blob !== '') formData.append(
            "file",
            this.blob,
            "myImageName.png"
        );
        formData.append('phone', parse.number.substring(1))
        formData.append('phone_view', this.form.phone)
        this.$axios.$post('admin/commercial/clients', formData).then(res => {
          this.$refs['modal-add-client'].hide();
          this.$emit('close')
        }).finally(() => this.loading = false)
      }


    }
  }
}
</script>


<style lang="scss">
.modal-login__field:not(:first-child) {
  margin-top: 20rem;
}

.commercial__add-avatar .button-photo__wrap {
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

.recommended-password-content {
  margin: 15px 0;
}
</style>