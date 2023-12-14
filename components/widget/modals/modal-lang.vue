<template lang="pug">
  b-modal(
    id="modal-lang"
    ref="modal-lang"
    size="photo-size"
    modal-class="modal-lang"
    body-class="modal-lang__body"
    header-class="modal-lang__header"
    footer-class="modal-lang__footer"
    @show="openModal"
    @hide="closeModal"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='close()')
    h3.modal-lang__title.h3 {{ title }}
    form.modal-lang__form(ref="form")
      .modal-login__field
        label.registration-form__label.p.b Name
        form-input.modal-login__input(
          placeholder="Enter name" name="name"
          v-model.trim.lazy="form.name"
          :error="$v.form.name.$error"
          @input="$v.form.name.$touch()"
        )
      .modal-login__field
        label.registration-form__label.p.b Native
        form-input.modal-login__input(
          placeholder="Enter native" name="native"
          v-model.trim.lazy="form.native"
          :error="$v.form.native.$error"
          @input="$v.form.native.$touch()"
        )
      .modal-login__field
        label.registration-form__label.p.b Code
        form-input.modal-login__input(
          placeholder="Enter code" name="code"
          v-model.trim.lazy="form.code"
          :error="$v.form.code.$error"
          @input="$v.form.code.$touch()"
        )
      .modal-login__field
        label.registration-form__label.p.b Regional
        form-input.modal-login__input(
          placeholder="Enter regional" name="regional"
          v-model.trim.lazy="form.regional"
          :error="$v.form.regional.$error"
          @input="$v.form.regional.$touch()"
        )
      modal-delete(v-if="lang" :modal-id="`modal-delete-${this.lang.id}`" @deleteItem="deleteLang()")



    template(#modal-footer='{ close }')
      .modal-lang__buttons.flex.flex_justify
        button-primary.modal-lang__btn(small v-if="lang"  icon="close"  gray @click.native='openDeleteLang()') Delete
        div(v-else)
        button-primary.modal-lang__btn(small :loading="loading" blue @click.native='save()') Save
</template>
<script>
import { cloneDeep } from 'lodash'
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    title: {
      type: String,
      default: 'Lang change'
    },
    lang: {
      type: [Object, Boolean],
      default: false
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        native: '',
        code: '',
        regional: ''
      },
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(2) },
      native: { required, minLength: minLength(2) },
      code: { required, minLength: minLength(2) },
      regional: { required, minLength: minLength(2) }
    }
  },
  methods: {
    ...mapActions({
      SET_ADD_LANGUAGES: 'correctText/SET_ADD_LANGUAGES',
      SET_DELETE_LANGUAGES: 'correctText/SET_DELETE_LANGUAGES',
    }),
    closeModal() {
      this.$refs['modal-lang'].hide();
      this.$emit('close')
      this.fome = {
        name: '',
        native: '',
        code: '',
        regional: ''
      }
    },
    openModal() {
      this.$v.form.$reset()
      if (this.lang){
        this.form =  cloneDeep(this.lang)
      }else{
        this.fome ={
          name: '',
          native: '',
          code: '',
          regional: ''
        }
      }
    },
    openDeleteLang(){
      this.$bvModal.show(`modal-delete-${this.lang.id}`)
    },
    deleteLang(){
      this.SET_DELETE_LANGUAGES(this.lang.id)
      this.closeModal()
    },
    save() {
      if (this.loading) return;
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.loading = true;
        const form = this.form
        this.SET_ADD_LANGUAGES(form)
          .then(() => {
            this.$bvModal.show('modal-thank')
            setTimeout(() => {
              this.$bvModal.hide('modal-thank')
            }, 2000);
            this.closeModal();
          }).finally(() => {
            this.loading = false;
          })
      }
    }
  }
}
</script>


<style lang="scss">
.modal-login__field:not(:first-child) {
  margin-top: 20rem;
}

.modal-lang {
  .modal-dialog {
    max-width: 637px;
    width: 100%;
  }

  &__form {
    padding-top: 25px;
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
