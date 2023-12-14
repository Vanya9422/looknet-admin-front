  <template lang="pug">
	.add-avatar
		button-photo.add-avatar__btn(:img="img" :disabled="disabled" :error="error" :name="name" @change="(val) => this.$emit('change',val)")
		.add-avatar__info
			.add-avatar__title.b {{title}}
			.add-avatar__text.color-gray
				slot
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Add an avatar"
		},
		name: {
			type: String,
			default: ""
		},
		img: {
			type: String,
			default: ""
		},
		edit: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
    disabled: {
			type: Boolean,
			default: false
		},
	}
}
</script>

<style lang="scss">
.add-avatar{
	display: flex;
	align-items: center;
	font-size: 17rem;

	@include large-mobile {
		font-size: 16rem;
	}
	&__btn {
		margin-right: 30rem;

		@include large-mobile {
			margin-right: 26rem;
		}
	}

	&__info {
		max-width: 211rem;
	}
	&__text {
		margin-top: 10rem;
	}
}
</style>