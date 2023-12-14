<template lang="pug">
  .user-box(@click.prevent="openMobileModal")
    .user-box__body
      module-user-info(
        :avatar="avatar"
        :name="name"
        :about="about"
        big
        :edit="edit"
      )
      modal-avatar(:avatar="avatar" :isClient="isClient" :userId="userId" @close="$emit('closeModal')")
      .user-box__list
        .user-box__item(v-for="(item, i) in list" :key="i")
          .user-box__label.color-gray.mr-5 {{item.label}}
          .user-box__text.text-wrap.ml-5 {{item.text}}
    .user-box__bottom
      button-primary.user-box__btn(borderRed @click.native.prevent="$emit('btn')") {{buttonText}}
    button-action.user-box__arrow.mobile-visible(icon="arrowRight" v-b-modal.modal-user)

    modal-user(
      :avatar="avatar"
      :name="name"
      :about="about"
      :buttonText="buttonText"
      @btnClose="$emit('btn')"
      :list="list"
      :edit="!edit"
    )
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      default: 0
    },
    isClient: {
      type: Number,
      default: 0
    },
    img: {
      type: String,
      default: "settings__img.svg"
    },
    avatar: {
      type: [Object,Boolean],
      default: false
    },
    name: {
      type: String,
      default: "Alexandr Bairamov"
    },
    about: {
      type: String,
      default: "New Your, Rochester "
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    buttonText: {
      type: String,
      default: ""
    },
    edit: {
      type: Boolean,
      default: false
    },
  },
  methods:{
    openMobileModal(){
      if(!this.$screen.lt) this.$bvModal.show('modal-user')
    }
  }
}
</script>

<style lang="scss">
.user-box {
  border: 1px solid $light-gray;
  padding: 38rem 30rem 36rem 30rem;
  border-radius: 20rem;
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;

  @include large-mobile {
    padding: 15rem 40rem 15rem 15rem;
  }

  &__body {
    flex: 1 1 auto;
  }

  &__bottom {
    margin-top: 30rem;
    @include large-mobile {
      display: none;
    }
  }

  &__btn {
    width: 100%;
  }

  &__list {
    margin-top: 10rem;

    @include large-mobile {
      display: none;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rem 0;

    &:not(:first-child) {
      border-top: 1px solid $light-gray;
    }
  }

  &__label {
    font-size: 17rem;
  }

  &__text {
    font-size: 16rem;
  }

  &__arrow {
    position: absolute;
    right: 6rem;
    top: 21rem;
  }

}
</style>