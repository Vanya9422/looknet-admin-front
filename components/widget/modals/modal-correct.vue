<template lang="pug">
  b-modal(
    id="modal-correct"
    size="correct-size"
    modal-class="modal-correct"
    body-class="modal-correct__body"
    header-class="modal-correct__header"
    footer-class="modal-correct__footer"
    @show="resetModal"
    @hide="hideModal"
    centered
  )
    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='hideModal')
    template(#modal-footer='{ close }')
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    hideModal() {
      this.changeLanguage('en')
      this.$emit('update', this.categoriesActive.charAt(0))
      this.$emit('close')
      this.$root.$emit('bv::hide::modal', 'modal-correct')
    },
  }
}
</script>
