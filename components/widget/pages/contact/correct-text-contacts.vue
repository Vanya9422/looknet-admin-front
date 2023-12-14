<template>
  <form class="correct-text__section-list" id="correct-text__section-form" v-if="loading" :key="key">
    <modal-gallery @save="changeImage" :keyImage="keyImage"></modal-gallery>
    <div class="correct-text__section" v-if="LANG === 'en' || LANG ===  ''">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Fill in the fields</div>
            <div class="correct-text__label correct-text__label_small">Image</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <part-replace-photo
            class="correct-text__replace-photo"
            :key="imageKey"
            :id="background_images.background ? background_images.background.id : ''"
            keyImage="background"
            @key="(key) => this.keyImage = key"
            :img="background_images.background ? background_images.background.original_full_url : ''"
            imgDefault="default-product.jpg"
            name="pageBg"
            @delete="deleteImageModal(background_images.background)"
          />
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__label correct-text__label_small tablet-hidden">Phone</div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">H1 header</div>
              <div class="correct-text__label correct-text__label_small min-tablet-hidden">Phone</div>
            </div>
            <form-input class="correct-text__input" v-model="content.title"></form-input>
          </div>
        </div>
      </div>
    </div>
    <correct-text-contact-item title="Phone" :correct="content.phone" @delete="(index) => deleteOne('phone',index)" @add="addNewOne('phone')" @change="(index,id)=>this.content.phone.list[index].label = id"></correct-text-contact-item>
    <correct-text-contact-item title="Email" :correct="content.email" @delete="(index) => deleteOne('email',index)" @add="addNewOne('email')" @change="(index,id)=>this.content.email.list[index].label = id"></correct-text-contact-item>
    <correct-text-contact-item title="Address" :correct="content.address" @delete="(index) => deleteOne('address',index)" @add="addNewOne('address')" @change="(index,id)=>this.content.address.list[index].label = id"></correct-text-contact-item>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__label correct-text__label_small tablet-hidden">Map</div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">H2 header</div>
              <div class="correct-text__label correct-text__label_small min-tablet-hidden"> Map</div>
            </div>
            <form-input class="correct-text__input" v-model="content.map.title"></form-input>
          </div>
          <div class="correct-text__box"></div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">  Latitude</div>
              <div class="correct-text__label correct-text__label_small min-tablet-hidden">Phone</div>
            </div>
            <form-input class="correct-text__input" v-model="content.map.latitude"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">  Longitude</div>
              <div class="correct-text__label correct-text__label_small min-tablet-hidden">Phone</div>
            </div>
            <form-input class="correct-text__input" v-model="content.map.longitude"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__label correct-text__label_small tablet-hidden">Banner</div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">H2 header</div>
              <div class="correct-text__label correct-text__label_small min-tablet-hidden">Banner</div>
            </div>
            <form-input class="correct-text__input" v-model="content.banner.name"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-title h4">Description</div>
            <form-textarea class="correct-text__input" v-model="content.banner.desc" placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem n"></form-textarea>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Button</div>
            </div>
            <form-input class="correct-text__input" v-model="content.banner.btn"></form-input>
          </div>
          <div class="correct-text__field" v-if="LANG === 'en' || LANG ===  ''">
            <part-replace-photo class="correct-text__replace-photo" :key="imageKey" :id="background_images.bannerBackground ? background_images.bannerBackground.id : ''" keyImage="bannerBackground" :img="background_images.bannerBackground ? background_images.bannerBackground.original_full_url : ''" @key="(key)=> this.keyImage = key" @delete="deleteImageModal(background_images.bannerBackground)" imgDefault="need-help__img2.svg" name="bannerBg"></part-replace-photo>
          </div>
        </div>
      </div>
    </div>
    <correct-text-save @save="save()"></correct-text-save>
    <modal-delete @cancel="deleteImage = null" @deleteItem="deleteImageFromMedia"></modal-delete>
  </form>
</template>

<script>
import constructor from "@/mixins/constructor";

export default {
  mixins: [constructor]
}
</script>
