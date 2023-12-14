<template lang="pug">
  .annoucement-panel
    .annoucement-panel__row.flex.flex_vertical.flex_justify
      .annoucement-panel__column
        form-checkbox.annoucement-panel__checkbox(checked light @click.native="$emit('closePanel')")
          strong.p {{selected}} {{type}} selected
      .annoucement-panel__column.mobile-hidden.flex.flex_vertical
        slot
        button-medium.annoucement-panel__cancel(blue small @click.native="$emit('closePanel')") Cancel
      button-link-arrow.annoucement-panel__action.mobile-visible(white @click.native="$bvModal.show(`${modalName}`)") Actions
</template>

<script>
export default {
  props: {
    modalName: {
      type: String,
      default: 'modal-panel'
    },
    selected: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: 'ad'
    },
  },
}
</script>

<style lang="scss">
.annoucement-panel {
  background: $blue;
  color: #fff;
  padding: 20rem 30rem;
  border-radius: 10rem;
  position: sticky;
  bottom: 30rem;
  margin-left: -20rem;
  margin-right: -20rem;

  @include small-tablet {
    bottom: 60rem;
    margin:0;
  }

  @include large-mobile {
    padding: 13rem;
    border-radius: 15rem;
  }

  &__btn {
    &:not(:first-child) {
      margin-left: 15rem;
    }

    @include large-tablet {
      &:not(:first-child) {
        margin-left: 10rem;
      }
    }
  }

  &__cancel {
    margin-left: 30rem;

    @include large-tablet {
      margin-left: 10rem;
    }
  }

  &__checkbox {
    @include large-mobile {
      strong {
        font-weight: 600;
      }
      .p {
        font-size: 14rem;
      }
    }
  }

  &__action {
    margin-bottom: 2px;
  }
}
</style>
