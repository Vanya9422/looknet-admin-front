<template lang="pug">
  .item-card(:class="{'item-inline':inline}" )
    .item-card__box.flex.flex_bottom(v-if="!inline")
      .item-card__buttons
        template(v-if="phoneNumber !== '0'")
          button-primary.item-card__btn.item-card__btn_phone(gray v-if="phone") {{ phoneNumber }}
          button-primary.item-card__btn.item-card__btn_phone(gray small icon="phone" v-else @click.native="showPhone") Show number
    .item-card__head
      .item-card__gallery
        part-mouse-gallery(:list="gallery" :serverGallery="serverGallery" @click.native="openProduct()")
        button-action.item-card__zoom(icon="search" @click.native="showItem")
      button-action.item-card__zoom.d-none( @click="openProduct()")
      .item-card__status(v-if="status === 1") VIP
    template(v-if="inline")
      .item-card__info
        .item-card__top(@click="openProduct()")
          span.item-card__name.p() {{ name }}
          div.item-card__top-right
            .item-card__price.mt-0 {{ showPrice }}
            //button-action.item-card__favorite(:blue="favorite" @click.native.prevent="addFavorite(id,to)")
        .item-card__desc {{ desc }}
        .item-card__footer(@click="openProduct()")
          .item-card__footer-left
            module-user-info.single-sidebar__user.mt-0(
              :avatar="user.avatar"
              :name="user.full_name"
              :about="`Registered ${user.registered}`"
              :verified=" user.verified_at !== null "
              v-if="user"
            )
            .item-card__text.color-gray
              .single-sidebar__views
                span
                  svg-icon.single-views__icon(name="eye-1" viewBox="0 0 15 9")
                  | {{showDetails}}
                span •   ID {{id}}
                span •  {{ city }}, {{ distance }}
                span •  {{ formatDistance(subDays(new Date(date), 3), new Date()) }}
          .item-card__footer-right
            .item-card__buttons
              template(v-if="phoneNumber !== '0'" )
                button-primary.item-card__btn.item-card__btn_phone(gray v-if="phone") {{ phoneNumber }}
                button-primary.item-card__btn.item-card__btn_phone(gray small icon="phone" v-else @click.stop.native="showPhone") Show number
          .item-card__box.flex.flex_bottom

        //.item-card__text.color-gray {{ city }}, {{ distance }}  •  {{ formatDistance(subDays(new Date(date), 3), new Date()) }}
        //.item-card__price {{ showPrice }}
    template(v-else)
      .item-card__info(@click="openProduct()")
        .item-card__top
          span.item-card__name.p( ) {{ name }}
          //button-action.item-card__favorite(:blue="favorite" @click.native.prevent="addFavorite(id,to)")
        .item-card__text.color-gray {{ city }}, {{ distance }}  •  {{ formatDistance(subDays(new Date(date), 3), new Date()) }}
        .item-card__price {{ showPrice }}
</template>

<script>
import {numberWithSpaces} from 'assets/js/functions';
import {mapActions, mapGetters} from "vuex";
import favorite from "@/mixins/favorite";
import {formatDistance, subDays} from 'date-fns'

export default {
  props: {
    name: {
      type: String,
      default: "Объектив SLR Magic. Sony E. 25mm f1.4"
    },
    city: {
      type: String,
      default: "New Your"
    },
    distance: {
      type: String,
      default: "2 km near you"
    },
    desc: {
      type: String,
      default: "2 km near you"
    },
    date: {
      type: String,
      default: "2 days ago"
    },
    price: {
      type: Number,
      default: 228
    },
    pricePolicy: {
			type: Number,
			default: null
		},
    showDetails: {
      type: Number,
      default: 228
    },
    status: {
      default: ""
    },
    phoneNumber: {
      type: String,
      default: "+ 1 376 266 5353"
    },
    to: {
      type: String,
      default: "#"
    },
    id: {
      type: Number,
      default: 1
    },
    serverGallery: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    gallery: {
      type: Array,
      default: () => ([
        'item-card__img1.jpg',
        'item-card__img2.jpg',
        'item-card__img3.jpg',
        'item-card__img4.jpg',
        'item-card__img5.jpg'
      ])
    },
    user: {
      type: Object,
      default: () => ({})
    },

  },
  mixins: [favorite],
  data() {
    return {
      subDays,
      formatDistance,
      phone: false,
      numberWithSpaces,
    }
  },

	computed: {
		showPrice() {
    	  if (this.pricePolicy === 1) return `$ ${this.numberWithSpaces(this.price)}`
    	  if (this.pricePolicy === 2) return "Exchange"
    	  return "Free"
    	}
	},

  methods: {
    ...mapActions({
      SET_DETAIL: 'product/SET_MODAL_DETAIL'
    }),
    showPhone() {
      this.phone = true;
      this.$axios.$post(`${this.$api.user.statistics}${this.to}/phone-view`)
    },
    openProduct() {
      this.showItem()
    },
    showItem() {
      // this.SET_DETAIL(this.to).then(() => {
      this.$emit('show')
      //   this.$root.$emit('bv::show::modal', 'modal-card')
      //   this.$axios.$post(`/statistics/${this.to}/view-details`)
      // })
    },

  }
}
</script>

