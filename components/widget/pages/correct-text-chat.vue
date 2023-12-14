<template lang="pug">
  form#correct-text__section-form.correct-text__section-list(v-if="loading" :key="key")
    //- h3.correct-text__label.h3.tablet-hidden Content
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Content
            .correct-text__label.correct-text__label_small Content
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
            form-input.correct-text__input(
              v-model="content.title"
              @input="$v.content.title.$touch()"
              :error="$v.content.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 No messages
            form-input.correct-text__input(
              v-model="content.noMessages"
              @input="$v.content.noMessages.$touch()"
              :error="$v.content.noMessages.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Not have notifications
            form-input.correct-text__input(
              v-model="content.notHaveNotifications"
              @input="$v.content.notHaveNotifications.$touch()"
              :error="$v.content.notHaveNotifications.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Nav
            .correct-text__label.correct-text__label_small Nav
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Resell
            form-input.correct-text__input(
              v-model="content.nav[0].text"
              @input="$v.content.nav.$each[0].text.$touch()"
              :error="$v.content.nav.$each[0].text.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Buying
            form-input.correct-text__input(
              v-model="content.nav[1].text"
              @input="$v.content.nav.$each[1].text.$touch()"
              :error="$v.content.nav.$each[1].text.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Support
            form-input.correct-text__input(
              v-model="content.nav[2].text"
              @input="$v.content.nav.$each[2].text.$touch()"
              :error="$v.content.nav.$each[2].text.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Users Adds
            .correct-text__label.correct-text__label_small Users Adds
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Phone
            form-input.correct-text__input(
              v-model="content.usersAdds.phone"
              @input="$v.content.usersAdds.phone.$touch()"
              :error="$v.content.usersAdds.phone.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Еmail confirmed
            form-input.correct-text__input(
              v-model="content.usersAdds.emailConfirmed"
              @input="$v.content.usersAdds.emailConfirmed.$touch()"
              :error="$v.content.usersAdds.emailConfirmed.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Body
            .correct-text__label.correct-text__label_small Body
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 For your safety
            form-input.correct-text__input(
              v-model="content.body.forYourSafety"
              @input="$v.content.body.forYourSafety.$touch()"
              :error="$v.content.body.forYourSafety.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Close
            form-input.correct-text__input(
              v-model="content.body.close"
              @input="$v.content.body.close.$touch()"
              :error="$v.content.body.close.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Waiting for answer
            form-input.correct-text__input(
              v-model="content.body.waitingForAnswer"
              @input="$v.content.body.waitingForAnswer.$touch()"
              :error="$v.content.body.waitingForAnswer.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Block
            form-input.correct-text__input(
              v-model="content.body.block"
              @input="$v.content.body.block.$touch()"
              :error="$v.content.body.block.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Unblock
            form-input.correct-text__input(
              v-model="content.body.unblock"
              @input="$v.content.body.unblock.$touch()"
              :error="$v.content.body.unblock.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Complaint
            form-input.correct-text__input(
              v-model="content.body.complaint"
              @input="$v.content.body.complaint.$touch()"
              :error="$v.content.body.complaint.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Delete chat
            form-input.correct-text__input(
              v-model="content.body.delete"
              @input="$v.content.body.delete.$touch()"
              :error="$v.content.body.delete.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Form
            .correct-text__label.correct-text__label_small Form
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Placeholder
            form-input.correct-text__input(
              v-model="content.form.placeholder"
              @input="$v.content.form.placeholder.$touch()"
              :error="$v.content.form.placeholder.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Selected
            form-input.correct-text__input(
              v-model="content.form.selected"
              @input="$v.content.form.selected.$touch()"
              :error="$v.content.form.selected.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Panel
            .correct-text__label.correct-text__label_small Panel
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Selected
            form-input.correct-text__input(
              v-model="content.panel.selected"
              @input="$v.content.panel.selected.$touch()"
              :error="$v.content.panel.selected.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Sidebar
            .correct-text__label.correct-text__label_small Sidebar
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Contact
            form-input.correct-text__input(
              v-model="content.sidebar.contact"
              @input="$v.content.sidebar.contact.$touch()"
              :error="$v.content.sidebar.contact.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Select all
            form-input.correct-text__input(
              v-model="content.sidebar.selectAll"
              @input="$v.content.sidebar.selectAll.$touch()"
              :error="$v.content.sidebar.selectAll.$error"
            )
    //- .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Table
            .correct-text__label.correct-text__label_small Table
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Title
            form-input.correct-text__input(
              v-model="content.table.title"
              @input="$v.content.table.title.$touch()"
              :error="$v.content.table.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Description
            form-input.correct-text__input(
              v-model="content.table.description"
              @input="$v.content.table.description.$touch()"
              :error="$v.content.table.description.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Status
            form-input.correct-text__input(
              v-model="content.table.status"
              @input="$v.content.table.status.$touch()"
              :error="$v.content.table.status.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Date
            form-input.correct-text__input(
              v-model="content.table.date"
              @input="$v.content.table.date.$touch()"
              :error="$v.content.table.date.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Delete
            .correct-text__label.correct-text__label_small Delete
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Are you shure
            form-input.correct-text__input(
              v-model="content.delete.areYourShure"
              @input="$v.content.delete.areYourShure.$touch()"
              :error="$v.content.delete.areYourShure.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Complaint
            .correct-text__label.correct-text__label_small Complaint
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Select the type of complaint
            form-input.correct-text__input(
              v-model="content.complaint.type"
              @input="$v.content.complaint.type.$touch()"
              :error="$v.content.complaint.type.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Your comment
            form-input.correct-text__input(
              v-model="content.complaint.comment"
              @input="$v.content.complaint.comment.$touch()"
              :error="$v.content.complaint.comment.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Placeholder
            form-input.correct-text__input(
              v-model="content.complaint.placeholder"
              @input="$v.content.complaint.placeholder.$touch()"
              :error="$v.content.complaint.placeholder.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Send
            form-input.correct-text__input(
              v-model="content.complaint.send"
              @input="$v.content.complaint.send.$touch()"
              :error="$v.content.complaint.send.$error"
            )
    .correct-text__section
      .correct-text__row.flex
        .correct-text__column.correct-text__column_left
          .correct-text__section-head.flex.flex_vertical.flex_justify
            .correct-text__label.h4.min-tablet-hidden Safety
            .correct-text__label.correct-text__label_small Safety
        .correct-text__column.correct-text__column_right
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 For your safety
            form-input.correct-text__input(
              v-model="content.safety.title"
              @input="$v.content.safety.title.$touch()"
              :error="$v.content.safety.title.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Message 1
            form-input.correct-text__input(
              v-model="content.safety.message1"
              @input="$v.content.safety.message1.$touch()"
              :error="$v.content.safety.message1.$error"
            )
          .correct-text__field
            .correct-text__field-head.flex.flex_vertical.flex_justify
              .correct-text__field-title.h4 Message 2
            form-input.correct-text__input(
              v-model="content.safety.message2"
              @input="$v.content.safety.message2.$touch()"
              :error="$v.content.safety.message2.$error"
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
      loading: false,
      id: null,
      content: {
        title: 'Messages',
        noMessages: 'No Message',
        notHaveNotifications: 'You have not Notifications',
        nav: [
          {
            text: 'Resell',
            to: '/chat?tab=resell',
          },
          {
            text: 'Buying',
            to: '/chat?tab=buying',
          },
          {
            text: 'Support',
            to: '/chat?tab=support',
          },
        ],
        usersAdds: {
          phone: "Phone",
          emailConfirmed: "Еmail confirmed",
        },
        body: {
          forYourSafety: "For your safety",
          close: "Close chat",
          waitingForAnswer: "Waiting for answer",
          block: "Block",
          unblock: "Unblock",
          complaint: "Complaint",
          delete: "Delete the Chat",
        },
        form: {
          placeholder: "Enter your message",
          selected: "Selected",
        },
        panel: {
          selected: "selected",
        },
        sidebar: {
          contact: "A pleasure to contact with you ...",
          selectAll: "Select all",
        },
        // table: {
        //   title: 'Title',
        //   description: 'Description',
        //   status: 'Status',
        //   date: 'Date',
        // },
        delete: {
          areYourShure: "Are you shure?",
        },
        complaint: {
          type: "Select the type of complaint",
          comment: "Your comment",
          placeholder: "Your comment",
          send: "Send",
        },
        safety: {
          title: "For your safety",
          message1: "Pick it up from the pick-up point before 21:00 on Thursday, January 27, then the order will have to be canceled. Entering the pick—up point only with a mask and gloves - this will help.",
          message2: "Pick it up from the pick-up point before 21:00 on Thursday, January 27, then the order will have to be canceled. Entering the pick—up point only with a mask and gloves - this will help.",
        }
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      noMessages: {required, minLength: minLength(2)},
      notHaveNotifications: {required, minLength: minLength(2)},
      nav: {
        $each: {
          text: {required, minLength: minLength(2)},
        },
      },
      usersAdds: {
        phone: {required, minLength: minLength(2)},
        emailConfirmed: {required, minLength: minLength(2)},
      },
      body: {
        forYourSafety: {required, minLength: minLength(2)},
        close: {required, minLength: minLength(2)},
        waitingForAnswer: {required, minLength: minLength(2)},
        block: {required, minLength: minLength(2)},
        unblock: {required, minLength: minLength(2)},
        complaint: {required, minLength: minLength(2)},
        delete: {required, minLength: minLength(2)},
      },
      form: {
        placeholder: {required, minLength: minLength(2)},
        selected: {required, minLength: minLength(2)},
      },
      panel: {
        selected: {required, minLength: minLength(2)},
      },
      sidebar: {
        contact: {required, minLength: minLength(2)},
        selectAll: {required, minLength: minLength(2)},
      },
      // table: {
      //   title: {required, minLength: minLength(2)},
      //   description: {required, minLength: minLength(2)},
      //   status: {required, minLength: minLength(2)},
      //   date: {required, minLength: minLength(2)},
      // },
      delete: {
        areYourShure: {required, minLength: minLength(2)},
      },
      complaint: {
        type: {required, minLength: minLength(2)},
        comment: {required, minLength: minLength(2)},
        placeholder: {required, minLength: minLength(2)},
        send: {required, minLength: minLength(2)},
      },
      safety: {
        title: {required, minLength: minLength(2)},
        message1: {required, minLength: minLength(2)},
        message2: {required, minLength: minLength(2)},
      }
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
