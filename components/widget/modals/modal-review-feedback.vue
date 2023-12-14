<template lang="pug">
b-modal(
	id='modal-review-feedback'
	modal-class="modal-review-feedback"
	body-class="modal-review-feedback__body"
	content-class="modal-review-feedback__content"
	header-class="modal-review-feedback__header"
	size='review-feedback-size'
	:hide-footer="true"
	:visible='value.isModalOpened'
	@show="handleModalOpen"
	@hide="handleModalHide"
	centered)
	template(#modal-header='{ close }')
		button-close.modal__close(@click.native='close()')
	module-user-info.modal-review-feedback__module-user-info(
		v-if='value.reviewContent.user && getObjectLength(value.reviewContent.user)'
		:avatar="value.reviewContent.user.avatar",
		:name="value.reviewContent.user.full_name",
		:about="value.reviewContent.user.about",
		:verified="value.reviewContent.user.verified",
		:rating_reviews="{isHidden: true}"
		vertical
	)
	.modal-review-feedback__feedback.flex.flex_nowrap.flex_vertical
		.modal-review-feedback__review-status {{ GET_REVIEW_STATUS_TEXT(value.reviewContent.published) }}
		part-stars-rating.modal-review-feedback__part-stars-rating(
			v-if='value.reviewContent.user && getObjectLength(value.reviewContent.user) && value.reviewContent.user.rating_reviews'
			:average-rating='value.reviewContent.user.rating_reviews.average_rating'
			:review-count='value.reviewContent.user.rating_reviews.review_count'
			:disable-modal-trigger='true'
		)
	.modal-review-feedback__review.css-scrollbar(
		v-if='getObjectLength(value.reviewContent)'
	)
		item-review.modal-review-feedback__item-review(
      :review-content='value.reviewContent'
    )
	.modal-review-feedback__footer
		.modal-review-feedback__footer-row
			button-primary.modal-review-feedback__button-primary(
				icon="check"
				blue
				@click.native="handleButtonPrimaryActiveClick"
			)
				| Active
			button-primary.modal-review-feedback__button-primary(
				icon="close"
				red
				@click.native="handleButtonPrimaryRefuseClick"
			)
				| Refuse
		.modal-review-feedback__footer-row
			button-primary.modal-review-feedback__button-primary(
				icon="user"
				gray
				@click.native="handleButtonPrimaryAdvertisesShowClick"
			)
				| Check other advertises
			button-primary.modal-review-feedback__button-primary(
				icon="danger"
				border
				@click.native="handleButtonPrimaryBanClick"
			)
				| Ban this person

</template>

<script>
import { mapGetters } from "vuex";

import { getObjectLength } from "~/assets/js/functions.js";

export default {
  data() {
    return {};
  },

  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters({
      GET_REVIEW_STATUS_TEXT: "reviews/GET_REVIEW_STATUS_TEXT",
    }),
  },

  methods: {
    getObjectLength,

    handleModalOpen() {},

    handleModalHide() {
      this.$emit("input", { ...this.value, isModalOpened: false });
    },

    handleButtonPrimaryActiveClick() {
      this.$emit("reviewActivate");
    },

    handleButtonPrimaryRefuseClick() {
      this.$emit("reviewRefuse");
    },

    handleButtonPrimaryAdvertisesShowClick() {
      this.$emit("advertiseShow");
    },

    handleButtonPrimaryBanClick() {
      this.$emit("personBan");
    },
  },

  watch: {},
};
</script>

<style lang="scss">
.modal-review-feedback {
  &.modal {
    @include min-large-mobile() {
      overflow: hidden !important;
      padding: 20px 0 !important;
    }

    @include large-mobile() {
      padding-top: 140rem !important;
      bottom: 48rem !important;
    }
  }
  &__content {
    max-height: 100%;
    overflow: hidden;
    margin: auto;
    display: flex;
    flex-flow: column nowrap;
    padding-right: 0;

    @include large-mobile() {
      margin: auto 0 0;
    }
  }

  &__body {
    display: flex;
    flex-flow: column nowrap;
    max-height: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__module-user-info {
    flex: 0 0 auto;
    padding-right: 60rem;

    @include large-tablet() {
      padding-right: 30rem;
    }

    @include large-mobile() {
      padding-right: 15rem;
    }

    .user-info {
      &__confimed {
        margin-left: 40rem;
      }
    }
  }

  &__feedback {
    flex: 0 0 auto;
    margin-top: 30rem;
    gap: 32rem;
    letter-spacing: -0.52px;
    line-height: 1;
    font-size: 26rem;
    padding: 0 60rem 30rem 0;
    position: relative;

    @include large-tablet() {
      font-size: 23rem;
      padding-bottom: 25rem;
    }

    @include large-tablet() {
      padding: 0 30rem 20rem 0;
    }

    @include large-mobile() {
      flex-direction: column;
      align-items: flex-start;
      gap: 16rem;
      margin-top: 20rem;
      font-size: 20rem;
      letter-spacing: -0.4px;
      padding: 0 15rem 20rem 0;
    }

    &::before {
      content: "";
      position: absolute;
      inset: auto 0 0 0;
      max-width: calc(100% - 60rem);
      background-color: #d2d2d7;
      height: 1px;

      @include large-tablet() {
        max-width: calc(100% - 30rem);
      }

      @include large-mobile() {
        max-width: calc(100% - 15rem);
      }
    }
  }

  &__review-status {
    color: rgba(85, 109, 238, 1);
  }

  &__part-stars-rating {
    flex: 1;
    min-width: 0;
    font-size: inherit;
    letter-spacing: -0.78px;

    @include large-tablet() {
      font-size: 20rem;
    }

    @include large-mobile() {
      font-size: 14rem;
      letter-spacing: -0.42px;
    }

    .part-stars-rating {
      &__stars {
        &-score {
          color: $gray;

          @include min-large-mobile() {
            color: #f1ae00;
          }
        }
      }

      &__module-stars {
        --star-width: 21rem;

        @include large-tablet() {
          --star-width: 18rem;
        }

        @include large-mobile() {
          --star-width: 14rem;
        }
      }
    }
  }

  &__review {
    position: relative;
    padding: 30rem 40rem 30rem 0;
    margin-right: 20rem;
    flex: 1;
    min-height: 0;

    @include large-tablet() {
      margin-right: 10rem;
      padding: 25rem 20rem 25rem 0;
    }

    @include large-mobile() {
      margin-right: 5rem;
      padding: 20rem 10rem 20rem 0;
    }

    &::before {
      margin-bottom: 38rem;
    }
  }

  &__item-review {
    width: 100%;

    &:not(:last-of-type) {
      margin-bottom: 32rem;
    }
  }

  &__footer {
    position: relative;
    padding: 30rem 60rem 0 0;

    @include large-tablet() {
      padding: 25rem 30rem 0 0;
    }

    @include large-mobile() {
      padding: 20rem 15rem 0 0;
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0 0 auto 0;
      max-width: calc(100% - 60rem);
      background-color: #d2d2d7;
      height: 1px;

      @include large-tablet() {
        max-width: calc(100% - 30rem);
      }

      @include large-mobile() {
        max-width: calc(100% - 15rem);
      }
    }

    &-row {
      display: flex;
      flex-flow: row wrap;
      gap: 11rem;

      @include large-mobile() {
        gap: 8rem;
      }

      &:not(:last-child) {
        margin-bottom: 14rem;

        @include large-mobile() {
          margin-bottom: 10rem;
        }
      }
    }
  }

  &__button-primary {
    @include large-mobile() {
      flex: 1 1 auto;
    }
  }
}
</style>
