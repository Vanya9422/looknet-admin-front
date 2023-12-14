<template lang="pug">
	b-modal(
		id="modal-tariffs" 
		size="tariffs-size" 
		modal-class="modal-tariffs" 
		body-class="modal-tariffs__body" 
		header-class="modal-tariffs__header"
		footer-class="modal-tariffs__footer"
		centered 
		:hide-footer="true"
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		.modal-tariffs__container.css-scrollbar
			h3.modal-tariffs__title.h3 {{title}}
			.modal-tariffs__desc.color-gray.h4(v-html="desc") {{desc}}
			button-switcher.modal-tariffs__switcher(:items="switchers")
			.modal-tariffs__list.flex.flex_center
				item-tariff.modal-tariffs__item(
					v-for="(tariff, i) in tariffs"
					:key="i"
					:img="tariff.img"
					:title="tariff.title"
					:price="tariff.price"
					:time="tariff.time"
					:list="tariff.list"
					:status="tariff.status"
					:blue="tariff.blue"
				)

</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'The announcement is published!'
		},
		desc: {
			type: String,
			default: 'The first photo will be displayed in the search results, choose the most successful one'
		}
	},
	data(){

		return {
			switchers: [
				{
					value: 'Week',
					text: 'Week',
					checked: true
				},
				{
					value: 'Month',
					text: 'Month'
				}
			],
			tariffs: [
				{
					img: 'bomb.png',
					title: 'Up to 10 times more views',
					price: 228,
					time: 'Pery month',
					list: [
						'Your sales statistics',
						'Maximum calls and messages',
						'Your sales statistics',
						'Your sales statistics',
						'Maximum calls and messages',
						'Your sales statistics',
						'Maximum calls and messages',
					],
					status: 'Top'
				},
				{
					img: 'diamond.png',
					title: 'Up to 10 times more views',
					price: 299,
					time: 'Pery month',
					list: [
						'Your sales statistics',
						'Maximum calls and messages',
						'Your sales statistics',
						'Your sales statistics',
						'Maximum calls and messages',
						'Your sales statistics',
						'Maximum calls and messages',
					],
					blue: true,
					status: 'Top'
				},
				{
					img: 'bolt.png',
					title: 'Up to 10 times more views',
					price: 228,
					time: 'Pery month',
					list: [
						'Your sales statistics',
						'Maximum calls and messages',
						'Your sales statistics',
						'Your sales statistics',
						'Maximum calls and messages',
						'Your sales statistics',
						'Maximum calls and messages',
					],
					status: 'Top'
				},
			]
		}
	}
}
</script>

<style lang="scss">
.modal-tariffs {
	@include large-mobile {
		padding:0!important;
		.modal-content {
			padding: 30rem 15rem 0 15rem;
			border-radius: 10rem 10rem 0 0;
		}
	}
	&__title {
		text-align: center;
		@include large-mobile {
			max-width: 190rem;
			margin-left: auto;
			margin-right: auto;
			line-height: 1.2;
		}
	}
	&__desc {
		margin: 20rem auto 0 auto;
		max-width: 460rem;
		text-align: center;
		font-weight: normal;

		@include large-mobile {
			margin-top: 10rem;
			max-width: 300rem;
			line-height: 1.3;
		}
	}
	&__container {
		max-height: calc( 90vh - 110rem );
		overflow-x: hidden;
		overflow-y: auto;
		margin-right: -26rem;
		padding-right: 24rem;
		padding-bottom: 10rem;
		margin-bottom: -10rem;

		@include small-tablet {
			margin-right: -18rem;
			padding-right: 16rem;
		}

		@include large-mobile {
			padding-right: 18rem;
			margin-bottom: 0;
			padding-bottom: 30rem;
			max-height: calc( 90vh - 30rem );
			&::-webkit-scrollbar {
				width: 0;
			}
		}
	}
	&__switcher {
		max-width: 254rem;
		margin: 30rem auto 0 auto;

		@include large-mobile {
			margin-top: 20rem;
		}
	}

	&__list {
		margin: 0 -10rem;
		@include large-mobile {
			margin: 20rem 0 0 0;
		}
	}

	&__item {
		width: calc( 33.33% - 20rem );
		margin: 50rem 10rem 0 10rem;
		@include small-tablet {
			width: calc( 50% - 20rem );
		}

		@include large-mobile {
			width: 100%;
			margin: 0;
			&:not(:first-child) {
				margin-top: 13rem;
			}
		}
	}
}
</style>