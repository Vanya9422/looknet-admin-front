<template lang="pug">
	b-modal(
		id="form-contact" 
		size="form" 
		modal-class="form-contact" 
		body-class="form-contact__body" 
		header-class="form-contact__header"
		footer-class="form-contact__footer"
		centered 
		:hide-footer="true"
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		form(action="/support")
			h3.form-contact.h3 Need our help?
			.form-contact__fields
				.form-contact__field
					.form-contact__label.h4 Your name
					form-input.form-contact__input(placeholder="Alexander" name="name")
				.form-contact__field
					.form-contact__label.h4 E-mail
					form-input.form-contact__input(placeholder="example@gmail.com" name="email" type="email")
				.form-contact__field
					.form-contact__label.h4 Choose theme
					form-select.form-contact__select(value="How it works" name="theme" :items="['How it works', 'Theme 2', 'Theme 3']" default)
				.form-contact__field
					.form-contact__label.h4 Enter your question
					form-input.form-contact__input(placeholder="Tell us about the product" name="question" textarea)
			.form-contact__bottom.flex.flex_vertical.flex_justify
				.form-contact__buttons.flex
					button-primary.form-contact__btn-send(blue) Send form
					button-file.form-contact__btn-file
				form-checkbox.form-contact__checkbox I agree with rules of this system

</template>

<style lang="scss">
.form-contact{
	@include large-mobile {
		padding-left: 15px!important;
		.modal-content {
			padding-bottom: 40rem;
			border-radius: 15rem;
		}
		.modal-form {
			align-items: center;
		}
		.modal-dialog {
			align-items: center;
		}
	}
	&__field {
		margin-top: 40rem;

		@include large-mobile {
			margin-top: 20rem;
		}
	}
	&__label {
		margin-bottom: 15rem;

		@include large-mobile {
			margin-bottom: 10rem;
		}
	}
	&__bottom {
		margin-top: 40rem;

		@include large-mobile {
			margin-top: 30rem;
		}
	}

	&__btn {
		&-send {
			font-size: 14rem;
			font-weight: 400;
			min-width: 190rem;
		}
		&-file {
			margin-left: 10rem;
		}

		@include large-mobile {
			&-send {
				min-width: 160rem;
			}
		}
	}

	&__checkbox {
		@include large-mobile {
			margin-top: 20rem;
			width: 100%;
		}
	}
}
</style>