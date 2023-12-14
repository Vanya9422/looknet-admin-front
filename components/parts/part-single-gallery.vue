<template lang="pug">
  div
    .single-gallery(v-if="TestImages.length>0")
      swiper.single-gallery__slider(

        :options="MainSwiperOptions"
        v-model="MainSliderInstance"
      )
        swiper-slide(v-for="(image,i) in TestImages" :key="i")
          .single-gallery__preview
            set-img.object-fit(:src="image" v-if="image")

        template(v-slot:nav)
          swiper-nav.single-gallery__nav

          swiper-dots.single-gallery__dots

      swiper.single-gallery__slider.single-gallery__slider_thumb(
        :options="ThumbsSwiperOptions"
        v-model="ThumbsSliderInstance"
      )
        swiper-slide(v-for="(image,i) in TestImages" :key="i")
          .single-gallery__thumbnail(
            @click="GoToSlide(i)"
            :class="{'is-active': ThumbActive === i}"
          )
            .single-gallery__thumbnail-inner
              set-img.object-fit(:src="image" v-if="image")
    .single-gallery(v-else)
      swiper.single-gallery__slider(
        :options="MainSwiperOptions"
        v-model="MainSliderInstance"
      )
        swiper-slide
          .single-gallery__preview
            set-img.object-fit(:defaultImg="require('assets/img/default-product.jpg')")



</template>

<script>
import {Navigation, Pagination} from "swiper";

export default {
  props: {
    TestImages: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      MainSliderInstance: null,
      ThumbsSliderInstance: null,
      ThumbActive: 0,

      MainSwiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        modules: [Navigation, Pagination],
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },

      ThumbsSwiperOptions: {
        slidesPerView: 7,
        slidesPerGroup: 6,
        spaceBetween: 2,
        // centeredSlides: true,
        loop: false,
        breakpoints: {
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          820: {
            slidesPerView: 6,
            slidesPerGroup: 5,
          },
          1120: {
            slidesPerView: 7,
            slidesPerGroup: 6,
          },
        }
      },

    }
  },

  mounted() {
    this.$nextTick(this.MainSliderInit)
  },

  methods: {
    MainSliderInit() {
      if (!this.MainSliderInstance) return false;

      this.MainSliderInstance.on('slideChange', () => {
        const Actived = this.MainSliderInstance.activeIndex;

        this.ThumbActive = Actived;

        this.ThumbsSliderInstance.slideTo(this.ThumbActive, 700)
      });
    },
    GoToSlide(Index) {
      if (!this.MainSliderInstance) return false;

      this.MainSliderInstance.slideTo(Index)
    }
  }
}
</script>

<style lang="scss">
.single-gallery {
  &__slider {
    border-radius: 10rem;
    overflow: hidden;

    &:not(:last-child) {
      margin-bottom: 6rem;
    }

    @include small-tablet {
      &_thumb {
        display: none;
      }
      border-radius: 0;
      width: calc(100% + var(--wrapper-offset) * 2);
      margin-left: calc(-1 * var(--wrapper-offset));
      margin-right: calc(-1 * var(--wrapper-offset));
    }
  }

  &__nav {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: 20rem;
    margin-right: 20rem;
    @include small-tablet {
      &.swiper-nav {
        display: none;
      }
    }
  }

  &__dots {

    @include min-small-tablet {
      display: none !important;
    }
  }

  &__thumbnail {
    padding: 4rem;
    border-radius: 10rem;
    cursor: pointer;
    transition: ease .1s;

    &-inner {
      padding-top: div(80, 114) * 100%;
      border-radius: inherit;
      position: relative;

      &:before {
        content: '';
        z-index: 2;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: rgba(0, 0, 0, 0.3);
        transition: ease .1s;
      }
    }

    &.is-active {
      box-shadow: inset 0px 0px 0 2px $blue;

      .single-gallery__thumbnail-inner {
        &:before {
          opacity: 0;
        }
      }
    }


    img {
      border-radius: inherit;
    }
  }

  &__preview {
    position: relative;
    padding-top: div(526, 982) * 100%;
    border-radius: 10rem;

    @include large-tablet {
      padding-top: 69.564155%;
    }

    @include small-tablet {
      border-radius: 0;
      padding-top: 55.564155%;
    }

    @include large-mobile {
      padding-top: div(250, 375) * 100%;
    }

    img {
      border-radius: inherit;
    }


  }

}
</style>