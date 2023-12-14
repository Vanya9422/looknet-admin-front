<template lang="pug">
  .commercial-banner-form.commercial__column(:key="LANG")
    //.commercial__top(v-if="$route.params.id")
    //  .commercial__field
    //    label.commercial__label.h4 Select the notification to edit:
    //    form-input.commercial__input(disabled :value="title")
    .commercial__head.flex.flex_vertical.flex_justify(v-if="!$route.params.id")
      h2.commercial__title.commercial__title-mb20.h3 Type of banner
      //button-primary.commercial__add(to="/commercial/business/add" light icon="plusBig" v-if="form.id") Add new
    button-switcher.commercial__head-switcher(v-if="!$route.params.id" :items="switchers" blue @change="switchersActive = switchersActive === 1 ? 0 : 1 " )
    commercial-banner-form(v-if="switchersActive === 1")
    template(v-else)
      .commercial__row
        .commercial__column_left
          .commercial__body
            .commercial__field.mt-0(v-if="LANG === 'en' || LANG ===  ''")
              label.commercial__label.h4  Name of advertises
              form-input.commercial__input(
                placeholder="Up to 10 times more views"
                name="title"
                v-model="form.name"
                @input="$v.form.name.$touch()"
                :error="$v.form.name.$error"
              )
            .commercial__fields(v-if="LANG === 'en' || LANG ===  ''")
              module-add-photo.commercial__add-file-small(
                :img="file ? file.original_full_url : ''"
                title=""
                isDisabled
                name="file"
                big
                @click.prevent.native="openGallery()"
              )
                template(#text) Add a size image 264х334. In the future it will be used as a background image
            .commercial__field
              .commercial__field-row.commercial__field-row-head
                .commercial__fields__label.h3 Text
                form-radio-switch(v-if="LANG === 'en'" :key="getPageInfoKey" :checked="form.details.showDescText"  @change="(val) => form.details.showDescText = val")
            .commercial__fields(v-if="LANG === 'en' || LANG ===  ''")
              .commercial__field
                label.commercial__label.h4 Background color
                colors-list(
                  :colors="bgColors"
                  :activeColor="form.details.bgColor"
                  @change="(val)=> form.details.bgColor = val"
                )

            .commercial__fields(v-if="LANG === 'en' || LANG ===  ''")
              .commercial__field
                label.commercial__label.h4 Link
                form-input.commercial__input(
                  type="url"
                  placeholder="http//:"
                  name="link"
                  v-model="form.link"
                  @input="$v.form.link.$touch()"
                  :error="$v.form.link.$error"
                )
                .commercial__fields(v-if="LANG === 'en' || LANG ===  ''")
            template(v-if="form.details.showDescText")
              .commercial__field(v-if="LANG === 'en' || LANG ===  ''")
                label.commercial__label.h4 Text color
                colors-list(
                  :colors="textColors"
                  :activeColor="form.details.textColor"
                  @change="(val)=> form.details.textColor = val"
                )
              .commercial__field
                label.commercial__label.h4 Title
                form-input.commercial__input(
                  placeholder="Up to 10 times more views"
                  name="title"
                  v-model="form.details.title"
                  @input="$v.form.details.title.$touch()"
                  :error="$v.form.details.title.$error"
                )
        .commercial__column_right
          h3.h3.commercial__column_right-title Final view:
          item-card-premium.item-card-premium(
            v-if="file"
            :name="form.details.showDescText ? form.details.title : ''"
            :img="file.original_full_url"
            :color="form.details.textColor"
            :bgColor="form.details.bgColor"
          )
          module-add-photo.commercial__add-file-small(
            v-else
            :img="form.file || avatar"
            title=""
            isDisabled
            name="file"
            big
          )
            template(#img)
              svg-icon(name="camera")
            template(#text) Here will be a preview of your banner
      .commercial__row
        .commercial__column_left
          .commercial__body
            .commercial__field
              .commercial__field-row.commercial__field-row-head
                .commercial__fields__label.h3 Mobile view
                form-radio-switch(v-if="LANG === 'en'" :key="getPageInfoKey" :checked="form.details.showMobileText" @change="(val) => form.details.showMobileText = val")
            .commercial__fields(v-if="LANG === 'en' || LANG ===  ''")
              module-add-photo.commercial__add-file-small(
                :img="mobileFile ? mobileFile.original_full_url : ''"
                @click.prevent.native="openGallery(true)"
                title=""
                isDisabled
                name="file"
                big
                mobFile
              )
                template(#text) Add a size image 264х334. In the future it will be used as a background image
            template(v-if="form.details.showMobileText")
              .commercial__field
                label.commercial__label.h4 Title
                form-input.commercial__input(
                  placeholder="Up to 10 times more views"
                  name="title"
                  v-model="form.details.mobileTitle"
                  @input="$v.form.details.mobileTitle.$touch()"
                  :error="$v.form.details.mobileTitle.$error"
                )
            .commercial__bottom
              button-primary.commercial__btn.commercial__btn_save(gray :loading="loadingDraft" @click.prevent.native="saveCommercial(0)")
                span.mobile-hidden Save as draft
                span.mobile-visible Draft
              .commercial__buttons.flex
                button-primary.commercial__btn.commercial__btn_delete(gray v-if="form.id" icon="close" @click.prevent.native="delCommercial")  Delete
                button-primary.commercial__btn.commercial__btn_create(blue :loading="loading" @click.prevent.native="saveCommercial()") Create
        .commercial__column_right
          .commercial__body.opacity-0
            .commercial__field
              .commercial__field-row.commercial__field-row-head
                .commercial__fields__label.h3 Mobile view
          item-card-premium.item-card-premium(
            v-if="mobileFile"
            :img="mobileFile.original_full_url"
            :name="form.details.showMobileText ? form.details.mobileTitle : ''"
            :color="form.details.textColor"
            :bgColor="form.details.bgColor"
          )
          module-add-photo.commercial__add-file-small(
            v-else
            :img="form.file || avatar"
            title=""
            isDisabled
            name="file"
            big
          )
            template(#img)
              svg-icon(name="camera")
            template(#text) Here will be a preview of your banner
      modal-gallery(@save="getImg")
    modal-delete(@cancel="deleteId = null" @deleteItem="delModalCommercial")
    modal-thank
</template>

<script>
import draggable from "vuedraggable";
import {uniqueId} from 'lodash'
import {minLength, required, requiredIf, url} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";
import deleteItem from "@/mixins/deleteItem";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      getPageInfoKey:0,
      bgColors: [
        {color: '#EEF1FE'},
        {color: '#556DEE'},
        {color: 'linear-gradient(239.83deg, #E0F0FF 10.5%, #FFE3D3 124.13%)'},
        {color: '#F4F3F4'},
      ],
      textColors: [
        {color: '#062439'},
        {color: '#556DEE'},
        {color: '#fff'},
        {color: '#F4F3F4'},
      ],
      switchers: [
        {
          value: 'Banner_vertical',
          text: 'Banner vertical',
          checked: true,
        },
        {
          value: 'baner_gorizontal',
          text: 'Baner gorizontal',
          checked: false,
        },
      ],
      switchersActive: 0,
      form: {
        name: '',
        link: '',
        client_id: 1,
        status: 1,
        type: 0,
        banner_horizontal: 0,
        details: {
          title: '',
          mobileTitle: '',
          bgColor: 'linear-gradient(239.83deg, #E0F0FF 10.5%, #FFE3D3 124.13%)',
          textColor: '#062439',
          showDescText:true,
          showMobileText:true,
        },
        files: [],
      },
      drag: false,
      title: '',
      avatar: '',
      file: null,
      mobileFile: null,
      mobile: false,
      mobileChecked: true,
      checked: true,
      loading: false,
      loadingDraft: false
    }
  },
  mixins: [deleteItem],
  validations: {
    form: {
      name: {required},
      link: {required, url},
      details: {
        title: {
          required: requiredIf(function () {
            return this.form.details.showDescText
          }), minLength: minLength(4)
        },
        mobileTitle: {
          required: requiredIf(function () {
            return this.form.details.showMobileText
          }), minLength: minLength(2)
        }
      },
    }
  },
  fetch() {
    this.getInfo()
  },
  watch: {
    LANG(val) {
      this.getInfo()
    }
  },
  computed: {
    ...mapGetters({
      LANG: 'correctText/LANG'
    }),
  },
  mounted() {
    const clientId = this.$route.query.clientId
    if (!clientId) this.$router.go(-1)
  },
  methods: {
    openGallery(flag = false) {
      this.mobile = flag
      this.$root.$emit('bv::show::modal', 'modal-gallery')
    },
    getImg(val) {
      if (this.mobile) {
        this.getImagItem(val.id, 'mobile')
        this.mobileFile = val
        this.mobile = false
      } else {
        this.file = val
        this.getImagItem(val.id)
      }
    },
    getImagItem(id, text = 'desc') {
      let index = this.form.files.findIndex(item => item.view_type === text)
      if (index >= 0) this.form.files.splice(index, 1)
      this.form.files.push({
        media_id: id,
        view_type: text
      })
    },
    getInfo() {
      const id = this.$route.params.id
      if (id) {
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$get(`${this.$api.businesses}/${id}?searchJoin=and&with=details`).then(({data}) => {
          this.switchersActive = data.type
          this.form = data
          this.form.details = JSON.parse(data.details)
          this.title = data.name
          this.form.files = []
          data.banner_images.forEach(item => {
            if (item.custom_details.view_type === 'mobile') {
              this.mobileFile = item
            } else {
              this.file = item
            }
          })
          this.getPageInfoKey++
        })
      }
    },
    saveCommercial(status = 1) {
      this.$v.form.$touch()
      if (!this.loading && !this.loadingDraft && !this.$v.form.$error) {
        if (status === 1) this.loading = true
        else this.loadingDraft = true
        this.form.client_id = this.$route.query.clientId
        this.form.status = status
        const form = _.cloneDeep(this.form)
        if (this.$route.params.id) form.id = this.$route.params.id
        form.details = JSON.stringify(form.details)
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$put(this.$api.businesses, form).then(({data}) => {
          this.$bvModal.show('modal-thank')
          setTimeout(() => {
            this.$bvModal.hide('modal-thank')
            this.$router.push(`/commercial/business/${data.id}?clientId=${this.form.client_id}`)
          }, 2000)
        }).finally(() => {
          this.loading = false
          this.loadingDraft = false
        })
      }
    },
    delCommercial() {
      this.deleteId = this.form.id
    },
    delModalCommercial() {
      const id = this.deleteId
      this.$axios.$delete(`${this.$api.businesses}/${id}`)
          .then(() => {
            if (+this.$route.params.id === id) {
              this.$router.push('/commercial/business')
            } else {
              this.$bvModal.hide('modal-commercial')
              this.$bvModal.show('modal-commercial')
              this.$root.$emit('bv::hide::modal', 'modal-commercial')
              this.$root.$emit('bv::show::modal', 'modal-commercial')
            }
          })
    },
    addDescItem() {
      this.form.details.push({
        first: '',
        second: '',
        id: uniqueId('new'),
        order: this.form.details.length + 1
      })
    },

    delDescItem(index) {
      if (this.form.details.length > 1) this.form.details.splice(index, 1)
    },
  }
}
</script>
<style lang="scss">
.opacity-0 {
  opacity: 0;
}

.commercial__title-mb20 {
  margin-bottom: 20px;
}

.commercial__column {
  .add-photo-big .button-photo__wrap {
    border-radius: 10px;
  }

  &_right {
    &-title {
      margin-bottom: 20px;
    }

    .add-photo__inner {
      gap: 16px;
    }

    .button-photo:hover {
      .button-photo__wrap {
        border: 1px dashed #9A9A9A;

        svg {
          fill: #9A9A9A;
        }
      }
    }
  }

  &_left {
    position: relative;
  }
}

.section-annoucements__analytics {
  margin: 25px 0;
}

.commercial-banner-form {
  margin-top: 25px;
}

.commercial__field-row-head {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.commercial__head-switcher {
  margin: 25px 0 0;
  max-width: 340rem;
}

.commercial__add-file-small {
  max-width: 270px;

  .button-photo__wrap {
    padding: 28px;
  }

  &.add-photo-big .button-photo {
    height: 334px;
  }
}

.item-card-premium {
  &, &.card-premium {
    max-width: 264px;
    height: 334px;
  }
}

.card-premium__name {
  overflow-wrap: anywhere;
}

.commercial-banner-form {
  .commercial__head-switcher {
    margin-bottom: 30px;
    @include large-mobile {
      margin-bottom: 20px;
      padding-left: 0;
    }
  }

  .button-switcher__list {
    @include large-mobile {
      padding-left: 0;
    }
  }
}
</style>

