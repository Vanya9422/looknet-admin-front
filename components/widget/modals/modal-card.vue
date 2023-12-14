<template lang="pug">
  b-modal(
    id="modal-card"
    ref="modal-card"
    size="card-size"
    modal-class="modal-card"
    body-class="modal-card__body"
    header-class="modal-card__header"
    footer-class="modal-card__footer"
    centered
    :hide-footer="true"
    v-show="DETAIL"
    @hide="closeModal"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal')
    swiper-nav.modal-card__nav(
      light
      @prev="changeDetails(true)"
      @next="changeDetails"
      :notShowPrev="DETAIL_ACTIVE > 0"
      :notShowNext="DETAIL_ACTIVE < DETAIL_LIST.length - 1"
    )
    transition(v-if="DETAIL")
      .modal-card__row.flex.flex_justify
        .modal-card__column.modal-card__column_left
          part-single-gallery.modal-card__gallery(v-if="DETAIL" :TestImages="DETAIL.gallery")
        .modal-card__column.modal-card__column_right(v-if="DETAIL")
          part-single-sidebar.modal-card__info(
            :id="DETAIL.id"
            :title="DETAIL.name"
            :cost="cost"
            :user="DETAIL.author"
            :info="DETAIL"
            :phoneNumber="DETAIL.contact_phone"
            moreDetails
            @close="closeModal"
          )
    transition(v-if="!DETAIL")
      .loading-block
        loader.white.big

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { numberWithSpaces } from "~/assets/js/functions"

export default {
  data() {
    return {
      numberWithSpaces
    }
  },
  mounted() {
    // this.activeDetailList = localStorage.getItem('productsList').split(',') || []
  },
  computed: {
    ...mapGetters({
      DETAIL: 'product/MODAL_DETAIL',
      DETAIL_LIST: 'product/DETAIL_LIST',
      DETAIL_ACTIVE: 'product/DETAIL_ACTIVE',
    }),
		cost() {
  	  if (this.DETAIL.price_policy === 1) return `$ ${this.numberWithSpaces(this.DETAIL.price)}`
  	  if (this.DETAIL.price_policy === 2) return "Exchange"
  	  return "Free"
    }
  },
  methods: {
    ...mapActions({
      SET_MODAL_DETAIL: 'product/SET_MODAL_DETAIL',
      SET_DETAIL_LIST: 'product/SET_DETAIL_LIST',
      SET_DETAIL_ACTIVE: 'product/SET_DETAIL_ACTIVE',
    }),
    changeDetails(flag) {
      const getItem = this.DETAIL_LIST
      let getActive = this.DETAIL_ACTIVE
      if (flag) {
        if (getActive > 0) getActive--
      } else {
        if (getActive < getItem.length) getActive++
      }
      this.SET_DETAIL_ACTIVE(getActive)
      const slug = getItem[getActive]
      this.$axios.$post(`/statistics/${slug}/view-details`)
      this.SET_MODAL_DETAIL(slug)
    },
    closeModal() {
      // this.SET_DETAIL(false)
      this.SET_DETAIL_LIST([])
      this.SET_DETAIL_ACTIVE(0)
      this.$refs['modal-card'].hide();
    },
  }

}
</script>

<style lang="scss">
.modal-card {
  .modal-dialog.modal-card-size {
    transform: none;
  }

  .modal-content {
    position: relative;
  }

  @include large-tablet {
    .modal-content {
      padding-left: 30rem;
      padding-right: 30rem;
    }
    .modal-dialog.modal-card-size {
      transform: translate(0, 30rem);
    }
    &.show .modal-dialog.modal-card-size {
      transform: none;
    }
  }

  &__nav {
    .swiper-button {
      position: absolute;
      top: 50%;
      margin-top: -25rem;
      z-index: 100;

      &.swiper-button-prev, &-prev {
        right: 100%;
        margin-right: 20rem;
      }

      &-next {
        left: 100%;
        margin-left: 20rem;
      }
    }

    @include large-tablet {
      .swiper-button {
        &.swiper-button-prev, &-prev {
          margin-right: -40rem;
        }

        &-next {
          margin-left: -40rem;
        }
      }
    }
  }

  &__body {
    position: static;
  }

  &__row {
    flex-wrap: nowrap;
  }

  &__column {
    &_left {
      width: calc(100% - 400rem);
      padding-right: 20rem;
    }

    &_right {
      width: 400rem;
      min-width: 400rem;
      position: relative;
    }

    @include large-desktop {
      &_right {
        width: 350rem;
        min-width: 350rem;
      }
      &_left {
        width: calc(100% - 350rem);
      }
    }
  }

  &__info {
    height: 100%;
  }

  .single-sidebar {
    display: flex;
    flex-direction: column;

    &__user {
      margin-top: 30rem;
    }
  }

  .single-gallery {
    &__preview {
      padding-top: 61%;
    }
  }

  @include large-desktop {
    .single-gallery {
      &__preview {
        padding-top: 72%;
      }
    }
  }
  .loading-block{
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
