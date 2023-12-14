<template>
  <div class="textarea" :class="Mods">
    <textarea
      class="textarea__field"
      :maxlength="max"
      :name="name"
      :placeholder="placeholder"
      v-model="currentValue ? currentValue : value"
      :style="inputStyle"
      @keyup="resize()"
      @keydown.enter.exact.prevent="$emit('enter')"
      @input="changeInput"
    />
    <textarea
      class="textarea__field textarea__field_shadow"
      :maxlength="max"
      @input="changeInput"
      @keydown.enter.exact.prevent="$emit('enter')"
      v-model="currentValue"
      ref="shadow"
      tabindex="0"
    />
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    },
    big: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      currentValue: '',
      inputHeight: '0',
    }
  },
  computed: {
    Mods() {
      return {
        'textarea_small': this.small,
        'textarea_big': this.big,
        'input_error': this.error,
        'textarea_large': this.large
      }
    },
    inputStyle() {
      return {
        'min-height': this.inputHeight,
      }
    },
  },
  mounted() {
    this.resize()
  },
  methods: {
    changeInput(event) {
      this.currentValue = event.target.value
      let val = this.currentValue;
      let newValue = val.replace(/(<|>)/g, "");
      if (val !== newValue) {
        this.currentValue = newValue;
      }
      this.$emit('input',this.currentValue)
    },
    resize() {
      this.inputHeight = `${this.$refs.shadow.scrollHeight}px`
    },
  }
}
</script>

<style lang="scss">
.textarea {
  position: relative;
  &.input_error .textarea__field {
    border-color: $red;
  }
  &__field {
    width: 100%;
    height: 110rem;
    font-size: 17rem;
    font-weight: 500;
    font-family: 'Gilroy';
    padding: 0 10rem 0 20rem;
    border: 1px solid $light-gray;
    border-radius: 10rem;
    display: block;
    padding-top: 19rem;
    padding-bottom: 19rem;
    overflow: hidden;
    resize: vertical;

    &:focus {
      border-color: $blue;
    }

    &::placeholder {
      font-weight: 500;
      color: $gray;
    }

    &:disabled {
      border-color: transparent;
      background: #F4F3F4;
      color: #83929D;

      &::placeholder {
        color: #83929D;
      }
    }

    &_shadow {
      opacity: 0;
      position: absolute;
      visibility: hidden;
    }

    @include large-mobile {
      height: 90rem;
      font-size: 14rem;
      padding-top: 15rem;
      padding-bottom: 15rem;
    }
  }

  &_small {
    .textarea {
      &__field {
        height: 60rem;
      }
    }

    @include large-mobile {
      .textarea {
        &__field {
          height: 48rem;
        }
      }
    }
  }

  &_big {
    .textarea {
      &__field {
        height: 170rem;

        &::placeholder {
          white-space: pre-wrap;
        }
      }
    }
  }

  &_large {
    .textarea {
      &__field {
        height: 250rem;
      }
    }

    @include large-mobile {
      .textarea {
        &__field {
          height: 185rem;
        }
      }
    }
  }

}
</style>
