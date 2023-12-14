<template lang="pug">
	b-modal(
		id="modal-create3" 
		size="create-size" 
		modal-class="modal-create" 
		body-class="modal-create__body" 
		header-class="modal-create__header"
		footer-class="modal-create__footer"
		centered
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		part-form-create.modal-create__form(:breadcrumbs="breadcrumbs")

		template(#modal-footer='{ close }')
			button-close.modal__close.modal__close_footer(@click.native='close()')
			.modal-create__footer-row.flex.flex_justify
				button-primary.modal-create__cancel.modal-create__cancel_desktop(border @click.native='close()') Cancel
				.modal-create__footer-buttons.flex
					button-primary.modal-create__footer-btn(gray v-b-modal.modal-tariffs @click.native="$bvModal.hide('modal-create3');") Save as Draft
					button-primary.modal-create__footer-btn(blue v-b-modal.modal-tariffs @click.native="$bvModal.hide('modal-create3');") Publish now
</template>

<script>
export default{
	data(){
		return {
			breadcrumbs: [
				'Creat Advertise',
				'Electronics',
				'Headphones'
			]
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