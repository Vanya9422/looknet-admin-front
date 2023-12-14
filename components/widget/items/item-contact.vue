<template lang="pug">
	.item-contact
		h3.item-contact__title.h3 {{title}}
		.item-contact__row(v-if="row")
			.item-contact__column(v-for="(column, i) in row" :key="i")
				.item-contact__label {{ column.label }}
				.item-contact__list
					.item-contact__item(v-for="(item, i) in column.list" :key="i" v-html="item")
</template>

<script>
export default{
	props: {
		title: {
			type: String,
			default: ''
		},
		row: {
			type: Array,
			default: () => ([
			])
		}
	}
}
</script>

<style lang="scss">
.item-contact {
	&__row {
		display: flex;
		margin: 30rem -10rem 0 -10rem;
		

		@include large-mobile {
			margin-top: 24rem;
		}
	}
	&__column {
		width: 100%;
		padding: 0 10rem;
	}
	&__label {
		font-size: 18rem;
		line-height: 1;
		color: rgba(6, 36, 57, 0.5);
		font-weight: 600;

		@include large-mobile {
			font-size: 14rem;
		}
	}
	&__list {
		margin-top: 20rem;
	}
	&__item {
		font-size: 22rem;
		line-height: 1.3;
		&:not(:first-child) {
			margin-top: 12rem;
		}

		@include large-tablet {
			font-size: 18rem;
		}
		@include large-mobile {
			line-height: 1;
			.email {
				font-size: 14rem;
				display: block;
				margin-top: -5rem;
			}
		}
	}
}
</style>