<template lang="pug">
  .correct-text__box
    .correct-text__row.flex.flex_vertical
      .correct-text__column.correct-text__column_left
        .correct-text__label.h3 Pages
      .correct-text__column.correct-text__column_right
        .correct-text__column-buttons.flex.mobile-hidden
          button-primary.correct-text__column-btn(
            v-for="(item,index) in PAGES" :key="index" border medium
            :active="PAGE === item.code"
            @click.native.prevent="changePage(item.code)"
            ) {{ item.name }}
        form-select.correct-text__select.mobile-visible(
          default
          :items="PAGES"
          :value="value"
          @updateValue="updateValue"
        )
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      PAGES: 'correctText/PAGES',
      PAGE: 'correctText/PAGE'
    }),
    value() {
      return this.PAGES.find((item) => this.PAGE === item.code)?.name || '';
    },
  },
  mounted() {
    const query = this.$route.query.page
    if (query) this.CHANGE_PAGES(query);
  },
  methods: {
    ...mapActions({
      CHANGE_PAGES: 'correctText/SET_PAGES'
    }),
    changePage(code) {
      this.CHANGE_PAGES(code)
      this.$changeRouteQuery({page: code})
    },
    updateValue(value) {
      const type = this.PAGES.find((item) => value === item.name)?.code;
      this.changePage(type);
    },
  },
};
</script>
