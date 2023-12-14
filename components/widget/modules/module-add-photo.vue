<template lang="pug">
  .add-photo(:class="{'add-photo-big':big}")
    button-photo.add-photo__btn(
      :disabled="isDisabled"
      :class="{error:error}"
      :img="img" :name="name" @change="(val) => this.$emit('change',val)")
      div.add-photo__inner
        slot(name="img")
          img(:src="require(`~/assets/img/add-photo__default.png`)")
        slot(name="text")
    .add-photo__info
      .add-photo__title {{title}}
      .add-photo__text.color-gray
        slot
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Add an avatar"
    },
    name: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    },
    edit: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },

    error: {
      type: Boolean,
      default: false
    },
    big: {
      type: Boolean,
      default: false
    },
  },

}
</script>

<style lang="scss">
.add-photo {
  display: flex;
  align-items: center;
  font-size: 17rem;

  @include large-mobile {
    font-size: 16rem;
  }

  &__btn {
    margin-right: 30rem;

    @include large-mobile {
      margin-right: 26rem;
    }

    &.error {
      .button-photo__wrap {
        border-color: $red;

        svg {
          fill: $red;
        }
      }
    }
  }

  &__info {
    max-width: 211rem;
    color: #6E6E73;
  }

  &__text {
    margin-top: 10rem;
  }
}

.button-photo__wrap {
  border: 1px dashed #9A9A9A;
  border-radius: 27px;
}

.add-photo {
  .button-photo__img {
    border-radius: 27px;

    img {
      border-radius: 27px;
      max-height: 100%;
    }
  }
}
.add-photo-big {
  width: 100%;

  .button-photo {
    width: 100%;
    height: 245px;
  }

  .button-photo__img {
    border-radius: 27px;

    img {
      border-radius: 27px;
      max-height: 100%;
    }
  }

  .add-photo__btn {
    margin: 0;
  }

  .button-photo__wrap {
    border-width: 1.5px;
  }
}

.add-photo__inner {
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 25px;
}
</style>
