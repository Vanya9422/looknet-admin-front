<template lang="pug">
  .commercial-banner-form(:key="LANG")
    .commercial__column.commercial__column_left
      //.commercial__top(v-if="$route.params.id")
      //  .commercial__field
      //    label.commercial__label.h4 Select the notification to edit:
      //    form-input.commercial__input(disabled :value="title")
      //      .input__change(v-b-modal.modal-commercial) Сhange
      //    modal-commercial(
      //      :api="$api.notification"
      //      redirect="/commercial/notification"
      //      open="/commercial/notification"
      //      @delete="deleteWithModal"
      //      title="Commercial notification"
      //    )
      .commercial__head.flex.flex_vertical.flex_justify
        h2.commercial__title.h3 Notification
        //button-primary.commercial__add(light icon="plusBig" v-if="form.id" to="/commercial/notification/add") Add new
      form.commercial__body(ref="form")
        .commercial__fields
          .commercial__field
            .commercial__field-row.commercial__field-row-head
              .commercial__fields__label.h3 Text
              form-radio-switch.opacity-0(:checked="form.text" @change="(val) => form.text = form.text === 1 ? 0 : 1")
          .commercial__field
            label.commercial__label.h4 Name
            form-input.commercial__input(
              placeholder="Up to 10 times more views"
              name="title"
              v-model="form.title"
              @input="$v.form.title.$touch()"
              :error="$v.form.title.$error"
            )
            .commercial__fields
          .commercial__field
            label.commercial__label.h4 Decription
              form-input.commercial__input(
                textarea
                v-model="form.description"
                @input="$v.form.description.$touch()"
                :error="$v.form.description.$error"
                name="description"
                big
              )

          .commercial__field
            label.commercial__label.h4 Action Button
              .commercial__field-inner
                form-input.correct-field__input(
                  placeholder="Up to 10 times more views"
                  name="details"
                  v-model="form.details"
                )

        .commercial__fields(v-show="LANG === 'en'")
          .commercial__field
            label.commercial__label.h4 Link
            form-input.commercial__input(
              placeholder="http//:"
              name="link"
              v-model="form.link"
            )

        .commercial__bottom
          button-primary.commercial__btn.commercial__btn_save(gray :loading="loadingDraft" grayWithText @click.prevent.native="saveCommercial(0)")
            span.mobile-hidden Save as draft
            span.mobile-visible Draft
          .commercial__buttons.flex
            button-primary.commercial__btn.commercial__btn_delete(gray grayWithText v-if="form.id" icon="close" @click.prevent.native="delCommercial")
              | Delete
            button-primary.commercial__btn.commercial__btn_create(blue :loading="loading" @click.prevent.native="saveCommercial()")
              | Next
            button-primary.commercial__btn.commercial__btn_create(v-if="$route.params.id" :loading="loadingPublic" @click.prevent.native="saveCommercial(1,true)" blue  )
              | Public
    modal-delete(@cancel="deleteId = null" @deleteItem="delModalCommercial")
    modal-thank
</template>

<script>
import draggable from "vuedraggable";
import {uniqueId} from 'lodash'
import {minLength, required, url} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";
import deleteItem from "@/mixins/deleteItem";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      form: {
        title: '',
        text: 1,
        description: '',
        details: '',
        link: '',
      },
      drag: false,
      loading: false,
      loadingDraft: false,
      loadingPublic: false,
      title: '',
    }
  },
  mixins: [deleteItem],
  validations: {
    form: {
      title: {required, minLength: minLength(4)},
      description: {required, minLength: minLength(8)},
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
      LANG: 'correctText/LANG',
      LANGUAGES: 'correctText/LANGUAGES',
    }),
  },
  methods: {
    ...mapActions({
      CHANGE_LANGUAGE: 'correctText/SET_LANGUAGE'

    }),
    getInfo() {
      const id = this.$route.params.id
      if (id) {
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$get(`${this.$api.notifications}/${id}`).then(({data}) => {
          this.form = data
          this.title = data.title
        })
      }
    },
    saveCommercial(status = 1, publicFlag) {
      this.$v.form.$touch()
      if (!this.loading && !this.loadingDraft && !this.$v.form.$error) {
        if (status && publicFlag) this.loadingPublic = true
        else if (status && !publicFlag) this.loading = true
        else this.loadingDraft = true
        const form = this.$refs.form
        const formData = new FormData(form)
        formData.append('status', status)
        formData.append('_method', 'PUT')
        formData.append('text', this.form.text)
        if (publicFlag) formData.append('public', true)

        if (this.$route.params.id) formData.append('id', this.$route.params.id)
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$post(this.$api.notifications, formData).then(({data}) => {
          this.$bvModal.show('modal-thank')
          setTimeout(() => {
            if (!publicFlag) {
              this.changeLang()
              this.$router.push(`/commercial/notification/${data.id}`)
            }
            this.$bvModal.hide('modal-thank')
          }, 2000)
        }).finally(() => {
          this.loadingPublic = false
          this.loading = false
          this.loadingDraft = false
        })
      }
    },
    changeLang() {
      const index = this.LANGUAGES.findIndex(i => this.LANG === i.code)
      if (index < this.LANGUAGES.length - 1) this.CHANGE_LANGUAGE(this.LANGUAGES[index + 1].code)
    },
    delCommercial() {
      this.deleteId = this.form.id
    },
    deleteWithModal(id) {
      this.deleteId = id
      this.flag = true
    },
    delModalCommercial() {
      const id = this.deleteId
      this.$axios.$delete(`${this.$api.notifications}/${id}`)
          .then(() => {
            if (+this.$route.params.id === id) {
              this.$router.push('/commercial/notification')
            } else {
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
<style>
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
</style>

