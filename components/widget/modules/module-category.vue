<template lang="pug">
	.module-category(:class="Mods" @click="$emit('open')")
		.module-category__wrap
			div(@click.stop="")
				form-checkbox.module-category__checkbox(v-if="icon === 'camera'" :checked="checked"  @change.native="$emit('checked')")
			.module-category__img(v-if="img"  )
				img(:src="img")
			.module-category__img.module-category__img_photo(v-if="btn")
				svg-icon(:name="icon")
			.module-category__text.p(v-if="name")
				span.module-category__name {{name}} 
				span.module-category__counter ({{counter}})
			.module-category__text.p.color-blue(v-if="btn") Add category
		.module-category__icon.module-category__icon_plus(v-if="btn" @click.stop="")
			svg-icon(name="plusBig")
		.module-category__icon.handle.c-move(v-else @click.stop="")
			svg-icon(name="burger")
</template>

<script>
export default {
	props: {
		img: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: ""
		},
		counter: {
			type: Number,
			default: null
		},
		btn: {
			type: Boolean,
			default: false
		},
    	checked: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String,
			default: "camera"
		}
	},
	computed: {
		Mods(){
			return {
				'module-category_btn': this.btn
			}
		}
	}
}
</script>

<style lang="scss">
.module-category{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5rem 25rem 5rem 15rem;
	border-radius: 6rem;
	transition: ease .1s;
	cursor: pointer;
	min-height: 60rem;
	&_btn {
		.module-category {
			&__checkbox {
				visibility: hidden;
			}
		}
	}
	&__name {
		overflow-wrap: anywhere;
	}
  &.active,
	&:hover {
		background: #F5F7FB;
	}
	&__wrap {
		display: flex;
		align-items: center;
    padding-right: 10px;
	}
	&__counter {
		color: #9A9A9A;
	}

	&__icon {
		flex-shrink: 0;
		width: 15rem;
		height: 12rem;
		stroke: #9A9A9A;
		stroke-width: 2;
		&_plus {
			width: 15rem;
			height: 15rem;
			stroke: none;
			fill: $blue;
		}
		svg {
			height: 100%;
		}
	}

	&__checkbox {
		margin-right: 15rem;
		.checkbox__text {
			display: none;
		}
	}

	&__img {
		width: 50rem;
		height: 50rem;
		background: #F2F4F5;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 4px;
		flex-shrink: 0;
		margin-right: 15rem;
		img {
			max-height: 100%;
		}
		&_photo {
			background: $blue;
			fill: #fff;
			svg {
				width: 16rem;
				height: 16rem;
			}
		}
	}
}
.c-move{
  cursor: move;
}
</style>