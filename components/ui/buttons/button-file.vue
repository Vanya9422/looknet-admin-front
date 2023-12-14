<template lang="pug">
	.button-file
		input.button-file__input(:name="name" :accept="accept" :value="value" ref="files" type="file" id="files" multiple @change="getFileObject")
		.button-file__wrap
			svg-icon(name="clip" viewBox="0 0 24 24")

</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: ''
		},
    accept: {
      type: String,
      default: false
    },
		name: {
			type: String,
			default: 'file'
		},
	},
  data() {
    return {
      files: []
    }
  },
  watch:{
    files(val){
      this.$emit('changeFiles',val)
    }
  },
  methods: {
    getFileObject() {
      const files = this.$refs.files.files
      let arr = []

      const readFile = (index) => {
        let item = {}
        if (index >= files.length) {
          this.files = arr
          return;
        }
        let file = files[index];
        let reader = new FileReader();
        reader.onload = function (e) {
          item.file = e.target.result
          item.name = file.name
          readFile(index + 1)
        }
        arr.push(item)

        reader.readAsDataURL(file);
      }
      readFile(0);
    },

  }
}
</script>

<style lang="scss">
.button-file{
	position: relative;
	display: inline-flex;
	width: 64rem;
	height: 60rem;
	cursor: pointer;

	&:hover {
		.button-file {
			&__wrap {
				border-color: $blue;
			}
		}
	}

	@include large-mobile {
		width: 50rem;
		height: 50rem;
	}

	&__input {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	&__wrap {
		width: 100%;
		height: 100%;
		border: 1px solid $light-gray;
		border-radius: 10rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: ease .15s;
		svg {
			width: 24rem;
			height: 24rem;
			fill: none;
			stroke: #9A9A9A;
			stroke-width: 1.5;
		}
	}
}
</style>