<style lang="scss">
.item-card {
  position: relative;
  cursor: pointer;

  &.item-inline {
    max-width: 100%;
    width: 100%;
    display: flex;
    @include large-mobile {
      flex-direction: column;
      gap: 10px;
    }

    .item-card__gallery {
      padding-top: 0;
      padding-left: 264px;
      height: 220px;
      margin-right: 20px;
    }

    .item-card__info {
      width: 100%;
      position: unset;
      margin-top: 0;
    }

    .item-card__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .item-card__top-right {
      display: flex;
      align-items: center;
    }

    .item-card__name,
    .item-card__price {
      font-size: 24px;
      @include large-tablet {
        font-size: 20px;
      }
      @include small-tablet {
        font-size: 18px;
      }
    }

    .item-card__desc {
      font-size: 14px;
      line-height: 130%;
      margin: 14px 0 20px;
      max-width: 459px;
      height: 72px;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      @include large-tablet {
        font-size: 12px;
        height: 62px;
      }
    }

    .item-card__box {
      height: 100%;
      z-index: -1;
    }

    .item-card__footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 30px;
      @include small-tablet {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .item-card__text {
      margin-top: 30px;
    }

    .item-card__footer-right {
      max-width: 265px;
      width: 100%;
    }
  }

  @include min-small-tablet {
    &:hover {
      z-index: 31;

      .item-card {
        &__box {
          visibility: visible;
          opacity: 1;
        }

        &__zoom {
          opacity: 1;
          visibility: visible;
        }

        &__status {
          opacity: 0;
          visibility: hidden;
        }
      }
    }
  }

  &__head {
    position: relative;
  }

  &__gallery {
    position: relative;
    z-index: 1;
    overflow: hidden;
    padding-top: div(220, 264) * 100%;
    border-radius: 10rem;
    display: block;

    @include large-mobile {
      padding-top: div(140, 167) * 100%;

      .mouse-gallery__item:not(:first-child), .mouse-gallery__nav {
        display: none;
      }
    }
  }

  &__info {
    margin-top: 15rem;
    position: relative;

    @include large-mobile {
      margin-top: 10rem;
    }
  }

  &__favorite {
    width: auto;
    height: auto;
    stroke: $gray;
    flex-shrink: 0;
    margin-left: 20rem;

    svg {
      width: 21rem;
      height: 19rem;
      max-width: inherit;
      max-height: inherit;
      stroke: rgba($gray, .3);
    }

    @include large-mobile {
      svg {
        width: 17rem;
        height: 15rem;
        stroke-width: 1.7;
      }
    }
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__name {
    font-weight: 600;
    display: block;
    max-width: 210rem;
    transition: ease .2s;


    &:hover {
      color: $blue;
    }

    @include large-mobile {
      max-width: 75%;
    }
  }

  &__text {
    margin-top: 10rem;
  }

  &__price {
    margin-top: 15rem;
    font-size: 20rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.01em;

    @include large-mobile {
      margin-top: 10rem;
      font-size: 17rem;
    }
  }

  &__box {
    position: absolute;
    left: -15rem;
    top: -15rem;
    width: calc(100% + 30rem);
    height: calc(100% + 115rem);
    background: #fff;
    border-radius: 10rem;
    border: 1px solid #D2D2D7;
    padding: 20rem 15rem;
    visibility: hidden;
    opacity: 0;
    transition: ease .1s;

    @include large-mobile {
      display: none;
    }
  }

  &__btn {
    padding: 0;

    &:not(:last-child) {
      margin-right: 5rem;
    }

    &_chatting {
      width: 60rem;
      min-width: 60rem;
      padding: 0 !important;

      &.svg-mr-0 svg {
        margin-right: 0;
      }

      svg {
        margin-right: 10rem;
      }
    }

    &_phone {
      width: 100%;
    }

    @include large-mobile {
      &_chatting {
        width: 50rem;
        min-width: 50rem;
      }
      &_phone {
        font-size: 12rem;
      }
    }
  }

  &__buttons {
    width: 100%;
    display: flex;
  }

  &__zoom {
    position: absolute;
    left: 5rem;
    top: 5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    z-index: 30;
    transition: ease .12s;
    opacity: 0;
    visibility: hidden;

    svg {
      width: 16rem;
      height: 16rem;
      fill: #fff;
      stroke: #fff;
      stroke-width: 1px;
      transform: rotate(90deg);
    }
  }

  &__status {
    position: absolute;
    z-index: 30;
    left: 10rem;
    top: 10rem;
    height: 30rem;
    background: #FF664A;
    border-radius: 7rem;
    padding: 0 10rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    letter-spacing: normal;
    transition: ease .12s;
    @include large-mobile {
      height: 20rem;
      padding: 0 6rem;
      font-size: 10rem;
    }
  }

  &__banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 30rem 20rem;

    &-wrap {
      position: relative;
      text-align: center;
      display: block;
    }

    &-name {
      letter-spacing: 0.01em;
      display: block;
    }

    &-img {
      display: block;
      margin-bottom: 20rem;

      img {
        max-height: 130rem;
      }
    }

    &-arrow {
      width: 9rem;
      height: 11rem;
      display: block;
      margin: 20rem auto 0 auto;
      fill: none;
      stroke: $default;
      stroke-width: 2;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(239.83deg, #E0F0FF 10.5%, #FFE3D3 124.13%);
      opacity: 0.7;
      border-radius: 10px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }

    @include large-mobile {
      &-img {
        margin-bottom: 17rem;

        img {
          max-height: 114rem;
        }
      }
      &-name {
        font-size: 14rem;
      }
      &-arrow {
        margin-top: 10rem;
      }
    }
  }
}

.single-sidebar__views {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  span {
    display: flex;
  }

  @include large-tablet {
    font-size: 12px;
  }
}
</style>
