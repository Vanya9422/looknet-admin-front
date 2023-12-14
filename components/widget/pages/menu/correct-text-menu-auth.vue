<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Default Menu
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Menu List
            .correct-text__label.correct-text__label_small  Menu List
        .correct-text__column.correct-text__column_right
          .correct-text__field(v-for="(item,index) in content.menu" :key="'new'+index")
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 {{item.label}}
              .correct-text__label.correct-text__label_small.min-tablet-hidden  {{item.label}}
            form-input.correct-text__input(
              v-model="item.name"
              @input="$v.content.menu.$each[index].name.$touch()"
              :error="$v.content.menu.$each[index].name.$error"
            )

    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Menu bottom
            .correct-text__label.correct-text__label_small  Menu bottom
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Exit
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Exit
            form-input.correct-text__input(
              v-model="content.exit"
              @input="$v.content.exit.$touch()"
              :error="$v.content.exit.$error"
            )
    correct-text-save(@save="save()")

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {minLength, required} from "vuelidate/lib/validators";
import constructorPage from "@/mixins/constructorPage";

export default {
  data() {
    return {
      type: 'auth',
      id: null,
      content: {
        menu: [
          {
            icon: 'apps',
            mobileIcon: 'chatBorder',
            to: '/announcements',
            name: 'My advertises',
            label: 'My advertises'
          },
          {
            icon: 'plus',
            to: '/create-ad',
            name: 'Create Advertise',
            label: 'Create Advertise'
          },
          {
            icon: 'favorites',
            to: '/favorites-ad',
            name: 'Favorites ad',
            label: 'Favorites ad'
          },
          {
            icon: 'chat',
            to: '/chat',
            name: 'Chat',
            label: 'Chat'
          },
          {
            icon: 'bell',
            to: '/notifications',
            name: 'Notifications',
            label: 'Notifications',
            notif: true
          },
          {
            icon: 'setting',
            to: '/setting',
            name: 'Setting',
            label: 'Setting',
          },
          {
            icon: 'support',
            to: '/support',
            name: 'Support',
            label: 'Support',
          }
        ],
        exit: 'Exit',
      },
      loading: false
    }
  },
  validations: {
    content: {
      menu: {
        $each: {
          name: {required, minLength: minLength(3)}
        }
      },
      exit: {required, minLength: minLength(3)}
    }
  },
  mixins:[constructorPage],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
