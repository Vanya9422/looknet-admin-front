<template lang="pug">
	b-modal(
		:id="id" 
		size="statistic-size" 
		modal-class="modal-field" 
		body-class="modal-field__body" 
		header-class="modal-field__header"
		footer-class="modal-field__footer"
		centered 
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		h3.modal-field__title.h3 {{ title }}
		.modal-field__content
			slot
		template(#modal-footer='{ close }')
			button-primary.modal-field__btn(blue @click.native="closeModal") Save
</template>

<script>
export default{
	props: {
		id: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
	},
methods:{
  closeModal(){
    this.$bvModal.hide(`${this.id}`)
    this.$emit('save')
  }

}}

</script>

<style lang="scss">
.modal-field {
	.modal-content {
		padding: 25rem 15rem;
    min-height: 40vh;
	}
	@include large-mobile {
		padding: 0!important;
	}

	&__title {
		font-family: 'Atyp Display';
		font-weight: 500;
	}

	&__footer {
		border: 0;
		margin-top: 20rem;
	}

	&__btn {
		width: 100%;
	}

	&__list {
		margin-top: 25rem;
	}
	&__label {
		font-size: 16rem;
		font-weight: 600;
		margin-bottom: 10rem;
	}
	&__item {
		&:not(:first-child) {
			margin-top: 20rem;
		}
	}
}
</style>