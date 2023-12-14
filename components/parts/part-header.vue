<template lang="pug">
  header.header(:class="Mods")
    .header__wrap.wrap
      .header__row.flex.flex_vertical.flex_justify
        .header__column.header__column_left.flex.flex_vertical
          NuxtLink.header__logo(to="/")
            img(src="~/assets/img/logo.svg")
        .header__column.header__column_right.flex.flex_vertical
          item-profile.header__profile(name="profileMenu")

</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
  },
  created() {
    const city = localStorage.getItem('city')
    if (!city && this.$auth.loggedIn) {
      console.log(this.$auth.user)
    }
  },
  computed: {
    Mods() {
      return {
        'header_back': this.back,
        'header_small': this.small,
      }
    }
  }
}
</script>

<style lang="scss">
.header {
  padding: 30rem 0;
  width: 100%;

  &_small {
    padding: 20rem 0;
  }

  &_back {
    padding: 20rem 0;

    .header__wrap {
      padding: 0;
    }
  }

  @include large-mobile {
    padding: 20rem 0;
  }

  &__logo {
    display: block;
    width: 168rem;

    @include large-mobile {
      width: 120rem;
    }
  }

  &__lang {
    margin-left: 30rem;

    .select__head {
      padding-right: 0;
    }
  }

  &__nav {
    margin-left: 20rem;

    @include small-tablet {
      margin-left: 10rem;
    }
  }

  &__add {
    min-width: 160rem;
    margin-left: 30rem;
    @include small-tablet {
      margin-left: 20rem;
    }
  }

  &__column {
    @include large-mobile {
      &_right {
        display: none;
      }
      &_left {
        width: 100%;
        justify-content: space-between;
      }
    }
  }

  &__profile {
    margin: 0 20rem;

    @include small-tablet {
      margin-right: 10rem;
    }
  }
}
</style>