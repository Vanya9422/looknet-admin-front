<template lang="pug">
  form.modal-photo__row(ref="form" id="form-add-file")
    button-photo.add-photo__btn.w-100(
      :class="{error:error}"
      :multiple="multiple"
      :img="img" name="files[]" @change="changeFile")
      div {{img}}
      template(v-if="loading")
        loader(loaderType="white")
      template(v-else)
        div.add-photo__inner(v-if="!img") + Upload a photo
        div.add-photo__inner(v-else)
          img(:src="img")
</template>

<script>
export default {
  props: {
    img: {
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      error: false,
    }
  },
  methods: {
    changeFile(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped>

</style>