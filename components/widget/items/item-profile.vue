<template lang="pug">
  .profile(:class="Mods" @click="ToggleClass")
    .profile__avatar
      img.object-fit(:src="$auth.loggedIn && $auth.user.avatar ? $auth.user.avatar.original_full_url :  require(`~/assets/img/${avatar}`)")
    .profile__name.p.strong {{ $auth.loggedIn ? $auth.user.first_name  : '' }}
    .profile__arrow(:class="{'ml-0':!$auth.loggedIn}")
      //svg-icon(name="arrowDown" viewBox="0 0 11 7")
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: "user.jpg"
    },
    profileName: {
      type: String,
      default: "A.Bayramov"
    },
  },
  data() {
    return {
      active: false
    }
  },
  computed: {
    Mods() {
      return {
        'is-active': this.active
      }
    }
  },
  methods: {
    ToggleClass() {
      this.active = !this.active
    }
  }
}
</script>

<style lang="scss">
.profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: ease .12s;

  &:hover, &.is-active {
    color: $blue;
  }

  @include small-tablet {
    position: relative;
    &:after {
      content: '';
      display: block;
      width: 3px;
      height: 3px;
      background: $red;
      border-radius: 3px;
      position: absolute;
      top: 100%;
      margin-top: 2px;
      left: 50%;
      margin-left: -1px;
    }
  }

  &.is-active {
    .profile__arrow {
      svg {
        transform: rotate(-180deg);
      }
    }
  }

  &__avatar {
    width: 35rem;
    height: 35rem;
    flex-shrink: 0;
    margin-right: 15rem;
    overflow: hidden;
    position: relative;
    border-radius: 100%;

    @include small-tablet {
      margin-right: 0;
      width: 28rem;
      height: 28rem;
    }

    @include large-mobile {
      width: 24rem;
      height: 24rem;
    }
  }

  &__name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 86rem;

    @include small-tablet {
      display: none;
    }
  }

  &__arrow {
    flex-shrink: 0;
    stroke: $default;
    stroke-width: 2;
    margin-left: 20rem;
    width: 11rem;
    height: 7rem;
    fill: none;

    svg {
      width: 100%;
      height: 100%;
      transition: ease .15s;
    }

    @include small-tablet {
      display: none;
    }
  }
}
</style>