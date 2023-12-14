<template>  
  <section class="correct-text">
    <h3 class="correct-text__title h3 mobile-visible">{{title}}</h3>
    <div class="correct-text__top">
      <change-languages></change-languages>
      <change-correct-text-type v-if="LANG"></change-correct-text-type>
      <change-pages v-if="TYPE"></change-pages>
      <div class="correct-text__box" v-if="false">
        <div class="correct-text__row flex flex_vertical">
          <div class="correct-text__column correct-text__column_left">
            <div class="correct-text__label h3">Search</div>
          </div>
          <div class="correct-text__column correct-text__column_right">
            <form class="correct-text__search" action="/#search">
              <div class="correct-text__search-field">
                <form-input class="correct-text__search-input" placeholder="Search" ref="InputSearch"></form-input>
                <button-action class="correct-text__search-icon" icon="search" small gray></button-action>
                <button-close class="correct-text__search-clear" type="button" white></button-close>
              </div>
              <button-primary class="correct-text__search-btn" blue>Search</button-primary>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__body">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: 'Web site corrections'
    }
  },
  computed:{
    ...mapGetters({
      LANG: 'correctText/LANG',
      TYPE: 'correctText/TYPE',
      PAGE: 'correctText/PAGE'
    }),
  },

  data() {
    return {
      switchers: [
        {
          value: 'for_users',
          text: 'For users',
          link: '/commercial',
        },
        {
          value: 'for_business',
          text: 'For business',
          link: '/commercial/business',

        },
        {
          value: 'notification',
          text: 'Notification',
          link: '/commercial/notification',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.correct-text {
  margin-top: 20rem;
  padding-bottom: 50rem;

  @include small-tablet {
    margin-top: 40rem;
    padding-bottom: 70rem;
  }

  &__top {
    @include small-tablet {
      .correct-text__label {
        margin-bottom: 15rem;
      }
    }
  }

  &__title {
    font-family: 'Atyp Display';
    font-weight: 500;
  }

  &__box {
    padding: 30rem 0;
    border-bottom: 1px solid $light-gray;

    @include large-mobile {
      padding: 30rem 0 20rem 0;
    }
  }

  &__label {
    font-family: 'Atyp Display';

    &_small {
      font-size: 22rem;
      color: #9A9A9A;
      line-height: 1;
      font-weight: 400;
    }

    @include small-tablet {
      line-height: 1;
      font-size: 20rem;
      &_small {
        font-size: 20rem;
      }
    }

    @include large-mobile {
      font-size: 16rem;
      font-weight: 500;
      &_small {
        font-weight: 400;
      }
    }
  }

  &__column {
    &_left {
      width: 25%;
    }

    &_right {
      width: 75%;
    }

    .button-primary_border {
      color: #9A9A9A;
    }

    &-buttons {
      margin: -5rem;
    }

    &-btn {
      padding: 0 30rem;
      margin: 5rem;

      &_add {
        width: 58rem;
        padding: 0 !important;

        .button-primary__icon {
          margin-right: 0;
          fill: #9A9A9A;
        }
      }
    }

    @include small-tablet {
      width: 100%;
      &-btn {
        padding: 0 20rem;
      }
    }
  }

  &__search {
    display: flex;
    max-width: 870rem;

    &-field {
      width: 100%;
      position: relative;
    }

    &-clear {
      position: absolute;
      right: 25rem;
      top: 50%;
      margin-top: -17rem;
    }

    &-icon {
      position: absolute;
      left: 19rem;
      top: 50%;
      margin-top: -8rem;
    }

    &-input {
      .input__field {
        padding-left: 49rem;
        padding-right: 55rem;
      }
    }

    &-btn {
      padding: 0 24rem;
      margin-left: -15rem;
      position: relative;
      z-index: 2;
    }

    @include large-mobile {
      &-clear {
        margin-top: -14rem;
        right: 10rem;
      }
      &-input {
        .input__field {
          padding-left: 39rem;
          padding-right: 42rem;
        }
      }
      &-icon {
        width: 14rem;
        height: 14rem;
        margin-top: -7rem;
        left: 15rem;
      }
      &-btn {
        display: none;
      }
    }
  }

  &__body {
    margin-top: 40rem;
  }

  &__section {
    margin-top: 50rem;

    &:first-child {
      margin-top: 30rem;
    }

    @include small-tablet {
      &-head {
        margin-bottom: 20rem;
      }
    }
  }

  &__replace-photo {
    max-width: 874rem;
  }

  &__field {
    max-width: 874rem;

    &:not(:first-child) {
      margin-top: 30rem;
    }

    &-title {
      font-weight: 600;
      font-family: 'Gilroy';
    }

    .textarea {
      margin-top: 10rem;
    }

    @include large-mobile {
      &-title {
        font-size: 16rem;
      }
    }
  }

  &__input {
    margin-top: 15rem;
  }

  &__checkboxes {
    @include large-mobile {
      margin-top: 10rem;
    }
  }

  &__checkbox {
    &:not(:last-child) {
      margin-right: 30rem;
    }
  }

  &__more {
    margin-top: 15rem;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__add {
    @include small-tablet {
      margin-top: 20rem;
    }
  }

  &__bottom {
    margin-top: 50rem;

    .correct-text__column_right {
      max-width: 874rem;
    }

    &-btn {
      min-width: 150rem;

      &:not(:last-child) {
        margin-right: 12rem;
      }
    }

    @include large-mobile {
      margin-top: 20rem;
      .correct-text__column_right {
        @include items(2, 6);
        width: calc(100% + 12rem);
      }
    }
  }

  &__question {
    margin-top: 30rem;
    margin-left: 90rem;
    max-width: 786rem;

    @include large-tablet {
      margin-left: 30rem;

    }

    @include large-mobile {
      margin-left: 20rem;
    }
  }

  &__textarea {
    .textarea__field {
      height: 88rem;

      &::placeholder {
        color: $default;
      }
    }
  }
}
</style>