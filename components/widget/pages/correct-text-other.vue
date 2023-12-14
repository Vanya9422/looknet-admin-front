+
<template lang="pug">
  div
    .correct-text__box.pt-0
      .correct-text__row.flex.flex_vertical
        .correct-text__column.correct-text__column_left
          .correct-text__label.h3 Part of web site
        .correct-text__column.correct-text__column_right
          .correct-text__column-buttons.flex.mobile-hidden
            button-primary.correct-text__column-btn(
              v-for="item in types" :key="item.id" border medium
            :active="type === item.code"
              @click.native.prevent="changeType(item.code)"
            ) {{item.name }}
          form-select.correct-text__select.mobile-visible(
            default
            :items="types"
            :value="value"
            @updateValue="updateValue"
          )
    .correct-text__body
      component(:is="showComponent" v-if="showComponent")

</template>

<script>
import { mapGetters} from "vuex";

export default {
  data() {
    return {
      types: [
        {
          "id": 1,
          "name": "Reset",
          "code": "reset"
        },
        {
          "id": 2,
          "name": "Confirm",
          "code": "confirm"
        },
        {
          "id": 3,
          "name": "Recovery",
          "code": "recovery"
        },
        {
          "id": 4,
          "name": "Register done",
          "code": "register-done"
        },
        {
          "id": 5,
          "name": "Password error",
          "code": "password-error"
        },
        {
          "id": 6,
          "name": "Footer",
          "code": "footer"
        },
        // {
        //   "id": 3,
        //   "name": "Mobile Menu",
        //   "code": "mobile"
        // },
      ],
      type: 'reset',
    }
  },
  computed: {
    ...mapGetters({
      CORRECT: 'correctText/CORRECT',
      PAGE: 'correctText/PAGE'
    }),
    showComponent() {
      return `correct-text-other-${this.type}`
    },
    value() {
      return this.types.find((item) => this.type === item.code)?.name || '';
    },
  },
  methods: {
    changeType(item) {
      this.type = item
    },
    updateValue(value) {
      const type = this.types.find((item) => value === item.name)?.code;
      this.changeType(type);
    },
  }
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
