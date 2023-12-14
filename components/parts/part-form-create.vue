<template lang="pug">
	form.form-create(action="/support")
		.form-create__fields
			.form-create__field.form-create__field_first
				.form-create__column.form-create__column_left
					.form-create__label.form-create__label_mobile.h4 Main category
				.form-create__column.form-create__column_right
					button-category.form-create__category(
						:img="categoryImg"
						:to="categoryLink"
						:text="categoryText"
						edit
						v-b-modal.modal-create4
					)
				.form-create__column.form-create__column_left
				.form-create__column.form-create__column_right
					.form-create__nav.flex.flex_justify
						.form-create__breadcrumbs.color-blue.p
							span.form-create__breadcrumbs-item(v-for="(item, i) in breadcrumbs" :key="i")
								| {{item}}
						button-link-arrow.form-create__link-all All categories
			.form-create__field
				.form-create__column.form-create__column_left
					.form-create__label.h4 Condition 1
					.form-create__text.p.color-gray Recommended category*
				.form-create__column.form-create__column_right
					form-select.form-create__select(value="Choose" name="theme" :items="['Choose 1', 'Choose 2', 'Choose 3']" default)
			.form-create__field
				.form-create__column.form-create__column_left
					.form-create__label.h4 Condition 2
					.form-create__text.p.color-gray Recommended category*
				.form-create__column.form-create__column_right
					form-select.form-create__select(value="Choose" name="theme" :items="['Choose 1', 'Choose 2', 'Choose 3']" default)
			.form-create__field
				.form-create__column.form-create__column_left
					.form-create__label.h4 Youtube link
				.form-create__column.form-create__column_right
					form-input.form-create__input(placeholder="Sent the url on video" name="YoutubeLink" type="url")
			.form-create__field
				.form-create__column.form-create__column_left
					.form-create__label.h4 Enter the address
				.form-create__column.form-create__column_right
					form-input.form-create__input(placeholder="Baker street NY 3290# 20001" name="adress" adress mapLink="https://goo.gl/maps/dY5yws7YcseWbomj8")
			.form-create__field
				.form-create__column.form-create__column_left
					.form-create__label.h4 Enter the Phone
				.form-create__column.form-create__column_right
					form-input.form-create__input(placeholder="+1 313 031 0013" name="phone" type="tel")
				.form-create__column.form-create__column_left
				.form-create__column.form-create__column_right
					.form-create__checkboxes.flex
						form-checkbox.form-create__checkbox
							.p.color-gray Phone and message
						form-checkbox.form-create__checkbox
							.p.color-gray Only phone
						form-checkbox.form-create__checkbox
							.p.color-gray Only message
		.form-create__bottom.flex.flex_vertical.flex_justify
			slot

</template>

<script>

export default {
	props: {
		categoryImg: {
			type: String,
			default: "category__img1.png"
		},
		categoryLink: {
			type: String,
			default: "#"
		},
		categoryText: {
			type: String,
			default: "Electronics"
		},
		breadcrumbs: {
			type: Array,
			default: () => ([
			]),
		},
	},
}

</script>

<style lang="scss">
.form-create{
	&__field {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		&:not(:first-child) {
			margin-top: 40rem;
		}

		@include large-mobile {
			display: block;
			&:not(:first-child) {
				margin-top: 20rem;
			}
			&_first {
				padding-bottom: 20rem;
				border-bottom: 1px solid $light-gray;
			}
		}
	}
	&__column {
		&_left {
			width: 33.75%
		}
		&_right {
			width: 66.25%;
		}
		@include large-mobile {
			width: 100%;
		}
	}
	&__nav {
		margin-top: 23rem;

		@include large-mobile {
			margin-top: 30rem;
		}
	}
	&__breadcrumbs {
		line-height: 1;
		&-item {
			&:not(:first-child) {
				&:before {
					content: ' / '
				}
			}
		}

		@include large-mobile {
			font-size: 16rem;
			width: 100%;
		}
	}

	&__link-all {
		@include large-mobile {
			margin-top: 17rem;
		}
	}

	&__label {
		font-family: 'Gilroy';
		font-weight: 600;
		@include large-mobile {
			font-size: 16rem;
			&_mobile {
				font-size: 20rem;
			}
		}
	}

	&__text {
		margin-top: 8rem;
		line-height: 1;

		@include large-mobile {
			margin-top: 5rem;
		}
	}

	&__select {
		@include large-mobile {
			margin-top: 15rem;
		}
	}

	&__input {
		@include large-mobile {
			margin-top: 10rem;
		}
	}

	&__checkboxes {
		padding-top: 20rem;
		@include large-mobile {
			padding-top: 5rem;
		}
	}
	&__checkbox {
		margin-right: 30rem;
		margin-top: 10rem;
		&:last-child {
			margin-right: 0;
		}

		@include large-mobile {
			margin-top: 15rem;
			margin-right: 0;
			width: 100%;
		}
	}
	&__category {
		@include large-mobile {
			margin-top: 20rem;
		}
	}
}
</style>