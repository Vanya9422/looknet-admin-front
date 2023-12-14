<template lang="pug">
  .analytics-box
    swiper.analytics-box__slider(:options="SwiperOptions")
      swiper-slide.analytics-box__slide(
        v-for="(slide, i) in slides"
        :key="i"
      )
        .analytics-box__inner
          template(v-if="slide.details.showText")
            h2.analytics-box__title.h2.h2_big {{slide.details.title || 'Hello, Sergey!'}}
            .analytics-box__desc {{slide.details.desc || 'our analytics on all ads'}}
          part-statistic.analytics-box__statistic.opacity-0(:statistics="slide.details.list")
        .analytics-box__img(:class="{'cover-img' : slide.file}")
          img(:src="slide.file || require(`~/assets/img/analytics-box__img.svg`)")
      template(v-slot:nav)
        swiper-nav.analytics-box__nav
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const SwiperOptions = {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
    };
    return {
      SwiperOptions,
    };
  },
}
</script>

<style lang="scss">
.analytics-box {
  border: 1px solid $light-gray;
  border-radius: 20rem;
  position: relative;
  width: 100%;
  overflow: hidden;
  @include large-mobile {
    border: 0;
    overflow: visible;
    border-radius: 0;
  }

  &__slide {
    position: relative;
    overflow: hidden;
    padding: 50rem 50rem 30rem 50rem;
    @include large-tablet {
      padding: 50rem 30rem 30rem 30rem;
    }
    @include large-mobile {
      padding: 0;
    }
  }

  &__inner {
    position: relative;
    z-index: 2;
    width: 50%;
    max-width: 380rem;

    @include small-tablet {
      width: auto;
      max-width: inherit;
    }
  }

  &__title {
    line-height: 1;
    word-wrap: break-word;
    @include max-rows(32, 2);
    @include large-tablet{
      @include max-rows(26, 2);
    }
    @include large-mobile{
      @include max-rows(20, 2);

    }
  }

  &__desc {
    margin-top: 10rem;
    font-size: 18rem;
    font-weight: 500;
    line-height: 1.5;
    color: #6E6E73;
    word-wrap: break-word;
    @include max-rows(27, 2);
    @include large-mobile {
      font-size: inherit;
      line-height: inherit;
      @include max-rows(17, 2);
    }
  }

  &__statistic {
    margin-top: 44rem;

    @include large-tablet {
      margin-top: 30rem;
    }

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__img {
    position: absolute;
    right: 185rem;
    width: 633rem;
    pointer-events: none;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    top: 0;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    @include large-desktop {
      right: 120rem;
      width: 580rem;
    }

    @include large-tablet {
      right: 10rem;
      width: 400rem;
    }

    @include small-tablet {
      display: none;
    }
  }

  &__nav {
    position: absolute;
    right: 20rem;
    bottom: 20rem;
    z-index: 5;

    @include small-tablet {
      bottom: 30rem;
      right: 30rem;
    }

    @include large-mobile {
      display: none !important;
    }
  }

  &__btn {
    &:not(:first-child) {
      margin-left: 6rem;
    }
  }
}


.analytics-box__img.cover-img {
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  img{
    border-radius: 20rem;
    height: 100%;
  }
}
</style>