<template lang="pug">
  .back-sidebar
    .back-sidebar__top
      button-back.back-sidebar__roll-up(@click.prevent.native="$router.back()") Back
    .back-sidebar__body
      .back-sidebar__nav
        .back-sidebar__nav-item(
          v-for="(item, i) in nav"
          :key="i"
          v-if="item.show"
        )
          button-nav.back-sidebar__nav-btn(
            :icon="item.icon"
            :to="item.to"
            :notif="item.notif"
          ) {{item.name}}
    .back-sidebar__bottom
      button-nav.back-sidebar__logout(red small icon="logout" @click.native.prevent="logOut") Exit
</template>

<script>
export default {
  props: {
    nav: {
      type: Array,
      default: () => ([])
    },
  },
  methods:{
    logOut() {
      const channels = Object.keys(this.$echo.connector.channels);
      channels.map(item => this.$echo.leave(item));
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss">
.back-sidebar {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30rem 15rem;
  position: sticky;
  top: 0;

  &__body {
    margin-top: 75rem;
    flex: 1 1 auto;
  }

  &__bottom {
    margin-top: 75rem;
  }

  &__logout {
    width: 100%;
  }

  &__nav {
    &-item {
      &:not(:first-child) {
        margin-top: 20rem;
      }
    }

    &-btn {
      width: 100%;
    }
  }
}
</style>
