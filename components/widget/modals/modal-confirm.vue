<template lang="pug">
  b-modal(
    id="modal-confirm"
    ref="modal-confirm"
    size="login-size"
    modal-class="modal-confirm"
    body-class="modal-confirm__body"
    header-class="modal-confirm__header"
    footer-class="modal-confirm__footer"
    @show="openModal"
    @hide="closeModal"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal()')
    h3.modal-confirm__title.h3 {{ title }}
    p.modal-confirm__desc.desc.p  {{ desc }}
    confirm-code(@input="(res) => this.codeString = res" :error="error")
    template
      .c-pointer.registration-form__desc.mobile-hidden.p.color-blue(
        v-if="isShow && currentTime === 0" @click="resendCode"
      )
        | Resend code
      .registration-form__desc.mobile-hidden.p.color-gray(v-else)
        | Send the code again {{ $getMinutes(currentTime) }}
    template(#modal-footer='{ close }')
      .modal-location__buttons.flex
        div
        button-primary.modal-location__btn(small gray @click.native='closeModal()') Close
        button-primary.modal-location__btn(small blue @click.native='save()') Send

</template>

<script>
import timer from "@/mixins/helpers/timer";
import confirmCode from "@/mixins/helpers/confirmCode";

export default {
  props: {
    title: {
      type: String,
      default: 'Confirm your Email'
    },
    desc: {
      type: String,
      default: 'Enter the code from the SMS'
    },
    changeUserInfo: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      codeString: '',
      repeatTime: 300,
      error: false,
    }
  },
  mixins: [timer, confirmCode],
  watch: {
    codeString(val) {
      if (val.length === this.amount) this.error = false
    },
    isShow() {
      this.repeatTime = 300
    }
  },
  methods: {
    openModal() {
      this.stopTimer()
      this.currentTime = this.repeatTime
      this.startTimer()
    },
    closeModal() {
      this.$refs['modal-confirm'].hide();
    },
    resendCode() {
      this.$emit('reset')
      this.repeatCounter()
    },
    save() {
      if (this.codeString.length !== this.amount) {
        this.error = true
      } else {
        this.error = false
        if (this.changeUserInfo) {
          this.$axios.$put('/admin/moderators', {
            id: this.$route.params.id,
            ...this.info,
            code: this.codeString
          }).then(res => {
            this.closeModal()
            this.$emit('success')
          })
        } else {
          this.$axios.$put('/users/settings/change/password', {
            ...this.info,
            confirmation_auth: this.$auth.user.email || this.$auth.user.phone,
            code: +this.codeString
          }).then(res => {
            this.closeModal()
            this.$emit('success')
          }).catch(({response}) => {
            if (response.data.message === 'Your Code is incorrect') {
              this.error = true
            } else if (response.data.errors.password) {
              this.$emit('error', true)
              this.closeModal()
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.modal-confirm {
  padding: 0;

  .modal-login-size {
    max-width: 637px;
  }

  &.modal-dialog {
    max-width: 632px;
    width: 100%;
  }

  .modal-content {
    padding: 50rem;
    @include large-mobile {
      padding: 30rem 20rem;
    }
  }

  .modal__close {
    width: 34rem;
    height: 34rem;
  }

  &__title {
    font-weight: 500;
    font-family: 'Atyp Display';
    margin-bottom: 26px;
  }

  &__desc {
    margin-bottom: 36px;
  }

  &__error {
    margin-top: 10px;
  }

  &__footer {
    padding: 0;
    border: 0;
    margin-top: 20rem;
    display: block;
  }


  &__buttons {
    @include items(3, 5);
  }

  &__search {
    margin: 30rem 0 25rem;

    .input__icon {
      width: 14rem;
      height: 14rem;
      margin-top: -7rem;
      fill: #6E6E73;
    }

  }

  &__list {
    max-height: 469px;
    height: 55vh;


    &-edit {
      padding: 6px 12px;
      background: #FFFFFF;
      border-radius: 4px;
      color: #556DEE;
      font-size: 17rem;
      line-height: 100%;
      @include large-mobile {
        font-size: 14rem;
      }
    }

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 17rem;
      line-height: 100%;
      margin-bottom: 25rem;
      padding: 0 20rem;
      @include large-mobile {
        font-size: 14rem;
      }
    }

    &-active {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F5F5F7;
      font-size: 20px;
      line-height: 120%;
      @include large-mobile {
        font-size: 16rem;
      }
    }

    &-title {
      color: #9A9A9A;
    }

    &-helper {
      color: #556DEE;
      cursor: pointer;
    }

    &-item {
      padding-bottom: 20rem;
      margin-bottom: 30rem;
      border-bottom: 1rem solid #D2D2D7;

      &:nth-last-child(1) {
        margin-bottom: 0;
        border-bottom: none;
      }
    }

  }

  &__item {
    padding: 15rem 20rem;
    font-size: 20rem;
    line-height: 120%;
    color: #062439;
    border-radius: 5rem;
    transition: 0.3s;
    cursor: pointer;
    @include large-mobile {
      font-size: 16rem;
    }

    &.active,
    &:hover {
      background: #F5F5F7;
    }

    span {
      font-weight: 400;
      font-size: 17px;
      color: #6E6E73;
      padding-left: 10px;
      @include large-mobile {
        font-size: 14rem;
      }
    }

  }

}
</style>