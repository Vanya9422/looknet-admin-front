<template lang="pug">
  .select.section-languages(v-click-outside="closeList" :class="Mods")
    .select__label.p.color-gray(v-if="label") {{ label }}
    .select__wrap
      input.select__input(type="hidden" :name="name" :value="value")
      .select__head( @click="toggleList")
        .select__value {{ LANG }}
        .select__arrow(v-if="!disabled")
          svg-icon(name="arrowDown" viewBox="0 0 11 7")
      transition(name="DropDown")
        .select__body(v-if="listOn")
          .select__list
            .select__item(v-for="(item, i) in LANGUAGES" :key="i")
              label.select__btn
                input.select__btn-input(
                  type="radio"
                  :name="name"
                  :value="item"
                  @change="updateValue(item.code);"
                )
                span.select__btn-text
                  span {{ item.code }}

          slot

</template>

<script>
import ClickOutside from 'vue-click-outside';
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    value: {
      type: [Array, Object],
      default: () => ([])
    },
    color: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    big: {
      type: Boolean,
      default: false
    },
    lang: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    borderRight: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    default: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    items: {
      type: [Array, Object],
      default: () => ([])
    }
  },

  data() {
    return {
      listOn: false,
      currentValue: '',
      search: '',
    };
  },

  computed: {
    Mods() {
      return {
        'select_lang': this.lang,
        'select_big': this.big,
        'select_border-right': this.borderRight,
        'select_no-border': this.noBorder,
        'select_default': this.default,
        'select_top': this.top,
      }
    },
    ...mapGetters({
      LANGUAGES: 'correctText/LANGUAGES',
      LANG: 'correctText/LANG'
    }),
  },
  methods: {
    ...mapActions({
      SET_LANGUAGES: 'correctText/SET_LANGUAGES',
      CHANGE_LANGUAGE: 'correctText/SET_LANGUAGE'
    }),
    handleInput(e) {
      let value = e;
      value = value.replace(/\+/g, "");
      this.search = value;
      this.$emit('search', value)
    },
    toggleList() {
      if (!this.disabled) {
        this.listOn = !this.listOn;
      }
    },
    closeList() {
      // alert(2)
      this.listOn = false;
    },
    updateValue(code) {
      this.CHANGE_LANGUAGE(code)
      this.$changeRouteQuery({lang: code})
    },
  },
  directives: {
    ClickOutside
  }
}
</script>
<style>
.section-languages .select__head{
  border:0;
  font-size: 16px;
}
</style>
