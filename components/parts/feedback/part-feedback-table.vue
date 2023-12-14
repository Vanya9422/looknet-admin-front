<template lang="pug">
.feedback-table
	table
		thead
			tr
				th Image
				th Name of product
				th Review
				th Person
				th Email
				th Status
				th Date public
				th
		tbody
			tr(
				v-for="(row, i) in rows"
				:key="i"
			)
				//- Image
				td
					.feedback-table__img
						set-img.object-fit(
							:src="row.product.picture",
							:default-img="require('assets/img/default-product.jpg')"
						)

				//- Name of product
				td
					.feedback-table__name.text-wrap {{ row.product.name || "" }}

				//- Review
				td.text-wrap
					.feedback-table__message {{ row.comment || "" }}

				//- Person
				td
					span.auth_name.text-wrap {{ row.author ? row.author.full_name : "" }}

				//- Email
				td.text-wrap {{ row.author ? row.author.email : "" }}

				//- Status
				td.text-wrap {{  row.translated_status }}

				//- Date public
				td.text-wrap {{ generateDate(row.created_at) }}

				//- Button
				td
					button-medium.feedback-table__btn(
						icon="arrowRight",
						border,
						square,
						@click.native="handleModalReviewFeedbackTrigger({reviewContent: row})"
					)
					.item-absalute(@click.prevent="handleModalReviewFeedbackTrigger({reviewContent: row})")
	slot
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {};
  },

  props: {
    rows: {
      type: Array,
      default: () => [],
    },

    status: {
      type: Number,
      default: 0,
    },

    checkedAll: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      GET_DEAL_STATUS: "reviews/GET_DEAL_STATUS",
    }),
  },

  methods: {
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },

    handleModalReviewFeedbackTrigger({ reviewContent }) {
      this.$emit("setModalReviewFeedbackState", reviewContent);
    },
  },
};
</script>

<style lang="scss">
.annoucement-list__table {
  position: relative;
}

.auth_name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  display: block;
}

.feedback-table {
  .item-absalute {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
  }

  tbody tr:hover {
    cursor: pointer;

    .feedback-table__name {
      color: $blue;
    }

    .feedback-table__btn {
      border-color: $blue;

      svg {
        stroke: $blue;
      }
    }
  }

  tr {
    border-bottom: 1px solid $light-gray;
    position: relative;
  }

  th {
    color: $gray;
    font-weight: 500;
    padding-bottom: 17rem;
  }

  th,
  td {
    &:not(:last-child) {
      padding-right: 20rem;
    }

    &:first-child {
      width: 83rem;
    }

    &:nth-child(2) {
      width: 200rem;
    }

    &:nth-child(3) {
      width: 300rem;
    }

    &:last-child {
      width: 40rem;
    }
  }

  td {
    padding-bottom: 15rem;
    padding-top: 15rem;
    font-size: 15rem;
    font-weight: normal;
  }

  &__img {
    position: relative;
    overflow: hidden;
    width: 63rem;
    height: 60rem;
    border-radius: 10rem;
  }

  &__name {
    max-width: 223rem;
    font-weight: 500;
    transition: 0.3s;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__message {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__btn {
    transition: 0.3s;
  }
}

.feedback-table__btn .button-medium__icon {
  stroke: #6e6e73;
  stroke-width: 2;
  width: 10px;
  height: 10px;
}
</style>
