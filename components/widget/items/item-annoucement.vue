<template lang="pug">
.item-annoucement(:class="Mods")
  .item-annoucement__row
    .item-annoucement__column.item-annoucement__column_left
      form-checkbox.item-annoucement__checkbox(
        :checked="checked",
        @change.native="$emit('checked')"
      )
      NuxtLink.item-annoucement__preview(:to="to")
        set-img.object-fit(
          :src="preview",
          :defaultImg="require('assets/img/default-product.jpg')"
        )

      .item-annoucement__info(v-if="small")
        .item-annoucement__title.h4.text-wrap {{ name }}
        .item-annoucement__desc
          .item-annoucement__text(v-if="user")
            span.color-gray User: &nbsp;
            | {{ user.full_name }}
          .item-annoucement__text(v-if="category")
            span.color-gray Category: &nbsp;
            | {{ category.name }}
        .item-annoucement__footer.flex.flex_vertical.flex_justify
          .item-annoucement__status {{ getStatus(status) }}
          .item-annoucement__footer-date {{ generateDate(date) }}
      .item-annoucement__info(v-else)
        .item-annoucement__name
          .item-annoucement__title.h4.text-wrap {{ name }} -{{ checked }}
        .item-annoucement__price.tablet-visible $ {{ numberWithSpaces(price) }}
        .item-annoucement__days.color-gray.tablet-visible
          | Left:
          span.color-blue {{ days }}
        .item-annoucement__distance.color-gray.h6 {{ distance }}
        .item-annoucement__date.color-gray.h6 {{ date }}
        .item-annoucement__nav.flex
          button-medium.item-annoucement__nav-btn(icon="chatBorder") Chat
          button-medium.item-annoucement__nav-btn(icon="closeBig", white) Deactivate
        part-statistic.item-annoucement__statistic.tablet-visible(
          :statistics="statistics",
          light
        )

    .item-annoucement__column.item-annoucement__column_right
      .item-annoucement__price.tablet-hidden $ {{ numberWithSpaces(price) }}
      part-statistic.item-annoucement__statistic.tablet-hidden(
        :statistics="statistics",
        light
      )
      .item-annoucement__bottom.flex.flex_justify
        .item-annoucement__bottom-column
          button-medium.item-annoucement__bottom-btn.tablet-hidden(
            icon="chart",
            v-b-modal.modal-statistic
          ) Statistics
        .item-annoucement__bottom-column.flex
          button-medium.item-annoucement__bottom-btn.tablet-hidden(
            icon="zipper",
            blue
          ) Sale faster
          button-medium.item-annoucement__more(icon="dots", border, square)
  .item-absalute(@click.prevent="$emit('show')")
</template>

<script>
import { numberWithSpaces } from "assets/js/functions";
import moment from "moment";

export default {
  props: {
    name: {
      type: String,
      default: "Объектив SLR Magic. Sony E. 25mm f1.4",
    },
    user: {
      type: Object,
      default: {},
    },
    category: {
      type: Object,
      default: "",
    },
    status: {
      type: Number,
      default: 0,
    },
    city: {
      type: String,
      default: "New Your",
    },
    distance: {
      type: String,
      default: "2 km near you",
    },
    date: {
      type: String,
      default: "11.12.2022 - 13.12.2022",
    },
    days: {
      type: String,
      default: "3 days",
    },
    price: {
      type: Number,
      default: 228,
    },
    phoneNumber: {
      type: String,
      default: "+ 1 376 266 5353",
    },
    to: {
      type: String,
      default: "#",
    },
    preview: {
      type: [Object, String],
      default: "",
    },
    statistics: {
      type: Array,
      default: () => [
        {
          icon: "favorites",
          name: "Favorites",
          number: "20",
        },
        {
          icon: "view",
          name: "Views",
          number: "2.1 К",
        },
        {
          icon: "call",
          name: "Calls",
          number: "9",
        },
      ],
    },
    small: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      phone: false,
      numberWithSpaces,
    };
  },
  methods: {
    showPhone() {
      this.phone = true;
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    getStatus(status) {
      let text = "";
      if (status === 1) text = "Active";
      else if (status === 2) text = "No Active";
      else text = "On Moderation";
      return text;
    },
  },

  computed: {
    Mods() {
      return {
        "item-annoucement_small": this.small,
      };
    },
  },
};
</script>

