<template lang="pug">
b-modal#modal-product(
  size="product-size",
  modal-class="modal-product",
  body-class="modal-product__body",
  header-class="modal-product__header",
  footer-class="modal-product__footer",
  centered,
  :hide-footer="true",
  @show="openModal"
)
  template(#modal-header="{ close }")
    button-close.modal__close(@click.native="closeModal")
  .modal-product__row.css-scrollbar(@scroll="onScroll")
    .modal-product__column.modal-product__column_left
      .modal-product__container
        h2.modal-product__title.mobile-visible.h2 {{ title }}

        part-single-gallery.modal-card__gallery(
          v-if="product",
          :TestImages="product.gallery"
        )
        part-single-box.modal-product__box(
          v-if="product",
          :id="product.id",
          :title="product.name",
          :price="product.price",
          :price-policy="product.price_policy",
          :phone="product.contact_phone",
          :views="product.show_details",
          :author="product.author",
          :about="`Registered ${generateDate(product.author.created_at)}`"
        )

        part-single-content.modal-product__content(
          v-if="product",
          :category="product.category",
          :answers="product.answers",
          :description="product.description || '-'"
        )

        part-single-map.modal-product__map(
          v-if="product",
          :coordinates="{ longitude: product.longitude, latitude: product.latitude }",
          :addr="product.address"
        )

    .modal-product__column.modal-product__column_right
      .modal-product__sidebar
        .modal-product__action
          button-primary.modal-product__btn-action(
            icon="check",
            :disabled="disabledBtn",
            blue,
            @click.prevent.native="showActive(product.id)",
            v-b-modal.modal-activated
          ) Active
          button-primary.modal-product__btn-action(
            icon="close",
            :disabled="disabledBtn",
            red,
            @click.prevent.native="showRefusal(product.id)"
          ) Refuse
          //button-primary.modal-product__btn-action.mobile-visible.svg-m-0(icon="danger" gray  @click.prevent.native="$emit('ban')")
          button-primary.modal-product__btn-action.mobile-visible.svg-m-0(
            icon="dots",
            gray,
            v-b-modal.modal-product-action
          )
        //.modal-product__buttons
        //  button-primary.modal-product__btn(icon="user" gray v-b-modal.modal-activated) Check other advertises
        //  button-primary.modal-product__btn(icon="grid2" gray v-b-modal.modal-activated) Change categories
        .modal-product__buttons
          button-primary.modal-product__btn(
            icon="grid2",
            gray,
            @click.prevent.native="$emit('changeCategory')"
          ) Change categories
        .modal-product__sidebar-bottom
          button-primary.modal-product__btn(
            icon="danger",
            border,
            @click.prevent.native="$emit('ban')"
          ) Ban this person
</template>
<script>
import moment from "moment";
export default {
  props: {
    title: {
      type: String,
      default: "Advertisement preview",
    },
    product: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      disabledBtn: true,
    };
  },
  methods: {
    showActive(id) {
      this.$root.$emit("bv::show::modal", "modal-activated");
      this.$emit("status", { id: id });
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD.MM.yyyy");
    },
    showRefusal(id) {
      this.$root.$emit("bv::show::modal", "modal-refusal");
      this.$emit("status", { id: id });
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight - 200)
        this.disabledBtn = false;
    },
    openModal() {
      this.disabledBtn = true;
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", "modal-product");
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss">
.modal-product {
  overflow: hidden;

  .modal-content {
    overflow: hidden;
    padding: 60rem 20rem 0 60rem;

    @include large-tablet {
      padding: 60rem 30rem;
    }
  }

  @include large-mobile {
    padding: 0 !important;
    overflow: hidden !important;
    .modal-content {
      padding: 20rem 15rem 0 15rem;
      height: 90vh;
      display: flex;
    }
  }

  &__body {
  }

  &__title {
    margin-bottom: 15px;
  }

  &__row {
    display: flex;
    padding-bottom: 60px;
    height: 100%;
    max-height: 80vh;
    overflow-x: hidden;
    margin-bottom: 10px;
    @include large-tablet {
      flex-wrap: wrap;
      margin-right: 0;
    }

    @include large-mobile {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%;
      padding-bottom: 0;
    }
  }

  &__column {
    position: relative;
    &_left {
      width: calc(100% - 410rem);
    }

    &_right {
      width: 375rem;
      padding-left: 35rem;
      position: sticky;
      top: 0;
      right: 40px;
    }

    @include large-tablet {
      &_left {
        width: 100%;
      }
      &_right {
        width: 100%;
        padding-left: 0;
        margin-top: 40rem;
      }
    }

    @include large-mobile {
      &_left {
        flex: 1 1 auto;
        position: relative;
      }
      &_right {
        padding: 15rem;
        margin: 0 -15rem;
        border-top: 1px solid $light-gray;
        width: calc(100% + 30rem);
      }
    }
  }

  &__container {
    @include large-mobile {
      position: absolute;
      left: 0;
      top: 0;
      width: calc(100% + 40px);
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 40px;
    }
  }

  &__action {
    @include items(2, 5);
    display: flex;

    @include large-mobile {
      @include items(2, 3);
    }
  }

  &__buttons {
    margin-top: 12rem;
    @include large-mobile {
      display: none;
    }
  }

  &__btn {
    width: 100%;

    &:not(:first-child) {
      margin-top: 10rem;
    }

    @include large-mobile {
      &-action {
        &:last-child {
          width: 25%;
        }
      }
    }
  }

  &__sidebar {
    &-bottom {
      margin-top: 20rem;
      padding-top: 20rem;
      border-top: 1px solid $light-gray;
    }

    @include large-mobile {
      &-bottom {
        display: none;
      }
    }
  }

  &__box {
    margin-top: 44rem;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__content {
    margin-top: 40rem;
    @include large-mobile {
      margin-top: 30rem;
    }
  }

  &__map {
    margin-top: 50rem;
    padding-top: 50rem;
    border-top: 1px solid $light-gray;
    @include large-mobile {
      margin-top: 30rem;
      padding-top: 30rem;
      padding-bottom: 30rem;
    }
  }

  &__gallery {
    @include small-tablet {
      .single-gallery {
        &__slider {
          margin-left: 0;
          margin-right: 0;
          width: 100%;
          margin-bottom: 0;
          border-radius: 6px;
        }
      }
    }

    @include large-mobile {
      margin-top: 15rem;
    }
  }
}

@include large-mobile {
  .modal-product {
    .modal-content {
      //overflow-y: auto;
      //overflow-x: hidden;
      padding: 8.5px 0;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .modal-body {
      padding: 0;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .modal-product__row {
      padding: 10px;
    }

    .modal-product__column_right {
      position: fixed;
      bottom: 0;
      left: 0;
      top: auto;
      right: auto;
      width: 100%;
      background: #fff;
      margin: 0;
      padding: 10px;
    }

    .single-gallery__slider {
      width: 100%;
      margin-left: 0;
      margin-right: 0;
    }

    .single-gallery__preview img {
      border-radius: 10px;
    }
  }
  .modal-product__container {
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    padding-bottom: 0px;
  }

  .modal {
    .modal-product__container {
      width: 100%;
      padding-right: 0;
    }
  }
}
</style>
