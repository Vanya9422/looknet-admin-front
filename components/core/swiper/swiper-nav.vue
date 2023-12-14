<template lang="pug">
	.swiper-nav(:class="Mods")
		.swiper-button.swiper-button-prev
		button-arrow.swiper-button.swiper-button-prev(prev)
		button-arrow.swiper-button.swiper-button-next
			
</template>

<script>
export default {
	props: {
		light: {
			type: Boolean,
			default: false,
		}
	},

	computed: {
		Mods(){
			return {
				'swiper-nav_light': this.light
			}
		}
	}
}
</script>

<style lang="scss">
.swiper{

	&-nav{
		z-index: 200;
		display: flex;
	}
	&-button {
		&-next {
			margin-left: 6rem;
		}
	}
}
</style>