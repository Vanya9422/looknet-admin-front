<template lang="pug">
  b-modal(
    id="modal-category"
    size="category-size"
    modal-class="modal-category"
    body-class="modal-category__body"
    header-class="modal-category__header"
    footer-class="modal-category__footer"
    @show="resetModal"
    @hide="hideModal"
    centered
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='hideModal')
      .modal-category__head.flex.flex_vertical.flex_justify
        .modal-category__head-column
          .modal-category__desc(:class="`color-${color}`" v-if="switcher") {{level}}
          .modal-category__desc(:class="`color-${color}`" v-else) {{desc}}
          h3.modal-category__name.h3 Category
        .modal-category__head-column.modal-category__head-column-flex()
          .correct-text__column-buttons.flex(v-if="isShowLangSelector")
            form-select-languages(:key="LANG")

          .add-filters-button
            .modal-category__footer-modal(
              v-if="showFooterModal"
              @mouseleave="showFooterModal = false"
            )
              button-primary(gray @click.native='$refs.filterBase.makeNewFilter(0)') Add Filter
              button-primary(gray @click.native='$refs.filterBase.makeNewFilter(3)') Фильтр со значениями
              button-primary(gray @click.native='$refs.filterBase.makeNewFilter(2)') Фильтр да \ нет
              button-primary(gray @click.native='$refs.filterBase.makeNewFilter(4)') Filter Max - Min
            button-primary.modal-category__footer-btn(
              icon="plusBig"
              @click.native.prevent="showFooterModal = true"
              blue
              v-if="switcher && LANG === 'en'"
            )
              | Add Filter

          button-switcher.modal-category__switcher(:items="switchers" blue name="correctModal" @change="tabs" v-if="category.id")

    .modal-category__container(v-if="switcher" :key="LANG")
      .errors(v-if="errorsFilter")
        div.p.color-red(v-for="(value, name,index) in errorsFilter" :key="index") {{ value[0] }}

      part-filters-base(
        v-if='category'
        :category-id="category.id"
        ref="filterBase"
        @update="updateFilters"
      )

    .modal-category__box-list(v-else :key="LANG")
      form.modal-category__box(ref="form" v-if="categoriesActive === '1 level' && LANG === 'en'")
        .modal-category__row.flex.flex_vertical
          .modal-category__column.modal-category__column_left
            label.modal-category__label.h4 Add an photo
          .modal-category__column.modal-category__column_right
            modal-gallery(@save="getImg")
            module-add-photo(
              :img="img"
              name="picture"
              :error="errors.picture"
              @change="(val) => this.img=val"
              title="Add your photo for answers, comments and reviews"
              isDisabled
              v-b-modal:modal-gallery
            )
      .modal-category__box
        .modal-category__row.flex.flex_vertical
          .modal-category__column.modal-category__column_left
            label.modal-category__label.h4 Category name
          .modal-category__column.modal-category__column_right
            form-input.modal-category__input(v-model="name" :error="errors.name ? errors.name : false" placeholder="Name")
      .modal-category__box(v-if="LANG === 'en'")
        .modal-category__row.flex.flex_vertical
          .modal-category__column.modal-category__column_left
            label.modal-category__label.h4 Change category
          .modal-category__column.modal-category__column_right
            form-select-array.modal-category__select(
              default
              colors
              :disabled="category ? category.id > 0 : false"
              v-model="categoriesActive"
              :items="categories"
              :color="categoriesColor"
              :value="categoriesActive"
            )

    template(#modal-footer='{ close }')
      .modal-category__footer-row.flex.flex_justify
        .modal-category__footer-column

        .modal-category__footer-column.flex
          button-primary.modal-category__footer-btn(gray icon="close" v-if="category && category.id && !switcher" @click.native='deleteModal') Delete

          button-primary.modal-category__footer-btn(gray v-if="switcher" @click.native='hideModal') Cancel

          button-primary.modal-category__footer-btn(blue @click.native='save()' :loading="loading") Save changes
</template>

<script>
import draggable from 'vuedraggable'
import {uniqueId} from 'lodash'
import {mapActions, mapGetters} from "vuex";
import {minLength, required, requiredIf, url} from "vuelidate/lib/validators";
import ModalDelete from "./modal-delete";

export default {
  components: {
    ModalDelete,
    draggable,
  },
  props: {
    color: {
      type: String,
      default: 'red'
    },
    categoryId: {
      type: [Number, Boolean],
      default: false
    },
    categorySlug: {
      type: [String, Boolean],
      default: false
    },
    categories: {
      type: Array,
      default: []
    },
    getLevelIds: {
      type: Array,
      default: []
    },
    desc: {
      type: String,
      default: 'Edit'
    },
    level: {
      type: String,
      default: '1 level'
    },
  },
  data() {
    return {
      showFooterModal: false,
      deleteItem: null,
      switchers: [
        {
          value: 'Category',
          text: 'Category',
          checked: true
        },
        {
          value: 'Filters',
          text: 'Filters',
        }
      ],
      switcher: true,
      categoriesActive: '1 level',
      categoriesColor: 'red',
      name: '',
      id: '',
      img: null,
      media_id: null,
      drag: false,
      subFilterActive: {},
      category: {},
      filters: [{
        name: '',
        answers: [
          {
            newId: 1,
            name: '',
            order: 1
          }
        ]
      }],
      hasFilters: false,
      openHasFilters: false,
      errors: {
        picture: false
      },
      newCategoryId: null,
      errorsFilter: null,
      slug: this.categorySlug,
      loading: false,
      edit: false,
    }
  },
  validations: {
    filters: {
      $each: {
        name: {required, minLength: minLength(3)},
        answers: {
          $each: {
            name: {required, minLength: minLength(3)}
          }
        }
      }
    }
  },
  watch: {
    categoriesActive() {
      const sort = this.categories.find(i => i.text === this.categoriesActive)
      this.categoriesColor = sort.color
    },
    name(val) {
      if (val.length > 2) this.errors.name = false
    },
    img(val) {
      if (val) this.errors.picture = false
    },
    LANG() {
      this.getCategory()
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    ...mapGetters({
      LANGUAGES: 'correctText/LANGUAGES',
      LANG: 'correctText/LANG'
    }),
    isShowLangSelector() {
      if (!this.category.id) return false;
      if (this.switcher) {
        return !!this.category.filters?.length;
      }
      return true;
    },
  },
  mounted() {
    this.SET_LANGUAGES()
  },
  methods: {
    ...mapActions({
      SET_LANGUAGES: 'correctText/SET_LANGUAGES',
      CHANGE_LANGUAGE: 'correctText/SET_LANGUAGE'
    }),
    getImg(val) {
      this.img = val.original_full_url
      this.media_id = val.id
    },
    changeLanguage(code) {
      this.CHANGE_LANGUAGE(code)
      this.$changeRouteQuery({lang: code})
    },
    tabs() {
      this.switcher = !this.switcher;
      if (!this.openHasFilters) this.changeLanguage('en')
      // if (this.switcher === true) this.getFilters()
    },
    // getFilters(first = false) {
    //   this.$axios.setHeader('Accept-Language', this.LANG || 'en')
    //   this.$axios.$get(`/admin/filters?page=1&search=category_id:${this.categoryId || this.category.id}&with=answers&orderBy=order&sortedBy=asc`)
    //     .then(({data}) => {
    //       if (this.switcher === true && data.length === 0) this.changeLanguage('en')
    //       if (first && data.length > 0) this.openHasFilters = true
    //       if (data.length > 0) this.filters = data
    //       if (!this.hasFilters) this.hasFilters = data.length > 0
    //     })
    // },
    resetModal() {
      this.categoriesActive = this.level
      this.switcher = false
      this.errors = {
        picture: false
      }
      this.errorsFilter = null
      this.slug = this.categorySlug
      if (this.slug) {
        this.getCategory(true)
      } else {
        this.name = ''
        this.id = ''
        this.img = ''
      }

    },
    getCategory(flag = false) {
      this.$axios.setHeader('Accept-Language', this.LANG || 'en')
      this.$axios.$get(`/admin/categories/${this.slug}`).then(({data}) => {
        this.category = data
        this.name = data.name || ''
        this.id = data.id || ''
        this.img = data.picture ? data.picture.original_full_url : ''
        this.edit = true
        // this.getFilters(flag)

      })
    },
    deleteModal() {
      this.$root.$emit('bv::show::modal', 'category-modal-delete')
    },
    hideModal() {
      this.filters = [{
        name: '',
        answers: [
          {
            newId: 1,
            name: '',
            order: 1
          }
        ]
      }]
      this.img = null
      this.category = {}
      this.edit = false
      this.name = ''
      this.changeLanguage('en')
      this.$emit('update', this.categoriesActive.charAt(0))
      this.$emit('close')
      this.$root.$emit('bv::hide::modal', 'modal-category')
    },
    async save() {
      this.loading = true
      if (this.switcher) {
        await this.$refs.filterBase.saveFilters();
        this.$bvModal.show('modal-thank')
        setTimeout(() => {
          this.$bvModal.hide('modal-thank')
        }, 2000);
      } else {
        await this.saveCategory();
      }

      this.loading = false
    },
    async saveCategory() {
      const getIndex = +this.categoriesActive.charAt(0) - 2
      if (!this.edit && !this.media_id && getIndex < 0) {
        this.errors.picture = true
      } else {
        const form = this.$refs.form
        const data = new FormData(form)
        if (getIndex >= 0) {
          let parent_id = this.getLevelIds[getIndex]
          data.append('parent_id', parent_id)
        }
        data.append('name', this.name)
        if (getIndex < 0 && this.media_id) data.append('media_id', this.media_id)
        let api = ''
        if (this.slug) {
          api = `/admin/categories/${this.slug}`
          data.append('_method', 'PUT')
        } else {
          api = '/admin/categories'
        }
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        await this.$axios.$post(api, data).then(res => {
          this.errors.picture = false
          this.slug = res.data.slug
          this.newCategoryId = res.data.id
          this.category = res.data;
          this.errors = {}
          if (!this.slug) {
            this.changeLanguage('en')
            this.$emit('update', this.categoriesActive.charAt(0))
            this.$root.$emit('bv::hide::modal', 'modal-category')
          }
          this.$bvModal.show('modal-thank')
          setTimeout(() => {
            this.$bvModal.hide('modal-thank')
          }, 2000);
        }).catch(({response}) => {
          this.errors = response.data.errors
        })
      }

    },

    // Скорее всего переделать
    categoryModalDelete() {
      if (this.deleteItem) {
        this.deleteFilter()
        if (this.deleteItem.filters >= 0) {
          this.filters[this.deleteItem.filters].answers.splice(this.deleteItem.index, 1)
        } else {
          this.filters.splice(this.deleteItem.index, 1)
        }
      }
      this.$axios.$post('/admin/categories', {
        categories: [this.category.id],
        _method: 'DELETE'
      })
      this.deleteItem = null
      this.hideModal()
    },
    updateFilters(filters) {
      this.category.filters = filters;
    },
  }
}
</script>

<style lang="scss">
.add-filters-button{
  position: relative;
  @include large-mobile {
    margin-left: 30rem;
  }
}
.modal-category__head-column-flex {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @include large-mobile(30) {
    justify-content: start !important;

    .modal-category__switcher {
      width: 100%;
      margin: 0;
      margin-top: 15rem;
    }
    .button-switcher {
      &__list {
        padding-left: 0;
      }

      &__item:last-child {
        margin-right: 0;
      }
    }
  }
}

@include large-mobile(30) {
  .modal-category__head-column {
    width: 100%;
    margin-bottom: 15rem;
  }
  .correct-text__column-buttons {
    margin-top: 0 !important;
  }
}

.modal-category {
  @include large-mobile {
    padding: 0 !important;
    .modal-content {
      padding: 20rem 15rem 25rem 15rem;
    }
  }

  &__name {
    font-family: 'Atyp Display';
    margin-top: 15rem;
  }

  &__switcher {
    .button-switcher__btn {
      min-width: 130rem;
    }
  }

  &__footer {
    display: block;
    margin-top: 40rem;
    padding: 0;
    border: 0;
    position: relative;

    &-btn {
      min-width: 156rem;

      &:not(:last-child) {
        margin-right: 15rem;
      }
    }
    &-modal {
      position: absolute;
      display: flex;
      width: 350rem;
      flex-direction: column;
      grid-row-gap: 10rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 222;
      padding: 28rem 30rem;
      background: #FFFFFF;
      border: .1rem solid #C7C7C7;
      border-radius: 20rem;
    }
  }

  &__body {
    margin-top: 40rem;
    min-height: 200rem;
    @include large-mobile {
      margin-top: 30rem;
    }
  }

  &__container {
    padding-bottom: 20rem;
    margin-right: -40rem;
    margin-left: -44rem;
    padding-right: 10rem;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 60vh;
    @include large-mobile {
      max-height: inherit;
      margin: 0;

    }

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(#D2D2D7, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background: $blue;
    }
  }

  &__label {
    font-family: 'Gilroy';
    font-weight: 600;
  }

  &__row {
    flex-wrap: nowrap;
  }

  &__column {
    &_left {
      width: 205rem;
      min-width: 205rem;
    }

    &_right {
      width: 100%;
    }
  }

  &__box {
    &:not(:first-child) {
      margin-top: 20rem;
    }
  }

  &__select {
    .select__head {
      color: $default;
    }
  }

  &__field {
    &:not(:first-child) {
      margin-top: 15rem;
    }
  }

  &__question {
    margin-top: 35rem;
    padding-bottom: 15rem;
    @include large-mobile {
      margin-top: 20px;
    }

    &-label {
      font-family: 'Gilroy';
      padding-top: 15rem;
    }

    &-btn {
      min-width: 185rem;
      margin-top: 20rem;
      margin-left: 29rem;
    }
  }

}
</style>
