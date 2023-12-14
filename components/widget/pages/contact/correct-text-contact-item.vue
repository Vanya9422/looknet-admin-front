<template lang="pug">
  .correct-text__section
    .correct-text__row.flex
      .correct-text__column.correct-text__column_left
        .correct-text__label.correct-text__label_small.tablet-hidden {{title}}
      .correct-text__column.correct-text__column_right
        .correct-text__field
          .correct-text__field-head.flex.flex_vertical.flex_justify
            .correct-text__field-title.h4 H2 header
            .correct-text__label.correct-text__label_small.min-tablet-hidden {{title}}
          form-input.correct-text__input(v-model="correct.title")
        .correct-text__box
          .correct-text__field(v-for="(item,index) in  correct.listLabels" :key="index")
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4  {{title}} type {{ index + 1 }}
              .correct-text__label.correct-text__label_small.min-tablet-hidden Phone
            form-input.correct-text__input(v-model="item.value")
        .correct-text__box
        .correct-text__field(v-for="(item,index) in  correct.list" :key="`list-${index}`")
          .correct-text__field-head.flex.flex_vertical.flex_justify
            .correct-text__field-title.h4 {{title}} {{index + 1}}
            .correct-text__checkboxes.flex.mobile-hidden(v-if="LANG === 'en' || LANG ===  ''")
              form-checkbox.correct-text__checkbox(
                v-for="(vItem,vIndex) in  correct.listLabels" :key="vIndex"
                :checked="vItem.id === item.label"
                @change="$emit('change',index, vItem.id)"
              )
                .p.color-gray {{vItem.value }}
          part-correct-field.correct-text__input( v-model="item.value" :disabled="LANG !== 'en'" @close=" $emit('delete',index)")
          .correct-text__checkboxes.flex.mobile-visible(v-if="LANG === 'en' || LANG ===  ''")
            form-checkbox.correct-text__checkbox(checked)
              .p.color-gray For customers
            form-checkbox.correct-text__checkbox
              .p.color-gray For cooperation
        button-primary.correct-text__more(v-if="LANG === 'en' || LANG ===  ''" gray icon="plusBig" @click.native.prevent="$emit('add')") One more

</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    title: {
      type: String,
      require: true
    },
    correct: {
      type: [Array, Object],
      require: true
    }
  },
  computed: {
    ...mapGetters({
      LANG: 'correctText/LANG',
    })
  },
  methods:{
    changeActive(){
    }
  }
}
</script>
