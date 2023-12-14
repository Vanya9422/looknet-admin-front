<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Default Menu
    .correct-text__section(v-for="(item,index) in content.menu" :key="'new'+index")
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  {{item.label}}
            .correct-text__label.correct-text__label_small  {{item.label}}
        .correct-text__column.correct-text__column_right
          .correct-text__field(v-for="(i,ind) in item.items" :key="'new-'+ind" )
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 {{i.label}}
              .correct-text__label.correct-text__label_small.min-tablet-hidden  {{i.label}}
            form-input.correct-text__input(
              v-model="i.text"
              @input="$v.content.menu.$each[index].items.$each[ind].text.$touch()"
              :error="$v.content.menu.$each[index].items.$each[ind].text.$error"
            )

    h3.correct-text__label.h3.tablet-hidden.border-top LoggedIn Menu
    .correct-text__section(v-for="(item,index) in content.menu1" :key="index")
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  {{item.label}}
            .correct-text__label.correct-text__label_small  {{item.label}}
        .correct-text__column.correct-text__column_right
          .correct-text__field(v-for="(i,ind) in item.items" :key="ind" )
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 {{i.label}}
              .correct-text__label.correct-text__label_small.min-tablet-hidden  {{i.label}}
            form-input.correct-text__input(
              v-model="i.text"
              @input="$v.content.menu1.$each[index].items.$each[ind].text.$touch()"
              :error="$v.content.menu1.$each[index].items.$each[ind].text.$error"
            )
            //@input="$
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Menu bottom
            .correct-text__label.correct-text__label_small  Menu bottom
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Lang
              .correct-text__label.correct-text__label_small.min-tablet-hidden  Lang
            form-input.correct-text__input(
              v-model="content.lang"
              @input="$v.content.lang.$touch()"
              :error="$v.content.lang.$error"
            )
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
      type: 'default',
      id: null,
      content: {
        menu: [
          {
            label: 'Auth List',
            items: [
              {
                label: 'Registration ',
                text: 'Registration ',
                to: '/auth/registration',
              },
              {
                label: 'Log in',
                text: 'Log in',
                to: '#',
                loginModal: true
              }
            ],
          },
          {
            label: 'Menu List',
            items: [
              {
                label: 'Contacts',
                text: 'Contacts',
                to: '/contacts',
                loginModal: false

              },
              {
                label: 'Support',
                text: 'Support',
                to: '/support',
                loginModal: false

              },
            ],
          },
        ],
        menu1: [
          {
            label: 'List',
            items: [
              {
                label: ' My advertises',
                text: ' My advertises',
                to: '/announcements',
              },
              {
                label: 'Creat advertise',
                text: 'Creat advertise',
                to: '/create-ad',
              },
              {
                label: 'Favorite ads',
                text: 'Favorite ads',
                to: '/favorites-ad',
              },
            ],
          },
          {
            label: 'List',
            items: [
              {
                label: 'Chat',
                text: 'Chat',
                to: '/chat',
              },
              {
                label: 'Notifications',
                text: 'Notifications',
                to: '/notifications',
              },
              {
                label: 'Setting',
                text: 'Setting',
                to: '/setting',
              },
            ],
          },
          {
            label: 'List',
            items: [
              {
                label: 'Support',
                text: 'Support',
                to: '/support',
              },
              {
                label: 'Contacts',
                text: 'Contacts',
                to: '/contacts',
              },
            ],
          }
        ],
        lang: 'Language change',
        exit: 'Exit',
      },
      loading: false
    }
  },
  validations: {
    content: {
      menu: {
        $each: {
          items: {
            $each: {
              text: {required, minLength: minLength(3)}
            }
          }
        }
      },
      menu1: {
        $each: {
          items: {
            $each: {
              text: {required, minLength: minLength(3)}
            }
          }
        }
      },
      lang: {required, minLength: minLength(3)},
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
