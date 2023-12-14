<template lang="pug">
	form.chat-search(action="/")
		form-input.chat-search__input(:placeholder="placeholder" name="search" :value="value")
		button.chat-search__btn
			svg-icon(name="search")
		button.chat-search__clear(type="button")
			svg-icon(name="closeBig")
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: "Serach"
		},
		value: {
			type: String,
			default: ""
		},
	},
}
</script>

<style lang="scss">
.chat-search {
	position: relative;
	&__input {
		.input {
			&__field {
				padding-left: 53rem;
			}
		}

		@include large-mobile {
			.input {
				&__field {
					padding-right: 35rem;
					padding-left: 38rem;
				}
			}
		}
	}
	&__btn {
		cursor: pointer;
		background: none;
		border: 0;
		width: 17rem;
		height: 17rem;
		position: absolute;
		left: 22rem;
		top: 50%;
		margin-top: -8rem;
		fill: $gray;
		svg {
			width: 100%;
			height: 100%;
		}

		@include large-mobile {
			width: 14rem;
			height: 14rem;
			left: 15rem;
			margin-top: -7rem;
		}
	}

	&__clear {
		width: 30rem;
		height: 30rem;
		position: absolute;
		right: 8rem;
		top: 50%;
		margin-top: -15rem;
		border: 0;
		background: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		svg {
			width: 13rem;
			height: 13rem;
			fill: $gray;
		}

		@include min-large-mobile {
			display: none;
		}
	}
}
</style>