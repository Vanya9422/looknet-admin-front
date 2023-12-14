<template lang="pug">
.user-info(:class="Mods")
	.user-info__content
		.user-info__avatar
			.user-info__avatar-img
				set-img.object-fit(:src="avatar" :default-img="require('~/assets/img/user.jpg')")
			.user-info__edit(v-if="edit" v-b-modal.modal-avatar)
				svg-icon(name="edit")
		.user-info__data
			.user-info__name.h5(v-if="name")
				| {{ name }}
				part-verified.user-info__verified(v-if="verified" :content="content")
			//TODO::getabout
			part-stars-rating.user-info__part-stars-rating(
				v-if='rating_reviews && rating_reviews.isSimple'
				:average-rating='rating_reviews.average_rating'
				:review-count='rating_reviews.review_count'
				:is-simple='rating_reviews.isSimple'
			)
			.user-info__about.color-gray(v-if="about") {{ about }}
			.user-info__confimed(v-if="vertical")
				.user-info__confimed-icon
					img(src="~/assets/img/verified.svg")
				.user-info__confimed-text(v-html="content")
	part-stars-rating.user-info__part-stars-rating(
		v-if='rating_reviews && !rating_reviews.isHidden && (!rating_reviews.isSimple || (rating_reviews.isSimple && !this.$screen.st))'
		:average-rating='rating_reviews.average_rating'
		:review-count='rating_reviews.review_count'
	)
</template>

<script>
export default {
  props: {
    avatar: {
      type: [Object, String],
    },
    name: {
      type: String,
    },
    about: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    vertical: {
      type: Boolean,
    },
    big: {
      type: Boolean,
    },
    edit: {
      type: Boolean,
    },
    content: {
      type: String,
      default: "<strong>Phone / Еmail confirmed</strong>",
    },
    rating_reviews: {
      type: [Object, Boolean],
      default: false,
    },
  },
  computed: {
    Mods() {
      return {
        "user-info_vertical": this.vertical,
        "user-info_big": this.big,
      };
    },
  },
};
</script>

<style lang="scss">
.user-info {
  @include min-large-mobile {
    &_vertical {
      .user-info {
        &__verified {
          display: none;
        }

        &__data {
          display: flex;
          align-items: center;
        }

        &__about {
          margin-top: 0;
          margin-left: 20rem;
        }
      }
    }
  }

  &_big {
    .user-info {
      &__content {
        text-align: center;
        display: block;
      }

      &__avatar {
        width: 165rem;
        margin: 0 auto 0 auto;
      }

      &__data {
        margin-top: 32rem;
      }

      &__name {
        font-size: 26rem;
      }

      &__about {
        font-size: 18rem;
        line-height: 1.5;
        color: rgba(6, 36, 57, 0.5);
        margin-top: 10rem;
      }
    }

    @include large-tablet {
      text-align: left;
      display: flex;
      .user-info {
        &__avatar {
          width: 120rem;
        }

        &__data {
          margin-left: 20rem;
          margin-top: 0;
        }
      }
    }

    @include large-mobile {
      .user-info {
        &__avatar {
          width: 63rem;
        }

        &__name {
          font-size: 20rem;
        }

        &__about {
          margin-top: 5rem;
          font-size: 14rem;
          line-height: 1;
        }
      }
    }
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__edit {
    width: 38rem;
    height: 38rem;
    border-radius: 100%;
    background: $blue;
    position: absolute;
    right: 11rem;
    bottom: -6rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      fill: #fff;
      width: 16rem;
      height: 16rem;
    }

    @include large-mobile {
      width: 24rem;
      height: 24rem;
      right: -2rem;
      bottom: 0;
      svg {
        width: 10rem;
        height: 10rem;
      }
    }
  }

  &__avatar {
    flex: 0 0 auto;
    width: 38rem;
    margin-right: 10rem;
    position: relative;

    &:before {
      padding-top: 100%;
      content: "";
      display: block;
    }

    img {
      border-radius: 50%;
    }
  }

  &__name {
    @extend %text-overflow;
  }

  &__about {
    // margin-top: 10rem;
    font-weight: 500;
    margin-top: 5rem;
    // line-height: 1em;

    // @extend %text-overflow;

    @include large-mobile {
      font-size: 14rem;
      line-height: 1em;
      margin-top: 6rem;
    }
  }

  &__verified {
    margin-left: 3rem;
    @include large-mobile {
      margin-left: 11rem;
    }
  }

  &__data {
    flex: 1 1 auto;
  }

  &__confimed {
    display: flex;
    align-items: center;
    margin-left: 20rem;

    &-icon {
      width: 12rem;
      height: 12rem;
      margin-right: 10rem;
    }

    @include large-mobile {
      display: none;
    }
  }

  &__part-stars-rating {
    &:not(.part-stars-rating_simple) {
      margin-top: 14rem;
    }

    &.part-stars-rating_simple {
      margin-left: 34rem;
    }
  }
}
</style>
