<template lang="pug">
  .commercial__row
    .commercial__column.commercial__column_left
      //.commercial__top(v-if="$route.params.id")
      //  .commercial__field
      //    label.commercial__label.h4 Select the banner to edit:
      //    form-input.commercial__input(disabled :value="title")
      //      .input__change(v-b-modal.modal-commercial) Сhange
      //    modal-commercial(
      //      :api="$api.users"
      //      users
      //      redirect="/commercial/users"
      //      open="/commercial/users"
      //      @delete="deleteWithModal"
      //      title="Commercial user"
      //    )
      form.commercial__body(ref="form" :key="LANG")
        .commercial__head.flex.flex_vertical.flex_justify
          h2.commercial__title.h3 Type of advertise
        modal-gallery(@save="getImg")
        module-add-avatar.commercial__field-avatar.commercial__add-avatar.round-file(
          :key="fileKey"
          v-if="LANG === 'en'"
          :img="avatar"
          disabled
          name="file"
          v-b-modal:modal-gallery
        )
          | Add your photo for answers, comments and reviews
        .commercial__fields
          .commercial__field
            label.commercial__label.h4 Name
            form-input.commercial__input(
              placeholder="Up to 10 times more views"
              name="name"
              v-model="form.name"
              @input="$v.form.name.$touch()"
              :error="$v.form.name.$error"
            )
            draggable(
              v-model="form.description"
              group="people"
              chosenClass="chosen-ticket"
              dragClass="dragging-ticket"
              ghostClass="ghost-ticket"
              v-bind="dragOptions"
              @start="drag=true"
              @end="drag=false"
            )
              .commercial__field(v-for="(item,i) in form.description" :key="item.id")
                label.commercial__label.h4 Description {{ i + 1 }}
                .commercial__field-inner
                  .correct-field__drag.handle(v-show="LANG === 'en'")
                    svg-icon(name="menu")
                  form-input.correct-field__input(
                    placeholder="Description"
                    name="description"
                    v-model="item.text"
                    @input="$v.form.description.$each[i].text.$touch()"
                    :error="$v.form.description.$each[i].text.$error"
                  )
                  button-primary.correct-field__btn(v-show="LANG === 'en'" gray icon="close" square @click.native.prevent="delDescItem(i)")

            button-primary.modal-category__question-btn(v-show="LANG === 'en'" gray icon="plusBig" @click.prevent.native="addDescItem") Add a question
          .commercial__field(v-show="LANG === 'en'")
            label.commercial__label.h4 Cost
            form-input.commercial__input(
              name="price"
              placeholder="$ 32.0"
              type="number"
              v-model="form.price"
              @input="$v.form.price.$touch()"
              :error="$v.form.price.$error"
            )
          .commercial__field(v-show="LANG === 'en'")
            label.commercial__label.h4 Top time?
            form-input.commercial__input(
              name="top_days"
              type="number"
              v-model="form.top_days"
              @input="$v.form.top_days.$touch()"
              :error="$v.form.top_days.$error"
            )
          .commercial__field(v-show="LANG === 'en'")
            label.commercial__label.h4 Vip time?
            form-input.commercial__input(
              name="vip_days"
              type="number"
              v-model="form.vip_days"
              @input="$v.form.vip_days.$touch()"
              :error="$v.form.vip_days.$error"
            )
          .commercial__field-rows(v-show="LANG === 'en'")
            .commercial__field
              label.commercial__label.h4 Количество поднятий
                form-input.commercial__input(
                  name="gep_up"
                  type="number"
                  v-model="form.gep_up"
                  @input="$v.form.gep_up.$touch()"
                  :error="$v.form.gep_up.$error"
                )
            .commercial__field
              label.commercial__label.h4 Количество дней
                form-input.commercial__input(
                  name="period_days"
                  type="number"
                  v-model="form.period_days"
                  @input="$v.form.period_days.$touch()"
                  :error="$v.form.period_days.$error"
                )
        .commercial__bottom
          button-primary.commercial__btn.commercial__btn_save(gray :loading="loadingDraft" @click.prevent.native="saveCommercial()")
            span.mobile-hidden Save as draft
            span.mobile-visible Draft
          .commercial__buttons.flex
            button-primary.commercial__btn.commercial__btn_delete(gray  v-if="form.id" icon="close" @click.prevent.native="$bvModal.show('modal-delete')")
              | Delete
            button-primary.commercial__btn.commercial__btn_create(blue :loading="loading" @click.prevent.native="saveCommercial(1)")
              | {{$route.params.id ? 'Update' : 'Create' }}
    .commercial__column.commercial__column_right
      .commercial__sidebar
        .commercial__sidebar-title.h3 Final view:
        item-tariff.commercial__tariff(
          :img="avatar || require(`~/assets/img/diamond.png`)"
          :title="form.name"
          :price="+form.price || 0 "
          time="Pery month"
          :list="form.description"
          blue
        )
    modal-delete(@cancel="deleteId = null;" @deleteItem="delModalCommercial")
    modal-thank