<style lang="scss">
.item-annoucement {
  position: relative;

  .item-absalute {
    position: absolute;
    right: 0;
    height: 100%;
    width: calc(100% - 30px);
    z-index: 3;
    top: 0;
  }

  @include min-large-tablet {
    .tablet-visible {
      display: none;
    }
  }

  @include large-tablet {
    .tablet-hidden {
      display: none;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    @include items(2, 15);

    @include large-tablet {
      flex-wrap: wrap;
      position: relative;
      margin: 0;
    }
  }

  &__column {
    &_left {
      display: flex;
    }

    &_right {
      max-width: 600rem;
    }

    @include small-desktop {
      &_left {
        width: calc(60% - 30rem);
      }
      &_right {
        width: calc(40% - 30rem);
      }
    }

    @include large-tablet {
      width: 100%;
      margin: 0;
    }
  }

  &__preview {
    position: relative;
    overflow: hidden;
    width: 226rem;
    height: 172rem;
    border-radius: 10rem;
    margin-right: 20rem;
    flex-shrink: 0;

    @include large-tablet {
      height: 175rem;
    }
    @include small-tablet {
      width: 175rem;
    }

    @include large-mobile {
      width: 108rem;
      height: 111rem;
      margin-right: 13rem;
    }
  }

  &__info {
    padding-top: 8rem;
    width: 100%;
    @include large-tablet {
      padding-top: 0;
    }
  }

  &__name {
    position: relative;
    height: 24rem;

    @include large-tablet {
      height: auto;
    }
  }

  &__title {
    font-family: "Gilroy";
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    @include large-tablet {
      padding-right: 50rem;
      position: static;
      overflow: visible;
      white-space: inherit;
      height: auto;
    }
  }

  &__desc {
    margin-top: 10rem;
    font-weight: 500;

    .color-gray {
      color: #9a9a9a;
    }

    @include large-mobile {
      font-size: 12rem;
    }
  }

  &__text {
    &:not(:first-child) {
      margin-top: 5rem;
    }
  }

  &__distance {
    margin-top: 15rem;

    @include large-tablet {
      display: none;
    }
  }

  &__days {
    display: inline-flex;
    background: #f4f3f4;
    border-radius: 3px;
    padding: 4rem 6rem;
    margin-top: 10rem;

    @include large-mobile {
      font-size: 12rem;
      line-height: 1;
    }
  }

  &__date {
    margin-top: 10rem;
    @include large-tablet {
      display: none;
    }
  }

  &__nav {
    margin-top: 35rem;

    &-btn {
      &:not(:last-child) {
        margin-right: 20rem;
        padding: 0 15rem;
      }
    }

    @include large-tablet {
      display: none;
    }
  }

  &__price {
    padding-top: 3rem;
    font-size: 24rem;
    line-height: 1;
    text-align: right;
    font-weight: 600;
    letter-spacing: 0.01em;
    @include large-tablet {
      text-align: left;
      padding-top: 0;
      margin-top: 10rem;
    }

    @include large-mobile {
      margin-top: 8rem;
      font-size: 15rem;
    }
  }

  &__statistic {
    margin-top: 20rem;

    @include large-tablet {
      margin-top: 10rem;
    }
  }

  &__bottom {
    margin-top: 30rem;
    @include large-tablet {
      margin-top: 0;
    }
  }

  &__more {
    margin-left: 6rem;
    @include large-tablet {
      margin-left: 0;
      position: absolute;
      right: 0;
      top: 10rem;
    }

    @include large-mobile {
      background: #fff;
      border: 0;
      right: 0;
      top: 0;

      &.button-medium_square {
        width: 30px;
        height: 30px;
      }
    }
  }

  &__status {
    display: inline-flex;
    align-items: center;
    height: 20rem;
    padding: 0 7rem;
    background: #f4f3f4;
    border-radius: 3px;
    color: $gray;
    @include large-mobile {
      font-size: 12rem;
    }
  }

  &__footer {
    margin-top: 14rem;
    @include large-mobile {
      &-date {
        font-size: 12rem;
      }
    }
  }
}
</style>
