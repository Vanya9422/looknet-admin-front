<template lang="pug">
	b-modal(
		id="modal-create" 
		size="create-size" 
		modal-class="modal-create" 
		body-class="modal-create__body" 
		header-class="modal-create__header"
		footer-class="modal-create__footer"
		centered
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
			.modal-create__head.flex.flex_vertical.flex_justify
				.modal-create__title.h4 Choose category
				button-action.modal-create__head-btn(icon="search" text="Search" small gray @click.native="showSearch" v-if="search != true")
			transition(name="fade")
				form.modal-create__search(action="/#search" v-if="search")
					.modal-create__search-field
						form-input.modal-create__search-input(placeholder="Search" ref="InputSearch")
						button-action.modal-create__search-btn(icon="search" small gray)
						button-close.modal-create__search-clear(type="button" white)
					.modal-create__search-cancel(@click="closeSearch") Cancel
		.modal-create__categories
			.modal-create__categories-list.flex
				.modal-create__categories-item(v-for="(category, i) in categories" :key="i")
					button-category.modal-create__categories-btn(
						:img="category.img"
						:to="category.to"
						:text="category.text"
						:desc="category.desc"
						:border="category.border"
						v-b-modal.modal-create2
					)
			//.modal-create__step
				.modal-create__title.h4 Choose another category
				.modal-create__breadcrumbs.color-gray.p
					span.modal-create__breadcrumbs-item(v-for="(item, i) in breadcrumbs" :key="i")
						| {{item}}
				.modal-create__nav.flex.flex_vertical.flex_justify
					button-back.modal-create__back(small gray) Back
					transition(name="fade")
						button-action.modal-create__nav-btn(icon="search" text="Search" small gray @click.native="showSearch" v-if="search != true")
				transition(name="fade")
					form.modal-create__search(action="/#search" v-if="search")
						.modal-create__search-field
							form-input.modal-create__search-input(placeholder="Search" ref="InputSearch")
							button-action.modal-create__search-btn(icon="search" small gray)
							button-close.modal-create__search-clear(type="button" white)
						.modal-create__search-cancel(@click="closeSearch") Cancel
				.modal-create__categories
					.modal-create__categories-list.flex
						.modal-create__categories-item(v-for="(category, i) in categories2" :key="i")
							button-category.modal-create__categories-btn(
								:img="category.img"
								:to="category.to"
								:text="category.text"
								:desc="category.desc"
								:border="category.border"
							)
			//.modal-create__step
				part-form-create.modal-create__form(:breadcrumbs="breadcrumbs2")

		template(#modal-footer='{ close }')
			button-primary.modal-create__cancel(border @click.native='close()') Cancel
</template>

<script>
export default{
	data(){
		return {
			search: false,
			categories: [
				{
					img: "category__img1.png",
					text: 'Electronics',
					desc: 'Headphones'
				},
				{
					img: "category__img2.png",
					text: 'Appliances',
					desc: 'Headphones'
				},
				{
					img: "category__img3.png",
					text: 'Computers',
					desc: 'Headphones'
				},
				{
					img: "category__img4.png",
					text: 'Automotive products',
					desc: 'Headphones'
				},
				{
					text: 'Other category',
					border: true
				},
			],
		}
	},
	methods:{
		showSearch(){
			this.search = true
		},
		closeSearch(){
			this.search = false
		}
	}
}
</script>

<style lang="scss">
@import '~/assets/сss/components/modal-create.scss';
</style>