<template lang="pug">
  .commercial-banner-form(:key="LANG")
    //.commercial__top(v-if="$route.params.id")
    //  modal-commercial(
    //    :api="$api.banner"
    //    redirect="/support-chat/banner"
    //    open="/commercial/banner"
    //    del="/admin/commercial/notifications"
    //    title="Commercial banners"
    //  )
    .commercial__head.flex.flex_vertical.flex_justify
    part-analytics-box.section-annoucements__analytics(v-if="form" :key="pageKay" :slides="[form]")
    form.commercial__body(ref="form")
      module-add-photo.commercial__add-file(
        v-if="LANG === 'en'"
        img="" title="" isDisabled big
        @click.prevent.native="openGallery()"
      )
        template(#text)
          .commercial__add-text
            | Add a size image 1400х250.
            br
            | In the future it will be used as a background image
      modal-gallery(@save="getImg")
      .commercial__column.commercial__column_left
        .commercial__fields
          .commercial__field
            .commercial__field-row.commercial__field-row-head
              .commercial__fields__label.h3 Text
              form-radio-switch(v-if="LANG === 'en'" name="text" :key="getPageInfoKey" :checked="form.details.showText" @change="(val) => form.details.showText = val ")
        .commercial__field
          label.commercial__label.h4(v-if="LANG === 'en'")  Name of advertises
          form-input.commercial__input(
            placeholder="Up to 10 times more views"
            name="title"
            v-model="form.name"
            @input="$v.form.name.$touch()"
            :error="$v.form.name.$error"
          )
        template(v-if="form.details.showText")
          .commercial__field
              label.commercial__label.h4 Title
              form-input.commercial__input(
                placeholder="Up to 10 times more views"
                name="title"
                v-model="form.details.title"
                @input="$v.form.details.title.$touch()"
                :error="$v.form.details.title.$error"
              )
          .commercial__field
            label.commercial__label.h4 Description
              form-input.commercial__input(
                textarea
                placeholder="Description"
                v-model="form.details.desc"
                @input="$v.form.details.desc.$touch()"
                :error="$v.form.details.desc.$error"
                name="description"
                big
              )

        .commercial__fields(v-if="LANG === 'en'")
          .commercial__field
            label.commercial__label.h4 Link
            form-input.commercial__input(
              placeholder="http//:"
              type="url"
              name="link"
              v-model="form.link"
              @input="$v.form.link.$touch()"
              :error="$v.form.link.$error"
            )

        .commercial__bottom
          button-primary.commercial__btn.commercial__btn_save(gray :loading="loadingDraft" @click.prevent.native="saveCommercial(0)")
            span.mobile-hidden Save as draft
            span.mobile-visible Draft
          .commercial__buttons.flex
            button-primary.commercial__btn.commercial__btn_delete(gray v-if="form.id" icon="close" @click.prevent.native="delCommercial")
              | Delete
            button-primary.commercial__btn.commercial__btn_create(blue :loading="loading" @click.prevent.native="saveCommercial()") Create
    modal-delete(@cancel="deleteId = null" @deleteItem="delModalCommercial")
</template>

<script>
import {minLength, required, requiredIf, url} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";
import deleteItem from "@/mixins/deleteItem";

export default {
  data() {
    return {
      pageKay:0,
      getPageInfoKey:0,
      form: {
        file: '',
        name: '',
        client_id: 1,
        details: {
          title:'',
          desc: '',
          showText:true
        },
        link: '',
        banner_horizontal: 1,
        type: 1,
      },
      loadingDraft: false,
      loading: false,
      title: '',
      file: '',
    }
  },
  mixins: [deleteItem],
  validations: {
    form: {
      name: {required, minLength: minLength(4)},
      details: {
        title: { required: requiredIf(function () {
            return this.form.details.showText
          }), minLength: minLength(4)},
        desc: { required: requiredIf(function () {
            return this.form.details.showText
          }), minLength: minLength(4)},
      },
      link: {required, url},
      files: []
    }
  },
  created() {
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
      this.$root.$emit('bv::show::modal', 'modal-gallery')
    },
    getImg(val) {
      this.file = val
      this.form.files = [{
        media_id: val.id,
        view_type: 'text'
      }]
      this.form.file = val.original_full_url
      this.pageKay++
      this.$root.$emit('bv::hide::modal', 'modal-gallery')
    },
    getInfo() {
      const id = this.$route.params.id
      if (id) {
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$get(`${this.$api.businesses}/${id}?searchJoin=and&with=details`).then(({data}) => {
          let el = data
          data.details = JSON.parse(data.details)
          this.file = el.banner_images[0]
          this.form = el
          this.form.file = el.banner_images[0] ? el.banner_images[0].original_full_url : ''
          this.title = el.title
          this.getPageInfoKey++
        })
      }
    },
    changeFile(val) {
      this.form.file = val
    },
    saveCommercial(status = 1) {
      this.$v.form.$touch()
      if (!this.loading && !this.loadingDraft && !this.$v.form.$error) {
        const clientId = this.$route.query.clientId
        if (status) this.loading = true
        else this.loadingDraft = true
        if (this.$route.params.id) this.form.id = this.$route.params.id
        this.form.status = status
        this.form.client_id = +clientId
        const form = _.cloneDeep(this.form)
        form.details = JSON.stringify(form.details)
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$put(this.$api.businesses, form).then(({data}) => {
        this.$bvModal.show('modal-thank')
          setTimeout(()=>{
            this.$bvModal.hide('modal-thank')
            this.$router.push(`/commercial/business/${data.id}?clientId=${clientId}`)
          },2000)
        }).finally(() => {
          this.loadingDraft = false
          this.loading = false
        })
      }
    },
    delCommercial() {
      this.deleteId = this.form.id
    },
    delModalCommercial() {
      this.$axios.$delete(`${this.$api.businesses}/${this.form.id}`)
          .then(() => this.$router.push(`/commercial/business?clientId=${clientId}`))
    },
  }
}
</script>
<style>
.section-annoucements__analytics {
  margin: 25px 0;
}

.commercial-banner-form {
  margin-top: 40px;
}

.commercial__field-row-head {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

