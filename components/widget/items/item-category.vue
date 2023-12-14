<template lang="pug">
	NuxtLink.item-category(:to="to")
		span.item-category__img
			img(:src="require(`~/assets/img/${img}`)" v-if="img")
			.item-category__icon(v-else)
				svg-icon(name="grid")
		span.item-category__text.p(v-html="text")
</template>

<script>
export default{
	props: {
		img: {
			type: String,
			default: ""
		},
		to: {
			type: String,
			default: "#"
		},
		text: {
			type: String,
			default: "All categories"
		}
	}
}
</script>

<style lang="scss">
.item-category{
	text-align: center;
	transition: ease .2s;
	display: block;
	color: $gray;

	&:hover {
		color: $blue;
	}

	&__img {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 75rem;
		height: 75rem;
		margin: 0 auto;
		img {
			max-width: 100%;
			max-height: 100%;
		}

		@include large-mobile {
			width: 55rem;
			height: 55rem;
		}
	}

	&__text {
		line-height: 1;
		margin: 10rem auto 0 auto;
		max-width: 120rem;
		display: block;
		font-weight: 600;
		width: 100%;

		@include large-mobile {
			font-size: 12rem;
		}
	}
	&__icon {
		width: 48rem;
		height: 48rem;
		background: #F5F5F7;
		border-radius: 10rem;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			width: 16rem;
			height: 16rem;
			fill: #6A757C;
		}
	}
}
</style>