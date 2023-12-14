<template lang="pug">
	b-modal(
		:id="id" 
		size="users" 
		modal-class="modal-panel" 
		body-class="modal-panel__body" 
		header-class="modal-panel__header"
		footer-class="modal-panel__footer"
		centered
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(v-if="!withoutClose" @click.native='closeModal()')
		h3.modal-panel__title.h3 {{ title }}
		.modal-panel__list
			slot
		template(#modal-footer='{ close }')
			button-border.modal-panel__cancel(gray @click.native='closeModal()') Cancel

</template>
<script>
export default{
	props: {
		title: {
			type: String,
			default: 'Select an action'
		},
		id: {
			type: String,
			default: 'modal-panel'
		},
    withoutClose:{
      type:Boolean,
      default:false
    }
	},
  methods:{
    closeModal(){
      this.$emit('close')
      this.$bvModal.hide(this.id)
    }
  }
}
</script>
<style lang="scss">
.modal-panel {
	padding: 0;
	.modal-content {
		padding: 25rem 15rem;
	}
	.modal__close {
		width: 34rem;
		height: 34rem;
	}

	&__title {
		font-weight: 600;
	}
	&__footer {
		padding: 0;
		border: 0;
		margin-top: 30rem;
	}

	&__btn {
		justify-content: flex-start;
		width: 100%;
	}

	&__list {
		margin-top: 23rem;
	}
	&__item {
		&:not(:first-child) {
			margin-top: 10rem;
		}
	}
	&__cancel {
		width: 100%;
	}
}
</style>