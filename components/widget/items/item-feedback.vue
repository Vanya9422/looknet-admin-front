<template lang="pug">
.item-feedback
	.item-feedback__photo
		set-img.object-fit(
			:src="product.picture",
			:default-img="require('assets/img/default-product.jpg')"
		)
	.item-feedback__content
		.item-feedback__title.h4.text-wrap
			| {{ product.name || "" }}
		.item-feedback__list(v-if='getObjectLength(generateRowsContent)')
			p.item-feedback__list-item(
				v-for="(key, value) in generateRowsContent"
				:key='key'
			)
				span {{ value }}:
				| {{ key }}
		.item-feedback__footer
			.item-feedback__status
				| {{ GET_REVIEW_STATUS_TEXT(published) }}
			.item-feedback__date(v-if='createdAt')
				| {{ generateDate }}

</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

import { getObjectLength } from "~/assets/js/functions.js";

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },

    createdAt: {
      type: String,
      default: "",
    },

    published: {
      type: Number,
      default: 0,
    },

    comment: {
      type: String,
      default: "",
    },

    author: {
      type: Object,
      default: () => ({}),
    },

    status: {
      type: [Number, Boolean],
      default: false,
    },
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      GET_REVIEW_STATUS_TEXT: "reviews/GET_REVIEW_STATUS_TEXT",
      GET_DEAL_STATUS: "reviews/GET_DEAL_STATUS",
    }),

    generateDate() {
      return moment(this.createdAt).utc().format("DD/MM/yyyy");
    },

    generateRowsContent() {
      const contentObject = {
        Review: this.comment || "",
        Person: this.author?.full_name || "",
        Email: this.author?.email || "",
        Status: this.GET_DEAL_STATUS(this.status),
      };

      return Object.fromEntries(
        Object.keys(contentObject).reduce((acc, key) => {
          if (contentObject[key]) {
            acc.push([key, contentObject[key]]);
          }

          return acc;
        }, [])
      );
    },
  },

  methods: {
    getObjectLength,
  },
};
</script>

<style lang="scss">
.item-feedback {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  gap: 20rem;

  @include large-mobile() {
    gap: 13rem;
  }

  &__photo {
    position: relative;
    border-radius: 20rem;
    flex: 0 0 auto;
    overflow: hidden;
    width: 226rem;
    height: 175rem;

    @include large-mobile() {
      width: 108rem;
      height: 111rem;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-flow: column nowrap;
    gap: 10rem;
  }

  &__title {
    font-family: "Gilroy";
    font-weight: 600;
  }

  &__list {
    font-weight: 500;
    font-weight: 500;

    @include large-mobile {
      font-size: 12rem;
    }

    &-item {
      @extend %text-overflow;

      &:not(:first-child) {
        margin-top: 5rem;
      }

      span {
        flex: 0 0 auto;
        color: #9a9a9a;
        margin-right: 5rem;
      }
    }
  }

  &__footer {
    display: flex;
    flex-flow: row wrap;
    gap: 20rem;
    align-items: center;
    margin-top: auto;
    padding-top: 4rem;
    justify-content: space-between;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    padding: 4rem 7rem;
    background: #f4f3f4;
    border-radius: 3px;
    color: $gray;

    @include large-mobile {
      font-size: 12rem;
    }
  }

  &__date {
    @include large-mobile() {
      font-size: 12rem;
    }
  }
}
</style>
