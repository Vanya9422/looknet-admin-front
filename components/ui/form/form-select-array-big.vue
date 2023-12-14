<template lang="pug">
  .select.section-big.section-big-bus.mt-0(:class="Mods")
    .select__label.p.color-gray(v-if="label") {{ label }}
    .select__wrap
      input.select__input(type="hidden" :name="name" :value="value")
      .select__head(v-click-outside="closeList" @click="toggleList")
        form-input.search-filter__field.search-filter__field-name(
          disabled
          :class="{focus:value && value.full_name && value.full_name.length > 0}"
          label="Name"
          v-model="value.full_name"
        )
        form-input.search-filter__field.search-filter__field-email(
          disabled
          :class="{focus:value && value.email && value.email.length > 0}"
          label="E-mail"
          v-model="value.email"
        )
        form-input.search-filter__field.search-filter__field-phone(
          disabled
          :class="{focus:value && value.phone_view && value.phone_view.length > 0}"
          label="Phone"
          :value="value.phone_view ? '+'+value.phone_view :''"
        )
        form-input.search-filter__field.search-filter__field-before(
          disabled
          :class="{focus:value && value.company && value.company.length > 0}"
          label="Company"
          v-model="value.company"
        )
        .select__arrow(v-if="!disabled")
          svg-icon(name="arrowDown" viewBox="0 0 11 7")
      transition(name="DropDown")
        .select__body(v-if="listOn")
          .select__list.css-scrollbar
            .select__item(:class="{active:value.id === item.id}" v-for="(item, i) in items" :key="i" @click="changeValue(i)")
              label.select__btn(:for="`name-${i}`" )
                input.select__btn-input(
                  type="radio"
                  :name="`name-${i}`"
                  :id="`name-${i}`"
                  :value="i"
                  v-model="currentValue"
                  @click="closeList(); updateValue();"
                )
                span.select__btn-flex.search-filter__field-phone
                  form-input.search-filter__field.search-filter__field-name(
                    disabled
                    v-model="item.full_name"
                  )
                  form-input.search-filter__field.search-filter__field-email(
                    disabled
                    v-model="item.email"
                  )
                  form-input.search-filter__field.search-filter__field-phone(
                    disabled
                    :value="item.phone_view ? '+'+item.phone_view :'-'"
                  )
                  form-input.search-filter__field.search-filter__field-phone(
                    disabled
                    v-model="item.company"
                  )
                  .select__arrow(v-if="!disabled" @click="$emit('more',item.id)")
                    svg-icon(name="arrowDown" viewBox="0 0 11 7")
                span.mobile-show
                  div.search-filter__field-inner
                    div.w-100
                      form-input.search-filter__field.focus(
                        disabled
                        label="Name"
                        v-model="item.full_name"
                      )
                      form-input.search-filter__field.focus(
                        disabled
                        label="Email"
                        v-model="item.email"
                      )
                      form-input.search-filter__field.focus(
                        disabled
                        label="Phone"
                        :value="item.phone_view ? '+'+item.phone_view :'-'"
                      )
                      form-input.search-filter__field.focus(
                        disabled
                        label="Company"
                        v-model="item.company"
                      )
                    .select__arrow(v-if="!disabled" @click="$emit('more',item.id)")
                      svg-icon(name="arrowDown" viewBox="0 0 11 7")

            .select__item.select__item-button
              button-primary.w-100(light icon="plusBig" @click.prevent.native="addNewOne") New client

          slot

</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  props: {
    value: {
      type: Object,
      default: {}
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
    items: {
      type: [Array, Object],
      default: () => ([])
    }
  },

  data() {
    return {
      listOn: false,
      currentValue: '',
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
    }
  },
  methods: {
    toggleList() {
      if (!this.disabled) this.listOn = !this.listOn;
    },
    closeList() {
      this.listOn = false;
    },
    updateValue(e) {
      this.$emit('input', this.currentValue)
    },
    changeValue(i) {
      this.listOn = false
      this.$emit('change', i)
    },
    addNewOne() {
      this.listOn = false
      this.$bvModal.show(`modal-add-client`)
      // this.$emit('change', i)
    }
  },
  mounted() {
    this.popupItem = this.$el
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

.select.section-big .select__item {
  .button-primary {
    height: inherit;
  }

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

.select.section-big-bus  {
  input {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @include large-tablet {
    .search-filter__field-email {
      display: none;
    }
  }
  @include large-mobile {
    .search-filter__field-name,
    .search-filter__field-phone {
      display: none !important;
    }
    .search-filter__field-before:before{
      content: unset !important;
    }
  }
}

@include large-mobile {
  .bussness  .select.section-big-bus .focus .input__field{
    padding-top: 20px !important;
  }
  .select.section-big-bus .select__item {
    height: 170px !important;
    &.select__item-button{
      &::after{
        content: unset !important;
      }
      height: 60px !important;
      padding: 10px 0;
    }
      .button-primary{
        min-height: 50px;
        max-height: 50px;
      }
  }
  .section-big-bus .select__body {
    .search-filter__field {
      height: 40px;
    }

    .search-filter__field:not(:first-child):before {
      background: unset;
    }

    .select__list {
      max-height: 50vh !important;
    }
    .select__item {
      &:not(.select__item-button){
        margin-left: -10px;
      }
      margin-bottom: 0;
      padding:10px 0;
      .search-filter__field,
      input{
        width: 100%;
      }
      &:not(&:nth-child(1))::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        top: 0;
        background: #D2D2D7;

      }
    }

    .search-filter__field-inner {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .select__arrow {
        height: 100%;

        &::before {
          height: 96%;
          top: 17px;
        }
      }
    }
  }
}
</style>