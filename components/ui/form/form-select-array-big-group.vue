<template lang="pug">
  .select.section-big.section-big__group(:class="Mods")
    modal-group(:active="active" @close="onClosedModalGroup")
    .select__label.p.color-gray(v-if="label") {{ label }}
    .select__wrap
      input.select__input(type="hidden" :name="name" :value="currentValue")
      .select__head(v-click-outside="closeList" @click="toggleList")
        form-input.search-filter__field(
          disabled
          :class="{focus: currentValue.title && currentValue.title.length > 0}"
          :label="!withOutLabel ? 'Group' : ''"
          v-model="currentValue.title"
        )
        .select__arrow(v-if="!disabled")
          svg-icon(name="arrowDown" viewBox="0 0 11 7")
      transition(name="DropDown")
        .select__body(v-if="listOn")
          .select__list
            .select__item(:class="{active:currentValue.id === item.id}" v-for="(item, i) in items" :key="i" @click="changeValue(item)")
              label.select__btn(:for="`name-${i}`" )
                input.select__btn-input(
                  type="radio"
                  :name="`name-${i}`"
                  :id="`name-${i}`"
                  :value="i"
                  @change="closeList(); updateValue();"
                  v-model="currentValue"
                )
                span.select__btn-flex
                  form-input.search-filter__field(
                    disabled
                    v-model="item.title"
                  )
                  .select__arrow.select__arrow-group(v-if="!disabled" @click="stopPropagation(item)")
                    svg-icon(name="editSmall-1")

            .select__item
              button-primary.w-100(light icon="plusBig" @click.prevent.native="addNewOne") {{text}}

          slot

