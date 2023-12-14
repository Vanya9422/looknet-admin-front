<!--<template lang="pug">-->
<!--  div-->
<!--    .modal-category__box-list(  :key="LANG")-->
<!--      .modal-category__box(ref="form" v-if="categoriesActive === '1 level' && LANG === 'en'")-->
<!--        .modal-category__row.flex.flex_vertical-->
<!--          .modal-category__column.modal-category__column_left-->
<!--            label.modal-category__label.h4 Add an photo-->
<!--          .modal-category__column.modal-category__column_right-->
<!--            modal-gallery(@save="getImg")-->
<!--            module-add-photo(-->
<!--              :img="img"-->
<!--              name="picture"-->
<!--              :error="errors.picture"-->
<!--              @change="(val) => this.img=val"-->
<!--              title="Add your photo for answers, comments and reviews"-->
<!--              isDisabled-->
<!--              v-b-modal:modal-gallery-->
<!--            )-->
<!--      .modal-category__box-->
<!--        .modal-category__row.flex.flex_vertical-->
<!--          .modal-category__column.modal-category__column_left-->
<!--            label.modal-category__label.h4 Category name-->
<!--          .modal-category__column.modal-category__column_right-->
<!--            form-input.modal-category__input(-->
<!--              v-model="form.name"-->
<!--              @input="$v.form.name.$touch()"-->
<!--              :error="$v.form.name.$error"-->
<!--               placeholder="Name")-->
<!--      .modal-category__box(v-if="LANG === 'en'")-->
<!--        .modal-category__row.flex.flex_vertical-->
<!--          .modal-category__column.modal-category__column_left-->
<!--            label.modal-category__label.h4 Change category-->
<!--          .modal-category__column.modal-category__column_right-->
<!--            form-select-array.modal-category__select(-->
<!--              default-->
<!--              colors-->
<!--              :disabled="category ? category.id > 0 : false"-->
<!--              v-model="categoriesActive"-->
<!--              :items="categories"-->
<!--              :color="categoriesColor"-->
<!--              :value="categoriesActive"-->
<!--            )-->
<!--    .modal-category__footer-row.flex.flex_justify-->
<!--      .modal-category__footer-column-->
<!--      .modal-category__footer-column.flex-->
<!--        button-primary.modal-category__footer-btn(gray icon="close" v-if="category && category.id" v-b-modal:modal-delete) Delete-->
<!--        button-primary.modal-category__footer-btn(gray v-else @click.native='hideModal') Cancel-->
<!--        button-primary.modal-category__footer-btn(blue @click.native='save()' :loading="loading") Save changes-->

<!--</template>-->

<!--<script>-->
<!--import { mapGetters } from "vuex";-->
<!--import {minLength, required} from "vuelidate/lib/validators";-->

<!--export default {-->
<!--  props: {-->
<!--    categories: {-->
<!--      type: Array,-->
<!--      default: []-->
<!--    },-->
<!--    level: {-->
<!--      type: String,-->
<!--      default: '1 level'-->
<!--    },-->
<!--    getLevelIds: {-->
<!--      type: Array,-->
<!--      default: []-->
<!--    },-->
<!--    categorySlug: {-->
<!--      type: [String, Boolean],-->
<!--      default: false-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      loading: false,-->
<!--      category: {},-->
<!--      errors: {},-->
<!--      img: null,-->
<!--      name: '',-->
<!--      form: {-->
<!--        name: '',-->
<!--      },-->
<!--      slug: this.categorySlug,-->
<!--      categoriesActive: this.level,-->
<!--      categoriesColor: 'red',-->
<!--    }-->
<!--  },-->
<!--  validations: {-->
<!--    form:{-->
<!--      name: {required, minLength: minLength(2)}-->
<!--    },-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapGetters({-->
<!--      LANGUAGES: 'correctText/LANGUAGES',-->
<!--      LANG: 'correctText/LANG'-->
<!--    }),-->
<!--  },-->
<!--  watch: {-->
<!--    categoriesActive() {-->
<!--      const sort = this.categories.find(i => i.text === this.categoriesActive)-->
<!--      this.categoriesColor = sort.color-->
<!--    },-->
<!--    LANG() {-->
<!--      this.getCategory()-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    if (this.slug) {-->
<!--      this.getCategory()-->
<!--    } else {-->
<!--      this.form={-->
<!--        name:''-->
<!--      }-->
<!--      this.img = ''-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    getImg(val) {-->
<!--      this.img = val.original_full_url-->
<!--      this.media_id = val.id-->
<!--      this.errors.picture = false-->
<!--    },-->
<!--    hideModal() {-->
<!--      this.img = null-->
<!--      this.name = ''-->
<!--      this.changeLanguage('en')-->
<!--      this.$emit('update', this.categoriesActive.charAt(0))-->
<!--      this.$emit('close')-->
<!--      this.$root.$emit('bv::hide::modal', 'modal-category')-->
<!--    },-->
<!--    getCategory() {-->
<!--      this.$axios.setHeader('Accept-Language', this.LANG || 'en')-->
<!--      this.$axios.$get(`/admin/categories/${this.slug}`).then(({ data }) => {-->
<!--        this.category = data-->
<!--        this.form.name = data.name || ''-->
<!--        if(data.id) this.form.id = data.id-->
<!--        this.img = data.picture ? data.picture.original_full_url : ''-->

<!--      })-->
<!--    },-->
<!--    async save() {-->
<!--      const getIndex = +this.categoriesActive.charAt(0) - 2-->
<!--      this.$v.form.$touch()-->

<!--      if (  !this.media_id && getIndex < 0) {-->
<!--        this.errors.picture = true-->
<!--        return-->
<!--      }-->
<!--      if (this.$v.form.$error) return-->
<!--      this.loading = true-->
<!--      const form = this.form-->
<!--      if (getIndex >= 0) form.parent_id = this.getLevelIds[getIndex]-->
<!--      if (getIndex < 0) form.media_id = this.media_id-->
<!--      let api = ''-->
<!--      if (this.slug) {-->
<!--        api = `/admin/categories/${this.slug}`-->
<!--        form._method = 'PUT'-->

<!--      } else {-->
<!--        api = '/admin/categories'-->
<!--      }-->
<!--      this.$axios.setHeader('Accept-Language', this.LANG || 'en')-->
<!--      await this.$axios.$post(api, form).then(({ data: { slug, id } }) => {-->
<!--        this.$emit('saveCategory', { slug, id })-->
<!--        this.slug = slug-->
<!--        this.errors = {}-->
<!--        this.$bvModal.show('modal-thank')-->
<!--        setTimeout(() => {-->
<!--          this.$bvModal.hide('modal-thank')-->
<!--        }, 2000);-->
<!--      }).catch(({ response }) => {-->
<!--        this.errors = response.data.errors-->
<!--      }).finally(() => {-->
<!--        this.loading = false-->
<!--      })-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--.modal-category__box-list .button-photo__img img{-->
<!--  border-radius: 27px;-->
<!--}-->
<!--</style>-->
