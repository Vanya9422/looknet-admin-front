<template lang="pug">
	.item-tariff(:class="Mods")
		.item-tariff__inner
			.item-tariff__body
				.item-tariff__img(v-if="img")
					img(:src="img")
				.item-tariff__head
					.item-tariff__title.h4 {{title}}
					.item-tariff__status(v-if="status") {{status}}
				.item-tariff__box
					.item-tariff__box-bg
						svg-icon(name="tariffRect")
					.item-tariff__box-wrap
						.item-tariff__price {{ numberWithSpaces(price) }} $
						.item-tariff__time {{time}}
				ul.item-tariff__list(v-if="list" :class="Mods")
					li.item-tariff__item(v-for="(item, i) in list" :key="i") {{item.text}}
				button-link-arrow.item-tariff__more(
					v-if="list.length > 3"
					more 
					small 
					@click.native="toggle"
					:class="Mods" 
					showText="More"
					hideText="Roll up"
				)
			.item-tariff__bottom
				button-primary.item-tariff__btn(border small v-b-modal.modal-thank @click.native="$bvModal.hide('modal-tariffs');")
					span.color-gray Choose

</template>

<script>
import {numberWithSpaces} from 'assets/js/functions';
export default{
	props: {
		img: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		price: {
			type: Number,
			default: 0
		},
		time: {
			type: String,
			default: "Pery month"
		},
		status: {
			type: String,
			default: ""
		},
		list: {
			type: Array,
			default: () => ([
			])
		},
		blue: {
			type: Boolean,
			default: false
		},
	},
	data(){
		return {
			numberWithSpaces,
			show: false,
		}		
	},
	computed: {
		Mods(){
			return {
				'isActive': this.show,
				'item-tariff_blue': this.blue,
			}
		}
	},
	methods: {
		toggle() {
			this.show = !this.show;
		},
	}
}
</script>

<style lang="scss">
.item-tariff{
	position: relative;
	border: 1px solid $light-gray;
	border-radius: 30rem;

	@include min-large-mobile {
		&_blue {
			background: $blue;
			color: #fff;
			.item-tariff {
				&__box {
					color: $blue;
					&-bg {
						fill: #fff;
					}
				}
				&__list {
					color: #fff;
				}
				&__more {
					svg {
						stroke: #fff;
					}
				}
				&__btn {
					border-color: #fff;
					background: none;
					color: #fff;
					.color-gray {
						color: #fff;
					}
				}
			}
		}
	}

	@include large-mobile {
		border-radius: 10rem;
	}

	&__status {
		display: none;
		margin-left: 10rem;
		height: 20rem;
		padding: 0 8rem;
		align-items: center;
		color: #fff;
		background: $blue;
		border-radius: 3px;
		font-size: 12rem;
		@include large-mobile {
			display: inline-flex;
		}
	}

	&__inner {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 30rem;
		@include large-mobile {
			padding: 0;
		}
	}
	&__body {
		flex: 1 1 auto;
		@include large-mobile {
			padding: 25rem 25rem 25rem 75rem;
		}
	}
	&__more {
		margin-top: 20rem;

		@include large-mobile {
			margin-top: 15rem;
		}
	}
	&__bottom {
		margin-top: 40rem;
		@include large-mobile {
			padding: 0 7rem 7rem 7rem;
			margin: 0;
		}
	}
	&__btn {
		width: 100%;

		@include large-mobile {
			border: 0;
			height: 45rem;
			background: $blue;
			color: #fff;
			.color-gray {
				color: #fff;
			}
		}
	}
	&__img {
		height: 65rem;
		img {
			max-height: 100%;
		}

		@include large-mobile {
			position: absolute;
			width: 43rem;
			height: auto;
			top: 29rem;
			left: 20rem;
		}
	}

	&__head {
		@include large-mobile {
			display: flex;
			align-items: center;
		}
	}
	&__title {
		margin-top: 23rem;
		font-weight: 600;
		max-width: 184rem;
		@include large-mobile {
			margin-top: 0;
			font-size: 16rem;
			max-width: none;
			font-family: 'Gilroy';
			letter-spacing: -0.04em;
		}
	}
	&__list {
		margin-top: 18rem;
		color: $gray;
		list-style: none;
		&.isActive {
			.item-tariff__item {
				&:not(:nth-child(-1n+3)) {
					display: block;
					animation: fadeIn .3s ease-in-out;
				}
			}
		}

		@include large-mobile {
			margin-top: 15rem;
			color: $default;
		}
	}
	&__item {
		position: relative;
		padding-left: 15rem;
		&:before {
			content: '\2022';
			position: absolute;
			left: 0;
			top: 0;
			font-size: 16rem;
			line-height: 1.1;
		}
		&:not(:first-child) {
			margin-top: 13rem;
		}
		&:not(:nth-child(-1n+3)) {
			display: none;
		}

		@include large-mobile {
			&:not(:first-child) {
				margin-top: 8rem;
			}
		}
	}
	&__box {
		width: 118rem;
		height: 118rem;
		position: absolute;
		right: 30rem;
		top: -26rem;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 12rem;
		color: #fff;
		&-bg {
			fill: $blue;
			stroke: $blue;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			svg {
				height: 100%;
			}
		}
		&-wrap {
			position: relative;
		}

		@include large-mobile {
			width: auto;
			height: auto;
			position: static;
			margin-top: 7rem;
			padding-bottom: 0;
			color: $default;
			text-align: left;
			display: block;
			&-bg {
				display: none;
			}
			&-wrap {
				display: flex;
				align-items: center;
			}
		}
	}

	&__time {
		font-size: 15rem;
		font-weight: normal;
		margin-top: 3rem;
		@include large-mobile {
			margin-top: 0;
			margin-left: 7rem;
			color: $gray;
			&:before {
				content: '/ ';
			}
		}
	}
	&__price {
		font-size: 32rem;
		font-weight: 600;

		@include large-mobile {
			font-size: 20rem;
		}
	}
}
</style>