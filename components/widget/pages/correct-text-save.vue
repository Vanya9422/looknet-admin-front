<template lang="pug">
  .correct-text__bottom
    .correct-text__row.flex.flex_vertical
      .correct-text__column.correct-text__column_left
      .correct-text__column.correct-text__column_right.flex.flex_right
        button-primary.correct-text__bottom-btn(gray @click.prevent.native="$emit('cancel')") Cancel
        button-primary.correct-text__bottom-btn(blue :loading="LOADING" @click.prevent.native="$emit('save')") Save changes
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      LOADING: 'correctText/LOADING',
    })
  },
}
</script>
<style lang="scss">
.correct-text__body{
  padding-bottom: 70px;
  @include small-tablet {
    padding-bottom: 25px;
  }
  }
.back-sidebar{
  z-index: 3;
}
.correct-text__bottom{
  position: fixed;
  bottom: 0;
  right: 0;

  width: calc(100% - 210px);
  z-index: 1;
  background: #fff;
  padding: 10px;
  /* border-top: 1px solid #D2D2D7; */
  max-width: calc(1400px + 210px);
  @include small-tablet{
    padding: 10px 15px;
    bottom: 50px;
    width:100%;

  }
}

</style>