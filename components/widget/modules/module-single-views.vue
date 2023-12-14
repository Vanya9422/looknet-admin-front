<template lang="pug">
	span.single-views
		svg-icon.single-views__icon(name="eye-1" viewBox="0 0 15 9")
		span.single-views__text
			slot
</template>

<style lang="scss">
.single-views{
	display: flex;
	align-items: center;
	color: $gray;
	fill: $gray;
	font-weight: 600;
	line-height: 1;

	@include large-mobile {
		font-size: 14rem;
		line-height: 1;
		fill: #C3C8CB;
	}

	&__icon{
		flex: 0 0 auto;
		width: 24rem;
		margin-right: 10rem;

		@include large-mobile {
			margin-top: -2rem;
			margin-right: 5rem;
		}
	}
}
</style>