<template lang="pug">
	b-modal(
		id="modal-search" 
		size="search" 
		modal-class="modal-search" 
		body-class="modal-search__body" 
		header-class="modal-search__header"
		footer-class="modal-search__footer"
		centered 
		:hide-footer="true"
	)
	
		template(#modal-header='{ close }')
			form.modal-search__form(action="/#search")
				.modal-search__field
					form-input.modal-search__input(:placeholder="placeholder")
					button-action.modal-search__btn-search(icon="search")
					button-close.modal-search__clear(type="button")
				.modal-search__cancel-wrap
					.modal-search__cancel(@click='close()') Cancel
		.modal-search__container
			.modal-search__box
				.modal-search__box-title Categories
				.modal-search__list
					.modal-search__item(v-for="(category, i) in categories" :key="i")
						button-category.modal-search__link-category(
							:img="category.img"
							:to="category.to"
							:text="category.text"
							:counter="category.counter"
						)
			.modal-search__box
				.modal-search__box-title History
				.modal-search__list
					.modal-search__item(v-for="(item, i) in history" :key="i")
						NuxtLink.modal-search__link(to="#")
							span.modal-search__link-text {{item}}
							svg-icon.modal-search__link-arrow(name="arrowRight")
			.modal-search__box
				.modal-search__box-title Results
				.modal-search__list
					.modal-search__item(v-for="(item, i) in results" :key="i")
						NuxtLink.modal-search__link(to="#")
							span.modal-search__link-text {{item}}
							svg-icon.modal-search__link-arrow(name="arrowRight")
</template>

<script>
export default{
	props: {
		faqList: {
			type: Array,
			default: () => ([
			]),
		},
		placeholder: {
			type: String,
			default: "Search for ads"
		},
	},
	data(){
		const categories = [
			{
				counter: 274
			},
			{
				img: "category__img1.png",
				text: 'Electronics',
				counter: 123
			},
			{
				img: "category__img2.png",
				text: 'Appliances',
				counter: 8
			},
			{
				img: "category__img3.png",
				text: 'Computers',
				counter: 5
			},
			{
				img: "category__img4.png",
				text: 'Automotive products',
				counter: 3
			},
			{
				img: "category__img5.png",
				text: 'Sport',
				counter: 1
			},
		];
		const history = [
			'SLR Magic. Sony E. 25mm f1.4',
			'Xbox Series X',
			'SLR Magic. Sony E. 25mm f1.4',
			'SLR Magic. Sony E. 25mm f1.4',
		];
		const results = [
			'SLR Magic. Sony E. 25mm f1.4',
			'Xbox Series X',
			'SLR Magic. Sony E. 25mm f1.4',
			'SLR Magic. Sony E. 25mm f1.4',
		];
		return{
			categories,
			history,
			results
		}
	}
}
</script>

<style lang="scss">
.modal-search {
	padding: 0!important;
	.modal-content {
		border-radius: 15rem 15rem 0 0;
		padding: 16rem 15rem 0 15rem;
		display: flex;
		flex-direction: column;
		height: 80vh;
	}

	&__header {
		padding-bottom: 16rem;
		display: block;
	}

	&__body {
		flex: 1 1 auto;
		position: relative;
	}

	&__form {
		display: flex;
		width: 100%;
	}

	&__cancel {
		padding-left: 10rem;
		margin-left: 4rem;
		height: 100%;
		position: relative;
		color: #6A757C;
		display: flex;
		align-items: center;
	}

	.input {
		&__field {
			border-radius: 8rem;
			padding-left: 38rem;
			&:focus {
				border-width: 2px;
			}
		}
	}

	&__field {
		width: 100%;
		position: relative;
	}

	&__btn-search {
		position: absolute;
		left: 20rem;
		top: 50%;
		margin-top: -19rem;

		@include small-tablet {
			left: 2rem;
			margin-top: -20rem;
		}

		@include large-mobile {
			left: 5rem;
			margin-top: -18rem;
			svg {
				width: 14rem;
				height: 14rem;
			}
		}
	}

	&__clear {
		position: absolute;
		right: 15rem;
		top: 50%;
		margin-top: -14rem;
	}

	&__categories {
		margin: 20rem -15rem 0 -15rem;
		padding-top: 0;
		overflow: hidden;
		&-wrap {
			flex-wrap: nowrap;
			padding-left: 15rem;
			padding-right: 15rem;
			padding-bottom: 40px;
			margin-bottom: -40px;
			overflow-x: auto;
			overflow-y: hidden;
		}
	}

	&__category {
		margin: 0 10rem;
		width: 80rem;
		flex-shrink: 0;
		&:first-child {
			margin-left: 0
		}
		&:last-child {
			margin-right: 0;
		}
	}

	&__container {
		padding-top: 5rem;
	}

	&__box {
		&:not(:first-child) {
			margin-top: 27rem;
		}
		&-title {
			font-weight: 600;
			font-size: 16rem;
			line-height: 1.2;
		}
	}

	&__container {
		position: absolute;
		left: 0;
		top: 0;
		overflow-x: hidden;
		overflow-y: auto;
		padding-right: 30px;
		height: 100%;
		width: calc( 100% + 30px );
		padding-bottom: 20rem;
	}

	&__list {
		margin-top: 10rem;
	}

	&__item {
		border-bottom: 1px solid rgba(#C3C8CB, .5);
	}

	&__link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5rem 10rem 5rem 0;
		min-height: 46rem;
		color: #6A757C;
		font-size: 14rem;
		line-height: 1.2;
		&-category {
			min-height: 46rem;
		}
		&-arrow {
			width: 6rem;
		    height: 10rem;
		    fill: none;
		    stroke: #C3C8CB;
		    stroke-width: 1.5;
		    flex-shrink: 0;
		    margin-left: 10rem;
		}
	}
	
}
</style>