<template lang="pug">
section.annoucement-list.checkboxs__list
	.annoucement-list__head.flex.flex_vertical.flex_justify
		.annoucement-list__title
			h1.annoucement-list__title-text.h2.h2_big {{title}}
			span.annoucement-list__title-counter.h3 ({{reviewsListTotal}})
		button-switcher.annoucement-list__switcher(
			blue
			:items="GET_REVIEW_SWITCHERS"
			@change="CHANGE_REVIEWS_STATUS"
		)
	part-feedback-table.annoucement-list__table(
		v-if="reviewsList.length > 0"
		:rows="reviewsList"
		@updateReviews='handleUpdateReviews'
		@setModalReviewFeedbackState='handleModalReviewFeedbackStateChange'
	)
		infinite-loading(
			v-if="!this.isReviewsListLoading && !GET_REVIEWS_LOADED && reviewsList.length",
			:distance="20"
			@infinite="handleLoadMoreReviews"
		)
			div(slot="no-results")
			div(slot="no-more")
			div(slot="spinner")
	.annoucement-list__items
		item-feedback.annoucement-list__item(
			v-for="(itemFeedback, itemFeedbackIndex) in reviewsList"
			:key='itemFeedback.id'
			:product='itemFeedback.product'
			:comment='itemFeedback.comment'
			:author='itemFeedback.author'
			:status='itemFeedback.status'
			:published='itemFeedback.published'
			:created-at='itemFeedback.created_at'
			@click.native='handleModalReviewFeedbackStateChange(itemFeedback)'
		)
		infinite-loading(
				v-if="!this.isReviewsListLoading && !GET_REVIEWS_LOADED && reviewsList.length",
				:distance="20"
				@infinite="handleLoadMoreReviews"
			)
				div(slot="no-results")
				div(slot="no-more")
				div(slot="spinner")
	modal-review-feedback(
		v-model='modalReviewFeedbackData'
		@reviewActivate='handleReviewActivate'
		@reviewRefuse='handleReviewRefuse'
		@advertiseShow='handleUserAdvertiseShow'
		@personBan='handlePersonBan'
	)
	modal-activated(
		title='The review is activated'
		@continue='handleModalActivatedContinue'
		@close='handleModalActivatedClose'
	)
		| You have activated the review, if it is an error, click «Cancel»
	modal-ban-person(
	  :status="0"
	  @ban="handleBanUser"
	)
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { generateErrorMessage } from "~/assets/js/functions";

