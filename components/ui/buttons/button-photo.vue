<template lang="pug">
  .button-photo(:class="{error:error}")
    input.button-photo__input(:disabled="disabled" accept=".jpeg, .jpg, .png, .svg, .gif, .webp" :name="name" ref="file" :multiple="multiple" id="file" type="file" @input="getFileObject()")
    .button-photo__wrap.button-photo__wrap_img(v-if="img")
      .button-photo__img
        img(:src="img")
      .button-photo__edit
        svg-icon(name="editSmall")
    .button-photo__wrap.button-photo__wrap_img(v-else-if="img")
      .button-photo__img
        img(:src="require(`~/assets/img/${img}`)")
      .button-photo__edit
        svg-icon(name="editSmall")
    .button-photo__wrap(v-else)
      slot
         svg-icon(name="camera" viewBox="0 0 24 24")

</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'file'
    },
    img: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    getFileObject() {
      const input = this.$refs.file
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => this.$emit('change', e.target.result,this.$refs.file.files);
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
}
</script>

<style lang="scss">
.button-photo {
  position: relative;
  display: inline-flex;
  width: 120rem;
  height: 120rem;
  flex-shrink: 0;
  cursor: pointer;

  &.error {
    .button-photo__wrap {
      border-color: $red;

      svg {
        fill: $red;
      }
    }
  }

  @include min-large-mobile {
    &:hover {
      .button-photo {
        &__wrap {
          border-color: $blue;

          svg {
            fill: $blue;
          }
        }
      }
    }
  }

  @include large-mobile {
    width: 96rem;
    height: 96rem;
  }

  &__input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
    &:disabled{
      z-index: -1;
    }
  }

  &__wrap {
    width: 100%;
    height: 100%;
    border: 1px dashed #D2D2D7;
    //border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease .15s;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 1px;
      top: 1px;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      border-radius: 100%;
      background: #fff;
    }

    svg {
      width: 24rem;
      height: 24rem;
      fill: #9A9A9A;
      position: relative;
      z-index: 2;
      transition: ease .1s;
    }
    img{
      position: relative;
      z-index: 2;
    }

    &_img {
      border: 1px solid $light-gray;


      &:before {
        display: none;
      }
    }

    @include large-mobile {
      svg {
        fill: $default;
      }
    }
  }

  &__img {
    max-width: 90%;
    max-height: 90%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;

    img {
      //max-height: 100rem;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    @include large-mobile {
      img {
        max-height: 100%;
      }
    }
  }

  &__edit {
    position: absolute;
    right: 1px;
    bottom: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $blue;
    border-radius: 100%;
    width: 34rem;
    height: 34rem;
    z-index: 9;

    svg {
      fill: #fff !important;
      width: 16rem;
      height: 16rem;
    }

    @include large-mobile {
      right: -3px;
    }
  }
}
</style>
