<template lang="pug">
  .mobile-menu
    .mobile-menu__list.flex.flex_vertical.flex_justify
      .mobile-menu__item
        button-action.mobile-menu__btn(to="/announcement-list" icon="monochrome-app")
      .mobile-menu__item(v-if="isShow(1)")
        button-action.mobile-menu__btn(to="/users" icon="monochrome-user" )
      .mobile-menu__item(v-if="isShow(3) || this.isShow(4) ")
        button-action.mobile-menu__btn(:to="isShow(3) ? '/redaction/web' : '/redaction/category'" icon="monochrome-redaction")
      .mobile-menu__item(v-if="this.isShow(7)")
        button-action.mobile-menu__btn(to="/support-chat" icon="monochrome-support")
      .mobile-menu__item
        item-profile.mobile-menu__profile(v-b-modal.modal-menu)
    modal-menu
</template>

<script>
export default {
  methods: {
    isShow(permission) {
      if(this.$auth.user) return this.$auth.user.permissions_ids.findIndex(item => item === permission) >= 0
    }
  }
}
</script>

<style lang="scss">
.mobile-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #DDE1E3;
  padding: 0 22rem;
  z-index: 200;
  display: none;
  @include small-tablet {
    display: block;
  }

  .button-action__icon {
    min-width: 20px;
    max-width: 20px;
    min-height: 20px;
    max-height: 20px;
    fill: #062439;

  }

  .nuxt-link-active .button-action__icon{
    fill: #556DEE;
  }

  &__list {
    min-height: 48rem;
  }

  &__btn {
    width: 30rem;
    height: 30rem;
  }
}
</style>