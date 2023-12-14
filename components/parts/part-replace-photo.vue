<template>
  <div class="replace-photo">
    <div class="replace-photo__img" v-if="img || imgDefault">
      <img class="object-fit" :src="img || require(`~/assets/img/${imgDefault}`)">
    </div>
    <div class="replace-photo__buttons flex">
      <button-primary class="replace-photo__btn" blue icon="penEdit" @click.prevent.native="openGallery">
        <!--input(type="file" :name="name"  ref="file" @change="getFileObject")-->
        {{ img ? 'Replace' : 'Choose' }} Photo
      </button-primary>
      <button-primary v-if="img" class="replace-photo__btn" gray square @click.prevent.native="$emit('delete')" icon="close"></button-primary>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ""
    },
    imgDefault: {
      type: String,
      default: "add-photo__default.jpg"
    },
    name: {
      type: String,
      default: "pageBg"
    },
    keyImage: {
      type: String,
      default: ''
    },
    id:{}
  },
  methods: {
    openGallery() {
      this.$emit('key',this.keyImage)
      this.$bvModal.show('modal-gallery')
    },
    // getImg(val) {
    //   this.$emit('change', val)
    // },
    // getFileObject() {
    //   const input = this.$refs.file
    //   if (input.files && input.files[0]) {
    //     let reader = new FileReader();
    //     reader.onload = (e) => this.$emit('change', e.target.result);
    //     reader.readAsDataURL(input.files[0]);
    //   }
    // }
  }
}
</script>

<style lang="scss">
.replace-photo {
  &__img {
    position: relative;
    overflow: hidden;
    border-radius: 20rem;
    padding-top: div( 460, 874 ) * 100%;

    @include large-mobile {
      border-radius: 7px;
      padding-top: div( 202, 345 ) * 100%;
    }
  }

  &__buttons {
    margin-top: 20rem;
    @include large-mobile {
      margin-top: 10rem;
    }
  }

  &__btn {
    &:not(:last-child) {
      margin-right: 15rem;
    }

    position: relative;

    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    @include large-mobile {
      &:not(:last-child) {
        margin-right: 5rem;
      }
    }
  }

}
</style>