export default {
  middleware: ["admin"],

  props: {
    title: {
      type: String,
      default: "Feedback",
    },
  },

  data() {
    return {
      isReviewsListLoading: false,

      reviewsList: [],

      modalReviewFeedbackData: {
        reviewContent: {},
        isModalOpened: false,
      },

      refusalState: {
        refusal_id: null,
        refusal_comment: null,
      },
    };
  },

  computed: {
    ...mapGetters({
      GET_REVIEWS: "reviews/GET_REVIEWS",
      GET_REVIEW_STATUS: "reviews/GET_REVIEW_STATUS",
      GET_REVIEWS_LOADED: "reviews/GET_REVIEWS_LOADED",
      GET_REVIEW_SWITCHERS: "reviews/GET_REVIEW_SWITCHERS",
    }),

    reviewsListTotal() {
      return this.reviewsList.length;
    },
  },

  async created() {
    if (this.GET_REVIEWS.length) {
      if (this.GET_REVIEWS[0].published === 0) {
        this.reviewsList = this.GET_REVIEWS;
      } else {
        this.CHANGE_REVIEWS_STATUS(0);
      }
    } else {
      this.setReviews();
    }
  },

  methods: {
    ...mapActions({
      SET_REVIEWS: "reviews/SET_REVIEWS",
      SET_REVIEWS_INITIAL_STATE: "reviews/SET_REVIEWS_INITIAL_STATE",
      CHANGE_REVIEWS_STATUS: "reviews/CHANGE_REVIEWS_STATUS",
    }),

    async handleLoadMoreReviews($state) {
      if (!this.isReviewsListLoading) {
        await this.SET_REVIEWS();

        this.reviewsList = this.GET_REVIEWS;

        if (this.GET_REVIEWS_LOADED) {
          $state.complete();
        } else {
          $state.loaded();
        }
      }
    },

    async handleUpdateReviews() {
      this.setReviews({ shouldSetReviewsInitialState: true });
    },

    async setReviews({ shouldSetReviewsInitialState = false } = {}) {
      if (!this.isReviewsListLoading) {
        this.isReviewsListLoading = true;

        if (shouldSetReviewsInitialState) {
          this.reviewsList = [];
          this.SET_REVIEWS_INITIAL_STATE();
        }

        await this.SET_REVIEWS();

        this.reviewsList = this.GET_REVIEWS;

        this.isReviewsListLoading = false;
      }
    },

    async handleReviewRefuse() {
      await this.changeReviewStatus({ published: 2 }).then(() => {
        this.resetState();
      });
    },

    changeReviewStatus({ published = 0 } = {}) {
      return this.$axios
        .$put("/admin/reviews", {
          id: this.modalReviewFeedbackData.reviewContent.id,
          published,
          ...this.refusalState,
        })
        .catch((error) => {
          if (error?.response) {
            const errorMessage = generateErrorMessage(error);

            this.$toast.show(errorMessage, {
              duration: 3000,
              position: "top-right",
              type: "error",
            });
          }
        });
    },

    resetState() {
      this.handleUpdateReviews();

      this.modalReviewFeedbackData = {
        isModalOpened: false,
        reviewContent: {},
      };

      this.refusalState = {
        refusal_id: null,
        refusal_comment: null,
      };
    },

    handleModalReviewFeedbackStateChange(reviewContent) {
      this.modalReviewFeedbackData.reviewContent = reviewContent;
      this.modalReviewFeedbackData.isModalOpened = true;
    },

    handleReviewActivate() {
      this.$root.$emit("bv::show::modal", "modal-activated");

      this.refusalState = {
        refusal_id: null,
        refusal_comment: null,
      };

      this.changeReviewStatus({ published: 1 });
    },

    handleModalActivatedContinue() {
      this.resetState();
    },

    handleModalActivatedClose() {
      this.changeReviewStatus({ published: 2 });
    },

    handleUserAdvertiseShow() {
      this.$router.push(
        `/users/${this.modalReviewFeedbackData.reviewContent.user.id}`
      );
    },

    handlePersonBan() {
      this.$root.$emit("bv::show::modal", "modal-ban-user");
    },

    handleBanUser() {
      this.$axios
        .$put("/admin/users/banned", {
          banned_ids: [this.modalReviewFeedbackData.reviewContent.author.id],
          type: 1,
        })
        .then(() => {
          this.resetState();
        })
        .catch((error) => {
          if (error?.response) {
            const errorMessage = generateErrorMessage(error);

            this.$toast.show(errorMessage, {
              duration: 3000,
              position: "top-right",
              type: "error",
            });
          }
        });
    },
  },

  watch: {
    GET_REVIEW_STATUS() {
      this.setReviews({ shouldSetReviewsInitialState: true });
    },
  },
};
</script>

<style lang="scss">
@include min-large-mobile {
  .cost {
    input {
      opacity: 0;
    }

    &.focus input,
    &:focus-within input {
      opacity: 1;
    }
  }
}

.part-search-filter-category {
  display: flex;
  align-items: center;
  position: relative;
}

.button-select_border-right .button-select__head {
  border: 0 !important;
}

.button-select__text {
  max-width: 100px;
  width: 100%;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.annoucement-list {
  padding: 30rem 0;

  @include small-tablet {
    padding-bottom: 80rem;
  }

  @include large-mobile {
    padding: 20rem 0 60rem 0;
  }

  &__title {
    display: flex;

    &-text {
      font-family: "Atyp Display";
      font-weight: 500;
    }

    &-counter {
      font-family: "Atyp Display";
      margin-left: 10rem;
      font-weight: 500;
      padding-top: 10rem;
      font-size: 24rem;
      color: #9a9a9a;
    }

    @include large-tablet {
      &-counter {
        font-size: 18rem;
        padding-top: 8rem;
      }
    }

    @include large-mobile {
      &-counter {
        font-size: 17rem;
        padding-top: 5rem;
        margin-left: 8rem;
      }
    }
  }

  &__switcher {
    @include large-mobile {
      margin-top: 15rem;
      width: calc(100% + 30rem);
    }
  }

  &__filter {
    margin-top: 40rem;
  }

  &__table {
    margin-top: 50rem;

    @include large-tablet {
      display: none !important;
    }
  }

  &__panel {
    margin-left: 0;
    margin-right: 0;
    margin-top: 10rem;
  }

  &__items {
    @include min-large-tablet {
      display: none;
    }
  }

  &__select-all {
    margin-top: 15rem;
    @include min-large-tablet {
      display: none;
    }
  }

  &__item {
    padding: 15rem 0;
    border-bottom: 1px solid $light-gray;
  }
}

.w-40 {
  width: 40%;
  display: inline-flex !important;
}

.w-50 {
  width: 50%;
  display: inline-flex !important;
}

@include large-mobile {
  .input.cost {
    display: flex;
    gap: 10px;
  }
}

.annoucement-list.section-users__panel-wrap {
  margin-top: 15px !important;
}
</style>
