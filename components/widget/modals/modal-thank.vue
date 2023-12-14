<template lang="pug">
  b-modal(
    id="modal-thank"
    size="thank-size"
    modal-class="modal-thank"
    body-class="modal-thank__body"
    header-class="modal-thank__header"
    footer-class="modal-thank__footer"
    centered
    :hide-footer="true"
    @hide="closeModal()"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal()')
    .modal-thank__icon
      svg-icon(name="check")
    .modal-thank__title.h2.h2_big {{title}}
    .modal-thank__desc.color-gray.h4 {{desc}}
    //button-primary.modal-thank__btn(to="/" blue) Back to home page
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Thank you!"
    },
    desc: {
      type: String,
      default: 'And pay attention - you need to update your adverise in 30 days, or than we deleted this publicaiton'
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.$bvModal.hide('modal-thank')
    }
  }
}
</script>

<style lang="scss">
.modal-thank {
  .modal-content {
    padding-top: 70rem;
    padding-bottom: 70rem;
  }

  @include large-mobile {
    padding: 0 !important;
    .modal-content {
      border-radius: 10rem 10rem 0 0;
      padding: 50rem 15rem 20rem 15rem;
    }
  }

  &__body {
    text-align: center;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 77rem;
    height: 77rem;
    background: #EEF1FE;
    border-radius: 100%;
    margin: 0 auto;

    svg {
      width: 30rem;
      height: 23rem;
      fill: none;
      stroke: $blue;
      stroke-width: 1.5;
    }
  }

  &__title {
    margin-top: 30rem;

    @include large-mobile {
      font-family: 'Atyp Display';
      margin-top: 25rem;
      line-height: 1;
      font-weight: 500;
    }
  }

  &__desc {
    margin: 20rem auto 0 auto;
    font-weight: 400;
    max-width: 400rem;
    @include large-mobile {
      line-height: 1.3;
      font-size: 16rem;
      max-width: 272rem;
    }
  }

  &__btn {
    min-width: 190rem;
    margin-top: 40rem;

    @include large-mobile {
      width: 100%;
      margin-top: 60rem;
    }
  }
}
</style>