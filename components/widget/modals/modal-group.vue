<template lang="pug">
  b-modal(
    id="modal-group"
    ref="modal-group"
    size="photo-size"
    modal-class="modal-group"
    body-class="modal-add-moderator__body"
    header-class="modal-add-moderator__header"
    footer-class="modal-add-moderator__footer modal-group__footer"
    @show="openModal"
    @hide="closeModal"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='close()')
    .modal-category__head.flex.flex_vertical.flex_justify.flex_center
      .modal-category__head-column
        h3.modal-group__title.h3 {{ title }}
      .modal-category__head-column.modal-category__head-column-flex.modal-category__head-column-flex-end
      .correct-text__column-buttons.flex(v-show="form.id")
        button-primary.correct-text__column-btn.text-capitalize(
          v-for="item in LANGUAGES" :key="item.id" border medium
        :active="LANG === item.code"
          @click.native.prevent="changeLanguage(item.code)"
        ) {{ item.code }}

    form(ref="form" :key="LANG" )
      .modal-category__box
        .modal-category__row.flex.flex_vertical
          .modal-category__column.modal-category__column_left
            label.modal-category__label.h4 Title
          .modal-category__column.modal-category__column_right
            form-input.modal-login__input(
              :placeholder="active ? active.title : 'Enter title'" name="first_name"
              v-model.trim.lazy="form.title"
              :error="$v.form.title.$error"
              @input="$v.form.title.$touch()"
            )
      .modal-category__box(v-if="LANG ==='en'")
        .modal-category__row.flex.flex_vertical
          .modal-category__column.modal-category__column_left
            label.modal-category__label.h4 Status
          .modal-category__column.modal-category__column_right
            form-radio-switch(:checked="form.status" @change.native="() =>  form.status = form.status ===1? 0 : 1")
        modal-delete(@deleteItem="deleteGroup")


    template(#modal-footer='{ close }')
      .modal-group__buttons.flex
        div
        button-primary.modal-group__btn(v-show="form.id" small bgRed v-b-modal:modal-delete) Delete
        button-primary.modal-group__btn(small :loading="loading" blue @click.native='save()') Save
</template>
<script>
import {required, minLength, email, sameAs} from "vuelidate/lib/validators";
import {parsePhoneNumber, isValidPhoneNumber} from 'libphonenumber-js'
import recommendedPassword from '@/mixins/auth/recommendedPassword'
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: 'Create group'
    },
    active: {
      type: [Object, Boolean],
      default: false
    }
  },
  data() {
    return {
      loading: false,
      hasActive:null,
      form: {
        status: 1,
        title: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      LANGUAGES: 'correctText/LANGUAGES',
      LANG: 'correctText/LANG'
    }),
  },
  mounted() {
    this.SET_LANGUAGES()
  },
  validations: {
    form: {
      title: {required},
    }
  },
  methods: {
    ...mapActions({
      SET_LANGUAGES: 'correctText/SET_LANGUAGES',
      CHANGE_LANGUAGE: 'correctText/SET_LANGUAGE'
    }),
    changeLanguage(code,flag = false) {
      this.CHANGE_LANGUAGE(code)
      this.getNewGroup(flag)
      this.$changeRouteQuery({lang: code})
    },
    closeModal() {
      this.$emit('close')
      this.hasActive = null
      this.$nextTick(() => {
        this.changeLanguage('en')
      })
    },
    getNewGroup(flag) {
      if (this.active || this.hasActive) {
        const id = this.active ? this.active.id : this.hasActive;
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$get(this.$api.clientsDays)
            .then(({data}) => {
              this.form = data.find(group => group.id === id);
            })

      }else{
          this.form = {
            id:this.hasActive ,
            status: 1,
            title: '',
          }
      }
    },
    openModal() {
      this.changeLanguage('en',true)

      this.$v.form.$reset()
    },
    save() {
      console.log('work')
      this.$v.form.$touch()
      if (!this.$v.form.$error && !this.loading) {
        this.loading = true
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$put(this.$api.clientsDays, JSON.parse(JSON.stringify(this.form)))
            .then(({data}) => {
              console.log(data)
              this.form = data
              this.hasActive=data.id
            })
            .finally(() => this.loading = false)
      }
    },
    deleteGroup() {
      const {id} = this.form;
      this.$axios.$delete(`${this.$api.clientsDays}/${id}`).then(() => {
        this.$refs['modal-group'].hide();
        this.$emit('delete',id)
      })
    }
  }
}
</script>


<style lang="scss">
.modal-category {
  @include large-mobile {
    padding: 0 !important;
    .modal-content {
      padding: 20rem 15rem 25rem 15rem;
    }
  }

  &__name {
    font-family: 'Atyp Display';
    margin-top: 15rem;
  }

  &__switcher {
    .button-switcher__btn {
      min-width: 130rem;
    }
  }

  &__footer {
    display: block;
    margin-top: 40rem;
    padding: 0;
    border: 0;

    &-btn {
      min-width: 156rem;

      &:not(:last-child) {
        margin-right: 15rem;
      }
    }
  }

  &__body {
    margin-top: 40rem;
    min-height: 200rem;
  }

  &__container {
    padding-bottom: 20rem;
    margin-right: -40rem;
    padding-right: 37rem;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 60vh;
    @include large-mobile {
      max-height: inherit;
    }

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(#D2D2D7, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background: $blue;
    }
  }

  &__label {
    font-family: 'Gilroy';
    font-weight: 600;
  }

  &__row {
    flex-wrap: nowrap;
  }

  &__column {
    &_left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 205rem;
      min-width: 205rem;
    }

    &_right {
      width: 100%;
    }
  }

  &__box {
    border-radius: 30rem;
    padding: 15px;
    &:not(:first-child) {
      margin-top: 20rem;
    }
  }

  &__select {
    .select__head {
      color: $default;
    }
  }

  &__field {
    &:not(:first-child) {
      margin-top: 15rem;
    }
  }

  &__question {
    margin-top: 35rem;
    padding-bottom: 15rem;
    @include large-mobile {
      margin-top: 20px;
    }

    &-label {
      font-family: 'Gilroy';
      padding-top: 15rem;
    }

    &-btn {
      min-width: 185rem;
      margin-top: 20rem;
      margin-left: 29rem;
    }
    &-subfilter {
      border: 1px solid #D2D2D7;
    }
  }

}

.modal-group {
  .modal-dialog {
    max-width: 921px;
  }

  .modal-category__head {
    margin-bottom: 45px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__btn {
    margin-right: 13px;
    min-width: 130px;

    &:nth-last-child(1) {
      margin-right: 0;
    }
  }

  &__footer {
    margin-top: 75px;
  }
}

.modal-category__head-column-flex {
  display: flex;
  justify-content: flex-end;
  top: 20px;
}

@include large-mobile {
  .modal-group .modal-category__head {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .modal-group__footer {
    margin-top: 20px;
  }
}
</style>
