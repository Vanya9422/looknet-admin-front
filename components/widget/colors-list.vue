<template lang="pug">
  .colors__list
    .colors__item(
      v-for="(item,index) in colors"
      :key="index"
      :class="{active:item.color === activeColor}"
      @click="$emit('change',item.color)"
    )
      span(:style="`background:${item.color}`")
    .colors__item(:class="{active:color === activeColor}" )
      button(name="profileMenu")
        svg-icon(name="edit")
      tippy.tippy-tooltip-test(placement="bottom-start"  trigger="click")
        sketch-picker(v-model="color")
      //tippy.tippy-hide.tippy-tooltip-test(to="profileMenu" placement="bottom-start")
      //client-only
      //  sketch-picker(v-model="color")

</template>

<script>
import {Sketch} from 'vue-color'

export default {
  props: {
    colors: {
      type: Array,
      default: []
    },
    activeColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      color: '#f00',
      isShow: false,
    }
  },
  components: {
    'sketch-picker': Sketch
  },
  watch:{
    color(){
      this.$emit('change',this.color.hex)
    }
  }
}
</script>

<style lang="scss" scoped>
.colors {
  &__list {
    display: flex;
    gap: 10px;
    margin: 15px 0 30px;
    position: relative;
  }

  &__item {
    border: 1px solid #D2D2D7;
    border-radius: 10px;
    padding: 4px;
    width: 60px;
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.active {
      border-color: $blue;
    }

    span {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }

    button {
      background: transparent;
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
    }

    svg {
      width: 18px;
      height: 18px;
      fill: #9A9A9A;
    }
  }
}


</style>

<style lang="scss">
.vc-sketch {
  border-radius: 20px !important;
  border: 0 !important;
  box-shadow: none !important;
  padding: 8px !important;
  &-saturation-wrap {
    border-radius: 14px;
  }
}

.tippy-tooltip {
  padding: 0px !important;
  border-radius: 20px;
  border: 1px solid #D2D2D7;
}
</style>