<template lang="pug">
  img(:src="src && src.original_full_url ? src.original_full_url : defaultImg " sizes="150w, 375w, 1024w, 1400w" :srcset="srcset")
</template>

<script>
export default {
  props: {
    src: {
      type: [Object,Array, String],
      default: () => ([])
    },
    defaultImg: {
      type: String,
      default: ''
    },

  },
  computed: {
    sizes() {
      return {
        small: 150,
        thumb: 375,
        medium: 1024,
        large: 1400,
      }
    },
    srcset() {
      if(this.src === null) return false;
      if(typeof this.src.conversion_urls === 'undefined') return false;
      if(this.src && Object.keys(this.src).length !== 0) return Object.entries(this.sizes)
          .map(([key, value]) => `${this.src.conversion_urls[key] || this.src.original_full_url} ${value}w`)
          .join(',')

    },
  }
}
</script>
