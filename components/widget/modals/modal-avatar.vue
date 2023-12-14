<template lang="pug">
  b-modal(
    id="modal-avatar"
    ref="modal-avatar"
    size="photo-size"
    modal-class="modal-avatar"
    body-class="modal-avatar__body"
    header-class="modal-avatar__header"
    footer-class="modal-avatar__footer"
    @hide="closeModal"
    @show="flag = true"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='close()')
    h3.modal-avatar__title.h3 {{ title }}
    form(ref="send-form" id="send-form" )
      cropper.add-avatar__btn-full(v-if="!flag" stencil-component="circle-stencil" ref="cropper" class="example-cropper" :src="img")
      input(type="hidden" name="_method" value="PUT")
      button-photo.add-avatar__btn-full(v-if="flag" :img="img" :error="error" :name="name" @change="changeImg")
    template(#modal-footer='{ close }')
      .modal-avatar__buttons.flex
        div
        button-primary.modal-avatar__btn(small gray @click.native='closeModal()') Close
        button-primary.modal-avatar__btn(small blue :loading="loading" @click.native='save()') Save
</template>
<script>
import {Cropper, CircleStencil} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    Cropper, CircleStencil
  },
  props: {
    title: {
      type: String,
      default: 'Change Profile Picture'
    },
    user: {
      type: String,
      default: 'Alexandr'
    },
    isClient:{
      type:Number,
      default:0
    } ,
    isAddModerator:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      img:  '',
      name: 'file',
      error: false,
      flag: true,
      loading: false
    }
  },
  methods: {

    closeModal() {
      this.img = ''
      this.$refs['modal-avatar'].hide();
    },
    changeImg(val) {
      this.error = false
      this.flag = false
      this.img = val

    },
    save() {
      if (this.img !== '' && !this.loading) {
        this.loading = true;
        const {canvas} = this.$refs.cropper.getResult();
        if (canvas) {
          const formData = new FormData();
          canvas.toBlob(async blob => {
            if(this.isAddModerator){
              this.$emit('change',blob)
              this.loading = false;
              this.closeModal()
            }else{
              formData.append(
                  "file",
                  blob,
                  "myImageName.png"
              );
              formData.append("path", "/theKoiIsAwesome");
              formData.append("_method", "PUT");
              if(this.isClient){
                formData.append("id", this.isClient);
                this.$axios.$post('/admin/commercial/clients', formData).then((res) => {
                  this.$auth.fetchUser().catch(() => this.$auth.logout());
                  this.closeModal()
                  this.$emit('close')
                  this.loading = false;
                }).catch(() => this.error = true)
              }else{
                formData.append("id", this.$route.params.id);

                this.$axios.$post('/admin/moderators', formData).then((res) => {
                  this.$auth.fetchUser().catch(() => this.$auth.logout());
                  this.closeModal()
                  this.$emit('close')
                  this.loading = false;
                }).catch(() => this.error = true)
              }

            }


          }, "image/png");
        }
      } else {
        this.error = true
      }
    }
  }
}
</script>


<style lang="scss">
.modal-avatar {
  .modal-dialog {
    max-width: 737px;
    width: 100%;
  }

  &__buttons {
    @include items(3, 5);
  }

  .button-photo__img {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-height: 100%;
    }
  }

  &__footer {
    padding: 0;
    margin-top: 20rem;
    display: block;
    border: none;
  }

  .add-avatar__btn-full {
    margin: 24rem 0 20rem;
    height: 550px;
    border-radius: 16px;
    width: 100%;
    overflow: hidden;
    @include large-mobile{
      height: 300px;
    }

    .vue-advanced-cropper__foreground {
      opacity: 0.2;
    }

    .button-photo__wrap {
      border-radius: 16px;
      border-width: 2px;

      svg {
        width: 56px;
        height: 56px;
      }


    }
  }
}
</style>