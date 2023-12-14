<template lang="pug">
    div.another-manager
        button-primary.w-100.chat-body__btn-manager.pl-0(v-if="is_closed", icon="essential" v-b-modal.modal-another-manager) Another manager
        button-primary.w-100.chat-body__btn.button-primary_border-primary(v-click-outside="close" @click.native.prevent="isActive = !isActive") Close Chat
          .select__arrow.d-inline-flex
            svg-icon(name="arrowDown" viewBox="0 0 11 7")
          transition(name="DropDown")
            .dropdown-menu.d-block( v-if="isActive")
              .dropdown-list
                .dropdown-item(v-for="item in items" :key="item.text")
                  button-primary(@click.native="$emit('closeOrViewed', item.value)") {{item.text}}
</template>

<script>

export default {
    props: {
    is_closed: {
      type: Number,
      default: 0
    },
  },
    data() {
        return {
            items: [
              {
                text: 'Close chat',
                value: 'close'
              },
              {
                text: 'Viewed',
                value: 'viewed'
              }
            ],
            isActive: false,
        }
    },
    methods: {
      close() {
        this.isActive = false;
      },
    }
}
</script>

<style lang="scss">
.dropdown {
  &-list {
    padding: 20rem 14rem;
  }
  &-menu {
    width: 166rem;
    right: -5%;
    left: auto;
    top: 110%;
    border: 1px solid #D2D2D7;
    border-radius: 10px;
  }
  &-item {
    .button-primary {
      width: 100%;
      height: auto;
      padding: 10rem 14rem;
      background: none;
      justify-content: start;
      color: $gray;
      &:hover {
        color: $default;
      }
    }
    &:hover {
      background: #F5F5F7;
      border-radius: 5px;
    }
  }
}

@include large-mobile {
    .another-manager {
        display: flex;

        .dropdown {
            &-menu {
                width: 100%;
                top: -50px;
                right: 0;
                left: 0;
                margin: auto;
            }
            &-list {
                padding: 10rem 14rem;
            }
        }
    }
}

.chat-body__btn-manager {
    svg {
        flex-shrink: 0;
        margin-right: 10rem;
        fill: transparent;
        stroke: black;
    }
    .button-primary__text {
        @include min-small-mobile {
            white-space: nowrap;
        }
    }
}
</style>