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
            keyImage="background"
            @key="(key) => this.keyImage = key"
            :img="background_images.background ? background_images.background.original_full_url : ''"
            imgDefault="support__img.jpg"
            name="pageBg"
            @delete="deleteImageModal(background_images.background)"
          />
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__label correct-text__label_small tablet-hidden">Page Title</div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">H1 header</div>
              <div class="correct-text__label correct-text__label_small min-tablet-hidden">Page Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.pageTitle"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">H2 header</div>
            </div>
            <form-input class="correct-text__input" v-model="content.title"></form-input>
          </div>
        </div>
      </div>
    </div>
    <correct-text-support-item
      class="correct-text__box"
      :accordion="content.accordion"
      @add="addListItem"
      @addAccordion="addAccordionItem"
      @deleteAccordion="deleteListItem"
      @delete="deleteListItem"
    />
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
            <part-replace-photo class="correct-text__replace-photo" :key="imageKey" keyImage="bannerBackground" :img="background_images.bannerBackground ? background_images.bannerBackground.original_full_url : ''" @key="(key)=> this.keyImage = key" @delete="deleteImageModal(background_images.bannerBackground)" imgDefault="need-help__img2.svg" name="bannerBg"></part-replace-photo>
          </div>
        </div>
      </div>
    </div>
    <correct-text-save @save="save()"></correct-text-save>
  </form>
</template>

<script>
import constructor from "@/mixins/constructor";

export default {
  mixins: [constructor],
  data() {
    return {
      loading: false,
      id: null,
      content: {
        pageTitle: 'Support page',
        title: 'Answers & Questions',
        accordion: [
          {
            name: 'How it works? 2',
            list: [
              {
                title: 'How it works?',
                desc: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n' +
                    '\n' +
                    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat vo'
              },
            ]
          },
          {
            name: 'Safety 2',
            list: [
              {
                title: 'Safety 2',
                desc: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n' +
                    '\n' +
                    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat vo'
              },
            ]
          }
        ],
        banner: {
          name: 'Didn\'t find the answer for your question?',
          desc: 'You can ask us here',
          btn: 'Contact Us'
        }
      },
    }
  },
  methods: {
    addListItem(index) {
      this.content.accordion[index].list.push({
        title: '',
        desc: ''
      })
    },
    addAccordionItem() {
      this.content.accordion.push({
        name: '',
        list: [
          {
            title: '',
            desc: ''
          }
        ]
      })
    },
    deleteListItem(e) {
      if (e.ind) {
        if (this.content.accordion[e.index].list.length > 1) this.content.accordion[e.index].list.splice(e.ind, 1)
      } else {
        if (this.content.accordion.length > 1) this.content.accordion.splice(e.index, 1)
      }
    },
  }
}
</script>