</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  props: {
    first: {
      type: [Object,Boolean],
      default: false
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
    withOutLabel: {
      type: Boolean,
      default: false
    },
    big: {
      type: Boolean,
      default: false
    },
    lang: {
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
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'New client'
    },
    // items: {
    //   type: [Array, Object],
    //   default: () => ([])
    // }
  },
  data() {
    return {
      active: null,
      listOn: false,
      currentValue: {title: '', id: 0},
      items: []
    };
  },
  watch:{
    listOn(val){
      if(val) this.openList()
    }
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
    }
  },
  mounted() {
    if(this.first) this.currentValue = this.first
    },
  methods: {
    stopPropagation(item){
      this.active = item
      console.log({screen:this.$screen})
      this.$nextTick(()=> this.$bvModal.show(`modal-group`))

    },
    toggleList() {
      if (!this.disabled) this.listOn = !this.listOn;
    },
    closeList() {
      this.listOn = false;
    },
    updateValue(e) {
      console.log(this.currentValue)
      this.$emit('input', this.currentValue)
    },
    changeValue(item) {
      console.log(item)
      this.listOn = false
      this.currentValue = item
      this.$emit('change', item)
    },
    addNewOne() {
      this.listOn = false
      this.active = null
      this.$bvModal.show(`modal-group`)
    },
    openList(){
      this.$axios.setHeader('Accept-Language',  'en')
      this.$axios.$get(this.$api.clientsDays).then(({data}) => this.items = data)
    },
    onClosedModalGroup() {
      this.active = null
      this.changeValue(this.items[0])
    },
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang="scss">
.select {
  position: relative;
  display: inline-flex;
  align-items: center;
  .input__field:disabled{
    background: transparent;
  }
  &_lang {
    .select {
      &__head {
        height: 40rem;
        font-size: 17rem;
        color: $default;
        font-weight: 600;
      }

      &__arrow {
        stroke: $default;
        margin-left: 5rem;
      }
    }

    @include large-mobile {
      .select {
        &__head {
          height: 20rem;
          font-size: 14rem;
        }
      }
    }
  }

  &_big {
    .select {
      &__head {
        font-size: 17rem;
        color: $default;
        font-weight: 600;
      }

      &__arrow {
        stroke: $default;
        margin-left: 14rem;
      }
    }

    @include large-mobile {
      .select {
        &__head {
          height: 20rem;
          font-size: 14rem;
        }
      }
    }
  }

  &_border-right {
    .select {
      &__head {
        border-left: 0;
        border-right: 1px solid $light-gray;
      }
    }
  }

  &_no-border {
    font-size: 17rem;
    font-weight: 600;

    .select {
      &__head {
        height: auto;
        padding: 0 15rem;
        height: auto;
        border: 0;
        color: $default;
      }

      &__arrow {
        margin-left: 6rem;
      }

      &__list {
        left: -15rem;
      }
    }
  }

  &_default {
    height: 60rem;
    display: flex;
    font-size: 17rem;
    font-weight: 500;
    font-family: 'Gilroy';

    .select {
      &__wrap {
        width: 100%;
        height: 100%;
      }

      &__head {
        height: 100%;
        border: 1px solid $light-gray;
        border-radius: 10rem;
        padding: 15rem 20rem;
        width: 100%;
      }

      &__body {
        width: 100%;
        border-radius: 10rem;
        margin-top: 5px;
      }

      &__btn {
        color: $gray;
      }
    }
  }

  &_top {
    .select {
      &__body {
        top: auto;
        bottom: 100%;
        margin-bottom: 5px;
      }
    }
  }

  @include large-mobile {
    &_no-border {
      .select {
        &__head {
          padding: 0 5rem;
          height: auto;
          border: 0;
        }

        &__list {
          left: -15rem;
        }
      }
    }
    &_default {
      height: 50rem;
    }
  }

  &__label {
    @include large-mobile {
      padding-bottom: 1px;
    }
  }

  &__wrap {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__head {
    border-left: 1px solid $light-gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56rem;
    color: $gray;
    padding: 0 30rem;
    cursor: pointer;
    white-space: nowrap;

    @include small-tablet {
      padding: 0 20rem;
    }

    @include large-mobile {
      height: 20rem;
      font-size: 14rem;
      padding: 0;
      border: 0;
    }
  }

  &__color {
    width: 10rem;
    height: 10rem;
    flex-shrink: 0;
    margin-right: 10rem;
    border-radius: 10px;
    display: inline-flex;

    &.red {
      background: $red;
    }

    &.blue {
      background: $blue;
    }

    &.brown {
      background: $brown;
    }

    &.green {
      background: $green;
    }
  }

  &__value {
    margin-right: auto;
  }

  &__arrow {
    flex-shrink: 0;
    margin-left: 5px;
    width: 11rem;
    height: 7rem;
    fill: none;
    stroke: $gray;
    stroke-width: 2;
    margin-left: 18rem;

    @include small-tablet {
      margin-left: 10rem;
    }

    @include large-mobile {
      width: 9rem;
      height: 6rem;
    }
  }

  &__body {
    position: absolute;
    top: 100%;
    margin-top: 10rem;
    z-index: 100;
    left: 0;
    width: calc(100% + 30rem);
    background: #fff;
    padding: 10rem;
    border: 1px solid #D2D2D7;
    border-radius: 5px 5px 15rem 15rem;
  }

  &__btn {
    cursor: pointer;
    display: block;

    &-input {
      display: none;

      &:checked {
        & + .select__btn-text {
          background: #F5F5F7;
          color: $default;
        }
      }
    }

    &-text {
      padding: 10rem 20rem;
      border-radius: 5px;
      transition: ease .2s;
      display: block;
      font-size: 17rem;

      &:hover {
        color: $blue;
      }
    }

    @include large-mobile {
      &-text {
        font-size: 14rem;
        padding: 8rem 10rem;
      }
    }
  }
}

.search-filter__fields {
  .select_default {
    width: 100%;

    .select__head {
      border-color: transparent;
    }
  }

  .select__label {
    position: absolute;
    left: 20rem;
    top: -5rem;
    font-size: 17rem;
    line-height: 1;
    color: #6E6E73;
    transition: ease 0.15s;
  }

}

.support-chat__head .search-filter__fields .select_default {
  height: 100%;
}

.select.section-big {
  height: 100%;

  .select__head {
    padding: 0;
  }

  .select__arrow {
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      height: 28rem;
      width: 1px;
      margin-top: -14rem;
      background: #D2D2D7;
    }

    svg {
      width: 10px;
      height: 10px;
    }
  }

  .select__btn-flex {
    display: flex;
    align-items: center;
  }

  .select__item {
    height: 40px;
    border-radius: 5px;
    margin-bottom: 5px;
    position: relative;
    transition: 0.3s;
    cursor: pointer;

    label {
      cursor: pointer;
    }

    input:disabled {
      cursor: pointer;
    }

    &.active,
    &:hover {
      background: #F5F5F7;

      .input__field:disabled, .select__value {
        color: $default;
        -webkit-text-fill-color: rgba($default, 1);
      }
    }

    .select__btn {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .select__arrow svg {
      transform: rotate(-90deg);
    }

    input {
      padding-top: 0;
      background: transparent;
    }
  }
}

.select__item {
  .search-filter__field {
    .input__field:disabled, .select__value {
      color: #6E6E73;
      -webkit-text-fill-color: rgba(#6E6E73, 1);
    }

    &:not(:nth-last-child(1)):before {
      content: unset;
    }
  }

}

.select.section-big .select__item {
  &:hover {
    .select__arrow.select__arrow-group svg {
      fill: $default;
    }
  }

  .select__arrow.select__arrow-group {
    height: 24px;
    &::before {
      content: unset;
    }

    svg {
      transform: unset;
      fill: #9A9A9A;
      width: 12px;
      height: 17px;
      stroke: transparent;
    }
  }
}
.commercial__input-group.select.section-big{
  height: 60px;
  margin-top: 20px;
}


</style>
