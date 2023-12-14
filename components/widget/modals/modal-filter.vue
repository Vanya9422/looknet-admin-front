<template lang="pug">
  b-modal(
    id="modal-filter"
    ref="modal-filter"
    size="login-size"
    modal-class="modal-filter"
    body-class="modal-filter__body"
    header-class="modal-filter__header"
    footer-class="modal-filter__footer"
    @hide="closeModal"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal')
    h3.modal-filter__title.h3 {{ title }}
    slot
    template(#modal-footer='{ close }')
      .modal-filter__buttons.flex
        button-primary.modal-filter__btn(small gray @click.native='clear') Clear Filters
        button-primary.modal-filter__btn(small blue @click.native='save') Search

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Filter'
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.$refs['modal-filter'].hide();
    },
    save() {
      this.$emit('search')
      this.$refs['modal-filter'].hide();
    },
    clear() {
      this.$emit('clear')
      this.$refs['modal-filter'].hide();
    },
  }
}
</script>

<style lang="scss">
.modal-filter {

  .modal__close {
    width: 34rem;
    height: 34rem;
  }

  &__title {
    font-weight: 500;
    font-family: 'Atyp Display';
    margin-bottom: 26px;
  }

  &__footer {
    padding: 0;
    border: 0;
    margin-top: 20rem;
    display: block;
  }


  &__buttons {
    @include items(2, 5);
  }

}
</style>