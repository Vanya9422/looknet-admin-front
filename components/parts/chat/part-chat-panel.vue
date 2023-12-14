<template lang="pug">
	.chat-panel
		.chat-panel__row.flex.flex_vertical.flex_justify
			.chat-panel__column
				form-checkbox.chat-panel__select(checked light) 3 ad selected
			.chat-panel__column.flex.flex_vertical
				button-medium.chat-panel__btn(icon="delete" blue small) Delete
				button-medium.chat-panel__btn(icon="noneUser" blue small) Deactivate
				button-close.chat-panel__cancel(light @click.native="$emit('closePanel')")
</template>

<style lang="scss">
.chat-panel {
	background: $blue;
	color: #fff;
	padding: 13rem 10rem 13rem 20rem;
	border-radius: 18rem;
	position: sticky;
	bottom: 20rem;
	margin-left: 10rem;
	margin-right: 10rem;

	@include large-tablet {
		padding: 20rem;
	}

	&__btn {
		
	}
	&__cancel {
		margin-left: 10rem;
	}
}
</style>