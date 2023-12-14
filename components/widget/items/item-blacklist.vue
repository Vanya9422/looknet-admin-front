<template lang="pug">
	.item-blacklist
		.item-blacklist__row
			.item-blacklist__column.item-blacklist__column_left
				.item-blacklist__avatar
					img.object-fit(:src="require(`~/assets/img/${avatar}`)")
				.item-blacklist__info
					.item-blacklist__name.h4 {{name}}
					.item-blacklist__desc.p.color-gray(v-if="removed") Was removed from the list
			.item-blacklist__column.item-blacklist__column_right
				.item-blacklist__link.item-blacklist__link_removed.p.color-blue(v-if="removed")
					| Removed
					span  from the list
				.item-blacklist__link.p.color-blue(v-else @click="remove") Delete

</template>

<script>
export default {
	props: {
		avatar: {
			type: String,
			default: "User3.jpg"
		},
		name: {
			type: String,
			default: "Alexandr Bairamov"
		},
	},
	data(){
		return {
			removed: false
		}
	},
	methods: {
		remove(){
			this.removed = true
		}
	}
}
</script>

<style lang="scss">
.item-blacklist{
	&__row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&__column {
		&_left {
			display: flex;
			align-items: center;
		}
	}
	&__avatar {
		width: 58rem;
		height: 58rem;
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
		border-radius: 100%;

		@include large-mobile {
			width: 36rem;
			height: 36rem;
		}
	}
	&__name {
		font-family: 'Gilroy';
		font-weight: 500;
		margin-right: 40rem;

		@include small-tablet {
			margin-right: 20rem;
		}

		@include large-mobile {
			font-size: 16rem;
			line-height: 1;
			margin-right: 0;
			font-weight: 500;
		}
	}

	&__info {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-left: 23rem;
		@include large-mobile {
			display: block;
			margin-left: 10rem;
		}
	}
	&__desc {
		line-height: 1;
		margin-top: 3rem;
		@include large-mobile {
			margin-top: 5rem;
		}
	}
	&__link {
		cursor: pointer;
		white-space: nowrap;
		&_removed {
			cursor: text;
		}

		@include small-tablet {
			&_removed {
				span {
					display: none;
				}
			}
		}
	}
}
</style>