<template lang="pug">
  .correct-field
    .correct-field__drag.handle(v-if="drag")
      svg-icon(name="menu")
    form-input.correct-field__input(
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      @input="updateValue"
      :error="error"
    )
    button-primary.correct-field__btn(v-if="!disabled" gray icon="close" square @click.native.prevent="$emit('close')")

</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'name'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    drag: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    }
  },
}
</script>

<style lang="scss">
.correct-field {
  display: flex;

  &__input {
    width: 100%;
  }

  &__btn {
    margin-left: 10rem;
    flex-shrink: 0;

    @include large-mobile {
      margin-left: 6rem;
    }
  }

  &__drag {
    width: 29rem;
    min-width: 29rem;
    min-height: 100%;
    cursor: pointer;
    padding-right: 14rem;
    display: flex;
    align-items: center;
    stroke: $light-gray;
    stroke-width: 2;

    svg {
      height: 12rem;
    }
  }
}
</style>
