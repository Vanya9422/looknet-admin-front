<template lang="pug">
correct-text-item(:name="name")
  slot(name="prepend")
  .correct-text__field(v-for="(item, index) in value" :key="index")
    .correct-text__field
      .correct-text__field-head.flex.flex_vertical.flex_justify
        .correct-text__field-title.h4 {{ title }} {{ index + 1 }}
      part-correct-field.correct-text__input(
        v-model="value[index]"
        @close="remove(index)"
      )
  button-primary.correct-text__more(
    gray
    icon="plusBig"
    @click.prevent.native="add()"
  ) {{ addText }}
  slot(name="append")
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => ([]),
    },
    title: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    addText: {
      type: String,
      default: "One more",
    },
  },
  computed: {
    list: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    add() {
      this.list.push("");
    },
    remove(index) {
      this.list.splice(index, 1);
    },
  },
};
</script>
