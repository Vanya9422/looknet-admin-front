<template lang="pug">
  b-modal(
    id="modal-menu"
    ref="modal-menu"
    size="languages"
    modal-class="modal-menu"
    body-class="modal-menu__body"
    header-class="modal-menu__header"
    footer-class="modal-menu__footer"
    :hide-footer="true"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='close()')
    h3.modal-menu__title.h3 {{ title }}
    .modal-menu__list.modal-menu__list-1
      .modal-menu__item(v-for="(item,i) in menu" :key="i" v-if="item.show")
        button-border.w-full(:icon="item.icon" :to="item.to")  {{item.name}}
      .modal-menu__item
        button-border.w-full(  red icon="logout" @click.native.prevent="logOut")  Exit
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Technical assistance'
    },
  },
  watch:{
    $route (to, from){
      this.$bvModal.hide('modal-menu')
    }
  },
  computed: {
    menu() {
      return [
        {
          icon: 'apps',
          to: '/announcement-list',
          name: 'Advertises',
          show: true
        },
        {
          icon: 'user',
          to: '/users',
          name: 'Users',
          show: this.isShow(1)
        },
        {
          icon: 'shield',
          to: '/moderators',
          name: 'Moderators',
          show: this.isShow(6)
        },
        {
          icon: 'editText',
          to: '/redaction/web',
          name: 'Redaction',
          show: this.isShow(3)
        },
        {
          icon: 'editText',
          to: '/redaction/category',
          name: 'Redaction',
          show: this.isShow(4) && !this.isShow(3)
        },
        {
          icon: 'support',
          to: '/support-chat',
          name: 'Support chat',
          show: this.isShow(7)
        },
        {
          icon: 'wallet',
          to: '/commercial',
          name: 'Commercial',
          show: this.isShow(2)
        }
      ]

    }
  },
  methods: {
    logOut() {
      this.$auth.logout()
    }
    ,
    isShow(permission) {
      return this.$auth.user.permissions_ids.findIndex(item => item === permission) >= 0
    }
  }
}
</script>
<style lang="scss">
.modal-menu {
  padding: 0;
  .button-border:not(.button-border_red){
    &,&:hover{
      color: inherit;
    }
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
    margin-bottom: 16px;
  }

  &__list-1 {
    margin-bottom: 32px;

    .button-border {
      justify-content: flex-start;
      line-height: 1;

      .button-border__icon {
        fill: transparent;
        stroke: #6E6E73;
        width: 18px;
        height: 18px;
      }

      &.button-border_red .button-border__icon {
        stroke: $red;
      }
    }
  }

  &__item {
    margin-bottom: 8px;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }

    .button-primary {
      width: 100%;
    }
  }


}
</style>
