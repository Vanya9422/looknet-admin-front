<template lang="pug">
.single-sidebar
  //button-action.single-sidebar__favorite(
  //  v-if="info"
  //  :blue="favorite"
  //  @click.native.prevent="addFavorite(info.id,info.slug)"
  //  gray
  //  :key="DETAIL_ACTIVE"
  //  to="#"
  //)

  h2.single-sidebar__title.h2 {{ title }}
  .flex.flex_vertical
    .single-sidebar__price.h2 {{ cost }}
    //span.single-sidebar__price-span.color-gray Bargaining is appropriate
  .flex-1
  template(v-if="phoneNumber !== '0'")
    button-primary.single-sidebar__button.single-sidebar__button_number(
      blue,
      v-if="phone"
    )
      span.phone {{ phoneNumber }}
    button-primary.single-sidebar__button.single-sidebar__button_number(
      icon="phone",
      blue,
      v-else,
      @click.native="showPhone"
    ) Show number
  button-primary.single-sidebar__button.single-sidebar__button_message(
    icon="chatting",
    light
  ) Message

  client-only
    module-user-info.single-sidebar__user(
      :avatar="user.avatar",
      :name="user.full_name",
      :about="`Registered ${getDateAbout(new Date())}`",
      :verified="user.verified_at !== null",
      v-if="$screen.lt"
    )

  .single-sidebar__bottom.flex
    .single-sidebar__label.single-sidebar__label_date.color-gray {{ formatDistance(subDays(new Date(info.created_at), 3), new Date(), { addSuffix: true }) }}
    .single-sidebar__label.single-sidebar__label_id.color-gray ID {{ info.id }}
    module-single-views.single-sidebar__views {{ info.show_details }}
</template>

<script>
import { numberWithSpaces } from "~/assets/js/functions";
import favorite from "@/mixins/favorite";
import moment from "moment";
import { formatDistance, subDays } from "date-fns";

export default {
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    cost: {
      type: [Number, String],
    },
    products: {
      type: Number,
    },
    phoneNumber: {
      type: String,
      default: "+ 1 376 266 5353",
    },

    moreDetails: {
      type: Boolean,
      default: false,
    },

    user: {
      type: Object,
      default: () => ({}),
    },

    info: {
      type: Object,
      default: () => ({}),
    },
  },
  mixins: [favorite],

  data() {
    return {
      phone: false,
      numberWithSpaces,
      subDays,
      formatDistance,
    };
  },
  methods: {
    getDateAbout(date) {
      if (!date) return "";
      return moment(date).utc().format("MMMM yyyy");
    },
    showPhone() {
      this.phone = true;
      this.$axios
        .$post(`${this.$api.user.statistics}${this.info.slug}/phone-view`)
        .then((res) => console.log(res));
    },
    showMore() {
      this.$router.push(this.$changeRoute("/product/" + this.info.slug));
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.flex-1 {
  flex: 1;
}

.single-sidebar {
  padding: 30rem 30rem 15rem;
  border: 1px solid $light-gray;
  border-radius: 20rem;

  @include large-tablet {
    padding: 20rem 20rem 10rem;
  }

  @include small-tablet {
    padding: 40rem 0;
    border: none;
    border-radius: 0;
  }

  &__bottom {
    margin-top: 30rem;

    @include large-desktop {
      margin-top: 25rem;
    }

    @include small-tablet {
      align-items: flex-start;
    }

    @include large-mobile {
      margin-top: 10rem;
    }
  }

  &__favorite {
    position: absolute;
    right: 10rem;
    top: 10rem;

    @include large-mobile {
      top: 15rem;
      right: -8rem;
    }
  }

  &__views {
    margin-left: auto;
    margin-bottom: 15rem;
    @include large-tablet {
      margin-bottom: 10rem;
    }
  }

  &__label {
    font-weight: 600;
    margin-right: 30rem;
    margin-bottom: 15rem;

    @include large-tablet {
      margin-right: 15rem;
      margin-bottom: 10rem;
    }

    @include small-tablet {
      margin-right: 30rem;
    }

    @include large-mobile {
      font-size: 14rem;
      line-height: 1em;
    }
  }

  &__title {
    margin-bottom: 30rem;
    padding-right: 80rem;

    @include large-desktop {
      padding-right: 20rem;
      margin-bottom: 20rem;
    }

    @include large-mobile {
      padding-right: 100rem;
      margin-bottom: 10rem;
    }
  }

  &__user {
    margin-top: 62rem;

    @include large-desktop {
      margin-top: 25rem;
    }
  }

  &__price {
    color: $blue;
    margin-bottom: 30rem;
    @include large-desktop {
      margin-bottom: 20rem;
    }

    @include large-mobile {
      line-height: 1em;
    }

    &-span {
      font-weight: 500;
      letter-spacing: 0;
      margin-left: 15rem;
      margin-bottom: 30rem;
      @include large-desktop {
        margin-bottom: 20rem;
        font-size: 12rem;
        margin-left: 8rem;
      }

      @include large-mobile {
        line-height: 1em;
      }
    }
  }

  &__other {
    margin-top: 30rem;
  }

  &__button {
    width: 100%;
    margin-bottom: 10rem;

    @include large-mobile {
      height: 60rem;
    }
  }

  &__more {
    margin-top: 40rem;
    width: 100%;
  }
}
</style>
