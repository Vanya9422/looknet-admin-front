<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    h3.correct-text__label.h3.tablet-hidden Default Menu
    correct-text-item(
      name="Title"
      title="Text"
      v-model="content.title"
      @input="$v.content.title.$touch()"
      :error="$v.content.title.$error"
    )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden  Menu List
            .correct-text__label.correct-text__label_small  Menu List
        .correct-text__column.correct-text__column_right
          .correct-text__field(v-for="(item,index) in content.menu" :key="'new'+index")
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Menu item
              .correct-text__label.correct-text__label_small.min-tablet-hidden Menu item
            form-input.correct-text__input(
              v-model="item.text"
              @input="$v.content.menu.$each[index].text.$touch()"
              :error="$v.content.menu.$each[index].text.$error"
            )
    correct-text-item(
      name="Language change"
      title="Text"
      v-model="content.lang"
      @input="$v.content.lang.$touch()"
      :error="$v.content.lang.$error"
    )
    correct-text-item(
      name="Log in to your profil"
      title="Text"
      v-model="content.log"
      @input="$v.content.log.$touch()"
      :error="$v.content.log.$error"
    )
    correct-text-item(
      name="Log in"
      title="Text"
      v-model="content.logIn"
      @input="$v.content.logIn.$touch()"
      :error="$v.content.logIn.$error"
    )
    correct-text-item(
      name="Register"
      title="Text"
      v-model="content.register"
      @input="$v.content.register.$touch()"
      :error="$v.content.register.$error"
    )
    correct-text-item(
      name="Exit"
      title="Text"
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
      type: 'mobile',
      id: null,
      content: {
        title:'Technical assistance',
        menu: [
          {
            text: 'My advertises',
            icon: 'chatBorder',
            isUser: true,
            to: '/announcements'
          }, {
            text: 'Chat',
            icon: 'chatBorder',
            isUser: true,
            to: '/chat'
          }, {
            text: 'Support',
            icon: 'support',
            to: '/support'
          }, {
            text: 'Contacts',
            icon: 'phone-1',
            to: '/contacts'
          },
        ],
        lang: 'Language change',
        log: 'Log in to your profile',
        logIn: 'Log in',
        register: 'Register',
        exit: 'Exit',
      },
      loading: false
    }
  },
  validations: {
    content: {
      menu: {
        $each: {
          text: {required, minLength: minLength(3)}
        }
      },
      title: {required, minLength: minLength(3)},
      lang: {required, minLength: minLength(3)},
      log: {required, minLength: minLength(3)},
      logIn: {required, minLength: minLength(3)},
      register: {required, minLength: minLength(3)},
      exit: {required, minLength: minLength(3)}
    }
  },
  mixins: [constructorPage],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