</template>

<script>
import draggable from "vuedraggable";
import {uniqueId} from 'lodash'
import {minLength, required, minValue} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";
import deleteItem from "@/mixins/deleteItem";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      form: {
        files: '',
        name: '',
        description: [{
          text: '',
          order: 1,
          id: 1,
        }],
        price: '',
        top_days: '',
        vip_days: '',
        gep_up: '',
        period_days: '',
      },
      fileKey: 0,
      loading: false,
      loadingDraft: false,
      drag: false,
      flag: false,
      title: '',
      avatar: '',
    }
  },
  mixins: [deleteItem],
  validations: {
    form: {
      name: {required, minLength: minLength(4)},
      description: {
        $each: {
          text: {required, minLength: minLength(3)}
        }
      },
      price: {required},
      top_days: {minValue: minValue(0)},
      vip_days: {minValue: minValue(0)},
      gep_up: {minValue: minValue(0)},
      period_days: {minValue: minValue(0)},
      group_id: {required},
    }
  },
  fetch() {
    this.getInfo()
  },
  watch: {
    LANG(val) {
      this.getInfo()
    },
  },
  computed: {
    ...mapGetters({
      LANG: 'correctText/LANG'
    }),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: this.LANG !== 'en',
        ghostClass: "ghost"
      };
    },
  },
  created() {
    this.form.group_id = this.$route.query.group
  },
  methods: {
    getImg(val) {
      this.avatar = val.original_full_url
      this.form.files = [{media_id: val.id}]
      this.fileKey++
    },
    getInfo() {
      const id = this.$route.params.id
      if (id) {
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$get(`${this.$api.commercialUsers}/${id}?with=period_of_stay`).then(({data}) => {
          let el = data
          el.description = JSON.parse(data.description)
          this.form = el
          this.title = el.name
          this.avatar = el.avatar ? el.avatar.original_full_url : null
        }).catch(() => this.$router.push('/commercial'))
      }
    },
    saveCommercial(status = 0) {
      if (this.loadingDraft && this.loading) return false
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        const form = _.cloneDeep(this.form)
        form.description = this.getDescription()
        form.status = status
        if (status === 1) this.loading = true
        else this.loadingDraft = true
        if (this.$route.params.id) form.id = this.$route.params.id
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        this.$axios.$put(this.$api.commercialUsers, form).then(({data}) => {
          this.$bvModal.show('modal-thank')
          setTimeout(() => {
            this.$bvModal.hide('modal-thank')
            const group = this.$route.query.group
            this.$router.push(`/commercial/users/${data.id}?group=${group}`)
          }, 2000)
        }).finally(() => {
          this.loadingDraft = false
          this.loading = false
        })
      }
    },
    deleteWithModal(id) {
      this.deleteId = id
      this.flag = true
    },
    delModalCommercial() {
      const id = this.$route.params.id
      this.$axios.$delete(`${this.$api.commercialUsers}/${id}`)
          .then(() => {
            const  group = this.$route.query.group
            // if (+this.$route.params.id === id) {
              this.$router.push(`/commercial/users?group=${group}`)
            // } else {
            //   this.$root.$emit('bv::hide::modal', 'modal-commercial')
            //   this.$root.$emit('bv::show::modal', 'modal-commercial')
            // }
          })
    },
    addDescItem() {
      this.$v.form.$reset()
      this.form.description.push({
        text: '',
        id: uniqueId('new-')
      })
    },

    delDescItem(index) {
      if (this.form.description.length > 1) this.form.description.splice(index, 1)
    },
    getDescription() {
      return JSON.stringify(this.form.description)
    }
  }
}
</script>
<style lang="scss">
.commercial__field {
  &-inner {
    display: flex;
    margin-top: 15px;
  }

  &-rows {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 20px;
    justify-content: space-between;
    @include large-mobile() {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

.commercial__field {
  &, * {
    box-shadow: none !important;
  }
}
</style>
