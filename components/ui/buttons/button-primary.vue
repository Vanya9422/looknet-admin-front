<template lang="pug">
  component.button-primary.h5(
    :is="Tag"
    :to="to ||  false"
    :href="to ||  false"
    :class="Mods"
  )
    template(v-if="loading")
      .button-loading
        svg-icon.button-primary__icon(name="loading" :class="`button-primary__loading`" )
      span.button-primary__text.opacity-0
        slot
    template(v-else)
      svg-icon.button-primary__icon(:name="icon" :class="`button-primary__icon_${icon}`" v-if="icon")
      span.button-primary__text
        slot

</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    light: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    gray: {
      type: Boolean,
      default: false
    },
    grayWithText: {
      type: Boolean,
      default: false
    },
    blue: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    verysmall: {
      type: Boolean,
      default: false
    },
    borderRed: {
      type: Boolean,
      default: false
    },
    bgRed: {
      type: Boolean,
      default: false
    },
    red: {
      type: Boolean,
      default: false
    },
    big: {
      type: Boolean,
      default: false
    },
    medium: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    Mods() {
      return {
        'button-primary_light': this.light,
        'button-primary_gray': this.gray,
        'button-primary_gray-text': this.grayWithText,
        'button-primary_small': this.small,
        'button-primary_blue': this.blue,
        'button-primary_border': this.border,
        'button-primary_verysmall': this.verysmall,
        'button-primary_border-red': this.borderRed,
        'button-primary_background-red': this.bgRed,
        'button-primary_red': this.red,
        'button-primary_big': this.big,
        'button-primary_medium': this.medium,
        'isActive': this.active,
        'button-primary_square': this.square,
      }
    },
    Tag() {
      let component = 'button';
      if (this.link && this.to) component = 'a'
      if (!this.link && this.to) component = 'NuxtLink'
      return component
    }

  }
}
</script>

<style lang="scss">
.opacity-0{
  opacity: 0;
}
.button-loading{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-switcher__btn.nuxt-link-active {
  background: $blue;
  color: #fff;
  fill: #fff;

  &:hover:not(:disabled) {
    background: #4257C7;
    color: #fff;
  }
}

.button-primary {
  position: relative;
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60rem;
  padding: 0 30rem;
  border-radius: 10rem;
  font-size: 16rem;
  font-weight: 600;
  transition: ease .12s;
  cursor: pointer;
  font-family: 'Gilroy';
  transition: 0.3s;
  &__loading{
    margin: 0 !important;
    width: 30px;
    height: 30px;
    animation: lds-ring 2.5s cubic-bezier(0, 0, 0, 0) infinite;

    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  &_square {
    width: 60rem;
    padding: 0;

    .button-primary {
      &__icon {
        margin-right: 0;
      }
    }
  }

  &_big {
    height: 70rem;
  }

  &_medium {
    height: 50rem;
    font-size: 14rem;
  }

  @include large-mobile {
    height: 50rem;
    font-size: 14rem;
    padding: 0 20rem;
    &_big {
      height: 60rem;
    }
    &_square {
      width: 50rem;
      padding: 0;
    }
  }

  &_light {
    background: rgba(85, 109, 238, 0.1);
    color: $blue;
    fill: $blue;

    &:hover {
      // color: #fff;
      background: #D6DDFE;
    }

  }

  &_gray {
    background: #F5F5F7;
    border: 1px solid #F5F5F7;

    &:hover:not(:disabled) {
      background: #E4E4E4;
      border-color: #E4E4E4;
    }
    &-text{
      background: #F4F3EF;
      color: #9A9A9A;
      transition: 0.3s;

      svg{
        stroke: #9A9A9A;
        transition: 0.3s;
      }
      &:hover{
        color: #062439;
        svg{
          stroke: #062439;
        }
      }
    }
    &:hover{
      color: #062439;
    }
  }

  &_small {
    font-size: 14rem;
  }

  &_blue {
    background: $blue;
    color: #fff;
    fill: #fff;

    &:hover:not(:disabled) {
      background: #4257C7;
      color: #fff;
    }


    &:disabled {
      background: $blue;
      opacity: 0.5;
    }
    .button-primary {
      &__icon {
        &_check {
          fill: none;
          stroke: #fff;
        }

        &_penEdit {
          fill: none;
          stroke: #fff;
        }
      }
    }
  }

  &_border {
    background: #fff;
    border: 1px solid #C4C4C4;

    &.isActive {
      border-color: transparent;
      background: $blue;
      color: #fff !important;
    }
  }

  &_verysmall {
    height: 32rem;
    font-weight: 500;
  }

  &_border-red {
    background: none;
    border: 1px solid $red;
    color: $red;
    font-size: 14rem;

    &:hover {
      color: #fff;
      background: $red;
    }
  }

  &_border-primary {
    background: none;
    border: 1px solid $blue;
    color: $blue;
    font-size: 14rem;
  }

  &_background-red{
    background: $red;
    border: 1px solid $red;
    color: #fff;
    font-size: 14rem;

    &:hover {
      color: #fff;
      background: #ef3f3f;
    }
  }

  &_red {
    background: rgba(235, 87, 87, 0.14);
    color: $red;

    .button-primary {
      &__icon {
        &_close {
          stroke: $red;
        }
      }
    }
  }

  &:disabled {
    opacity: .4;
    cursor: default;
  }

  &__icon {
    flex-shrink: 0;
    margin-right: 10rem;

    &_chatting {
      width: 16rem;
      height: 12rem;
      margin-right: 0;
    }

    &_phone {
      width: 11rem;
      height: 10rem;

      margin-top: -1px;
    }

    &_info {
      width: 12rem;
      height: 12rem;
      fill: #C3C8CB;
    }

    &_facebook {
      fill: #556DEE;
      width: 11rem;
      height: 12rem;
    }

    &_gmail {
      fill: #EB5757;
      width: 15rem;
      height: 12rem;
    }

    &_yahoo {
      fill: #7F40BD;
      width: 14rem;
      height: 14rem;
    }

    &_plusBig {
      width: 12rem;
      height: 12rem;
      margin-right: 15rem;
    }

    &_download {
      width: 20rem;
      height: 20rem;
    }

    &_close {
      width: 14rem;
      height: 14rem;
      stroke: $default;
      stroke-width: 1.5;
      margin-right: 15rem;
      @include large-mobile{
          width: 12px;
          height: 12px;
      }
    }

    &_check {
      fill: none;
      stroke: $default;
      width: 20rem;
      height: 20rem;
    }

    &_user {
      width: 18rem;
      height: 18rem;
    }

    &_grid {
      width: 18rem;
      height: 18rem;
    }

    &_grid2 {
      width: 16rem;
      height: 16rem;
    }

    &_danger {
      width: 17rem;
      height: 17rem;
    }

    &_dots {
      margin-right: 0;
      width: 14rem;
    }

    &_penEdit {
      width: 16rem;
      height: 16rem;
      fill: none;
      stroke: $default;
      stroke-width: 1.5;
    }

    @include large-mobile {
      &_phone {
        width: 9rem;
        height: 8rem;
        margin-right: 5rem;
      }
    }
  }

  .phone {
    font-size: 22rem;
    font-family: 'Gilroy';

    @include large-mobile {
      font-size: 18rem;
    }
  }
}
</style>