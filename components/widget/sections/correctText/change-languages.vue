<template lang="pug">
  .correct-text__box
    .correct-text__row.flex.flex_vertical
      .correct-text__column.correct-text__column_left
        .correct-text__label.h3 Language
      .correct-text__column.correct-text__column_right
        .correct-text__column-buttons.flex
          button-primary.correct-text__column-btn.text-capitalize(
            v-for="item in LANGUAGES" :key="item.id" border medium
            :active="LANG === item.code"
            @click.native.prevent="changeLanguage(item)"
            ) {{ item.code }}
          button-primary.correct-text__column-btn.correct-text__column-btn_add(v-b-modal:modal-lang v-if="!withoutPlus" gray icon="plusBig" medium)
          modal-lang(v-if="!withoutPlus" :key="activeLang?`key-${activeLang.id}` : 0" :lang="activeLang" @close="activeLang = null")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalDelete from "../../modals/modal-delete";

export default {
  components: {ModalDelete},
  props: {
    withoutPlus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeLang: null
    }
  },
  computed: {
    ...mapGetters({
      LANGUAGES: 'correctText/LANGUAGES',
      LANG: 'correctText/LANG'
    }),
  },
  mounted() {
    this.SET_LANGUAGES()
    const query = this.$route.query.lang || ''
    if (query) this.CHANGE_LANGUAGE(query);
  },
  methods: {
    ...mapActions({
      SET_LANGUAGES: 'correctText/SET_LANGUAGES',
      CHANGE_LANGUAGE: 'correctText/SET_LANGUAGE'
    }),
    changeLanguage(item) {
      if (item.code === this.LANG && !this.withoutPlus) {
        this.activeLang = item
        this.$nextTick(() => this.$bvModal.show('modal-lang'))
      } else {
        this.CHANGE_LANGUAGE(item.code)
        this.$changeRouteQuery({ lang: item.code })
      }
    }
  }
}
</script>
