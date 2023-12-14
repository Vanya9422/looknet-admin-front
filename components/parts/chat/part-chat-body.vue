<template lang="pug">
.chat-body
  .chat-body__top(v-if="bodyTopData")
    .chat-body__row.flex.flex_justify.flex_vertical
      .chat-body__column.chat-body__column_left
        component.chat-body__back(
          :is="to !== '' ? 'NuxtLink' : 'div'",
          :to="to !== '' ? to : false",
          @click="showSidebar"
        )
          svg-icon(name="prev")
        item-chat(
          v-b-modal.users-adds,
          :avatar="avatar",
          :name="name",
          :desc="desc",
          :time="time"
        )
          | {{ text }}
      .chat-body__column.chat-body__column_right.flex(v-if="moderator")
        .chat-body__buttons.flex
          <!--button-primary.chat-body__btn.mobile-hidden(gray)-->
          <!--span.color-gray Close chat 1-->
          button-primary.chat-body__btn(
            v-if="parseInt($route.params.status) === STATUS_NEW && appeal.user",
            @click.native.prevent="apply",
            blue
          ) Apply
          button-primary.chat-body__btn(
            v-if="parseInt($route.params.status) === STATUS_NEW && !appeal.user",
            @click.native.prevent="closeTicket",
            blue
          ) Close
          part-another-manager.d-flex.mobile-hidden(
            v-if="parseInt($route.params.status) === STATUS_EXPECTATION",
            :is_closed="bodyTopData.status",
            @closeOrViewed="closeOrViewed"
          )
            //- button-primary.chat-body__btn-manager.pl-0(v-if="parseInt($route.params.status) === STATUS_EXPECTATION" icon="essential" v-b-modal.modal-another-manager) Another manager
            //- button-primary.chat-body__btn.button-primary_border-primary(v-if="parseInt($route.params.status) === STATUS_EXPECTATION" v-click-outside="close" @click.native.prevent="isActive = !isActive") Close Chat
            //-   .select__arrow.d-inline-flex
            //-     svg-icon(name="arrowDown" viewBox="0 0 11 7")
            //-   transition(name="DropDown")
            //-     .dropdown-menu.d-block( v-if="isActive")
            //-       .dropdown-list
            //-         .dropdown-item(v-for="item in items" :key="item.text")
            //-           button-primary(@click.native.prevent="closeOrViewed(item.value)") {{item.text}}

          button-medium.chat-body__more(
            icon="dotsRotate",
            white,
            square,
            v-b-modal.modal-action,
            v-if="parseInt($route.params.status) === STATUS_EXPECTATION"
          )
      .chat-body__column.chat-body__column_right.flex(v-else)
        .chat-body__buttons.flex
          button-medium.chat-body__btn(
            gray,
            icon="infoCircle",
            v-b-modal.modal-safety
          )
            span.p For your safety
          button-medium.chat-body__btn.mobile-hidden(
            gray,
            square,
            icon="dots",
            name="chatAction"
          )
          button-medium.chat-body__btn.mobile-visible(
            gray,
            square,
            icon="dots",
            v-b-modal.modal-action
          )
        tippy.tippy-hide(
          to="chatAction",
          placement="bottom-end",
          trigger="click"
        )
          .chat-body__action
            .chat-body__action-item
              button-medium.chat-body__action-btn(white) Block
            .chat-body__action-item
              button-medium.chat-body__action-btn(white) Complaint
            .chat-body__action-item
              button-medium.chat-body__action-btn(white) Delete the Chat
  .chat-body__container
    .chat-body__container-wrap.css-scrollbar(@scroll="onScroll", ref="infoBox")
      infinite-loading(
        :distance="20",
        :direction="'top'",
        :identifier="GET_CONVERSATION_MESSAGES_IDENTIFIER",
        @infinite="infinite"
      )
        div(slot="no-results")
        div(slot="no-more")
        div(slot="spinner")
      .chat-body__section(
        v-for="(message, i) in messages",
        :key="i",
        v-if="!isNewOrClose"
      )
        .chat-body__date(v-if="message.date")
          .chat-body__date-text {{ message.date }}
        .chat-body__list
          item-chat-message.chat-body__item(
            v-if="isExpectationOrViewed",
            v-for="(item, i) in message.messages",
            :key="i",
            :avatar="item.participation && item.participation.messageable.avatar ? item.participation.messageable.avatar.original_url : ''",
            :name="item.participation ? item.participation.messageable.first_name : ''",
            :time="item.send_time.toLowerCase()",
            :content="[{ text: item.body, read: item.read_at ? true : false }]",
            :answer="item.answer",
            :messageable_id="item.participation ? item.participation.messageable_id : 0",
            :gallery="item.files"
          )
          item-chat-message.chat-body__item(
            v-if="isExpectationOrViewed && !bodyTopData.status",
            chat-end,
            :time="bodyTopData ? generateDate(bodyTopData.updated_at) : ''",
            :avatar="bodyTopData.participants && bodyTopData.participants.messageable.avatar ? bodyTopData.participants.messageable.avatar.original_full_url : ''",
            name="Emkin web site",
            :content="[{ text: `This chat closed by ${bodyTopData.participants ? bodyTopData.participants.messageable.first_name : ''}!`, read: false }]"
          )

      .chat-body__section(v-if="isNewOrClose")
        .chat-body__list
          item-chat-message.chat-body__item(
            :avatar="appeal.user && appeal.user.avatar ? appeal.user.avatar.original_full_url : ''",
            :name="appeal.user ? appeal.user.first_name : 'Ghost'",
            :time="generateDate(appeal.created_at)",
            :content="[{ text: appeal.description }]",
            :gallery="appeal.files"
          )
  .chat-body__bottom
    part-chat-form.chat-body__form(
      v-if="isExpectationOrViewed && bodyTopData.status",
      :files="files"
    )

  modal-users-adds(v-if="messageable_id", :userId="messageable_id")

  modal-action(title="The ad is activated")
    part-another-manager(
      v-if="parseInt($route.params.status) === STATUS_EXPECTATION",
      @closeOrViewed="closeOrViewed"
    )
  modal-another-manager
</template>

<script>
import ClickOutside from "vue-click-outside";
import moment from "moment";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    avatar: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    moderator: {
      type: Boolean,
      default: false,
    },
    isExpectationOrViewed: {
      type: Boolean,
      default: false,
    },
    isNewOrClose: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    active_ticket_id: {
      type: Number,
      default: 0,
    },
    messageable_id: {
      type: Number,
      default: 0,
    },
    messages: {
      type: Array,
      default: () => [],
    },
    appeal: {
      type: [Array, Object],
      default: () => [],
    },
  },
  data() {
    return {
      files: [
        {
          img: "create-gallery__img5_small.jpg",
        },
        {
          img: "create-gallery__img1_small.jpg",
        },
        {
          img: "create-gallery__img2_small.jpg",
        },
        {
          name: "Macbook pro 2016 4k",
          size: "73КБ",
        },
      ],
      items: [
        {
          text: "Close chat",
          value: "close",
        },
        {
          text: "Viewed",
          value: "viewed",
        },
      ],
      isActive: false,
    };
  },
  watch: {
    lastMessageOfList(newVal, oldVal) {
      if (newVal) {
        this.matchHeight(newVal);
      }
    },
  },
  computed: {
    ...mapGetters({
      ACTIVE_THEME_ID: "support_chat/ACTIVE_THEME_ID",
      GET_ACTIVE_CONVERSATION_ID: "support_chat/GET_ACTIVE_CONVERSATION_ID",
      GET_ACTIVE_TICKET_ID: "support_chat/GET_ACTIVE_TICKET_ID",
      STATUS_EXPECTATION: "support_chat/STATUS_EXPECTATION",
      STATUS_NEW: "support_chat/STATUS_NEW",
      GET_CONVERSATION_MESSAGES_IDENTIFIER:
        "support_chat/GET_CONVERSATION_MESSAGES_IDENTIFIER",
      CHAT_TOP_USER_DATA: "support_chat/CHAT_TOP_USER_DATA",
    }),
    lastMessageOfList: {
      get() {
        let lastMessageOfList = this.$collect(this.messages).last()
          ? this.$collect(this.$collect(this.messages).last().messages).last()
          : null;
        this.SET_LAST_MESSAGE_OF_LIST(lastMessageOfList);
        return lastMessageOfList;
      },
      set() {
        this.SET_LAST_MESSAGE_OF_LIST_MAKE_SEEN();
      },
    },
    bodyTopData: {
      get() {
        return this.CHAT_TOP_USER_DATA;
      },
    },
  },
  methods: {
    ...mapActions({
      APPLY: "support_chat/APPLY",
      CLOSE_OR_VIEWED: "support_chat/CLOSE_OR_VIEWED",
    }),
    ...mapMutations({
      SET_CHAT_USERS_LIST: "support_chat/SET_CHAT_USERS_LIST",
      SET_CHAT_USERS_PAGE: "support_chat/SET_CHAT_USERS_PAGE",
      SET_ACTIVE_CONVERSATION_ID: "support_chat/SET_ACTIVE_CONVERSATION_ID",
      SET_ACTIVE_TICKET_ID: "support_chat/SET_ACTIVE_TICKET_ID",
      SET_USERS_CHAT_SIDEBAR_IDENTIFIER:
        "support_chat/SET_USERS_CHAT_SIDEBAR_IDENTIFIER",
      DELETE_USER_FROM_SIDEBAR: "support_chat/DELETE_USER_FROM_SIDEBAR",
      DELETE_TICKET_FROM_SIDEBAR: "support_chat/DELETE_TICKET_FROM_SIDEBAR",
      DECREMENT_TICKET_TOTAL: "support_chat/DECREMENT_TICKET_TOTAL",
      SET_LAST_MESSAGE_OF_LIST: "support_chat/SET_LAST_MESSAGE_OF_LIST",
      SET_LAST_MESSAGE_OF_LIST_MAKE_SEEN:
        "support_chat/SET_LAST_MESSAGE_OF_LIST_MAKE_SEEN",
      RESET_UNREAD_MESSAGES: "support_chat/RESET_UNREAD_MESSAGES",
      SET_CONVERSATION_MESSAGES_PAGE:
        "support_chat/SET_CONVERSATION_MESSAGES_PAGE",
      SET_CONVERSATION_MESSAGES: "support_chat/SET_CONVERSATION_MESSAGES",
      SET_CONVERSATION_MESSAGES_IDENTIFIER:
        "support_chat/SET_CONVERSATION_MESSAGES_IDENTIFIER",
      SET_APPLY_FLAG: "support_chat/SET_APPLY_FLAG",
      SET_TICKET_CONVERSATIONS_PAGE:
        "support_chat/SET_TICKET_CONVERSATIONS_PAGE",
      SET_TICKET_CONVERSATIONS_USERS_LIST:
        "support_chat/SET_TICKET_CONVERSATIONS_USERS_LIST",
    }),
    showSidebar() {
      if (document.querySelector(".section-chat__column_left")) {
        document
          .querySelector(".section-chat__column_left")
          .removeAttribute("style");
      }
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("hh mm ss");
    },
    closeOrViewed(value) {
      this.CLOSE_OR_VIEWED({
        active_ticket_id: this.active_ticket_id,
        value: value,
      }).then((res) => {
        if (res.status === "Success") {
          if (this.isNew) {
            this.DELETE_TICKET_FROM_SIDEBAR(this.GET_ACTIVE_TICKET_ID);
          } else {
            this.DELETE_USER_FROM_SIDEBAR(this.GET_ACTIVE_CONVERSATION_ID);
          }

          this.DECREMENT_TICKET_TOTAL();
          this.SET_ACTIVE_CONVERSATION_ID();
          this.SET_ACTIVE_TICKET_ID();
        }
      });
    },
    infinite($state) {
      this.$emit("fetchMoreData", $state);
    },
    apply() {
      // alert(454);
      this.SET_APPLY_FLAG(true);
      this.APPLY(this.active_ticket_id).then(
        ({
          data: {
            ticket: {
              conversation: { conversation_id },
            },
          },
        }) => {
          this.SET_ACTIVE_CONVERSATION_ID(conversation_id);

          this.SET_TICKET_CONVERSATIONS_PAGE();
          this.SET_TICKET_CONVERSATIONS_USERS_LIST({ data: [] });
          this.SET_USERS_CHAT_SIDEBAR_IDENTIFIER();

          this.SET_CONVERSATION_MESSAGES_PAGE();
          this.SET_CONVERSATION_MESSAGES({ data: [], current_page: 1 });
          this.SET_CONVERSATION_MESSAGES_IDENTIFIER();
          this.$router.push(
            `/support-chat/chat/${this.$route.params.theme}/${this.STATUS_EXPECTATION}`
          );
        }
      );

      this.SET_CHAT_USERS_PAGE();
      this.SET_CHAT_USERS_LIST({ data: [] });
      this.SET_USERS_CHAT_SIDEBAR_IDENTIFIER();
    },
    closeTicket() {
      this.closeOrViewed("close");
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        if (
          this.lastMessageOfList &&
          this.$auth.user.id !==
            this.lastMessageOfList.participation.messageable_id &&
          !this.lastMessageOfList.read_at
        ) {
          this.makeSeen();
        }
      }
    },
    matchHeight(lastMessage) {
      let height = this.$refs.infoBox;
      let isHeight =
        height.scrollTop + height.clientHeight >= height.scrollHeight;
      if (
        lastMessage &&
        isHeight &&
        this.$auth.user.id !== lastMessage.participation.messageable_id &&
        !lastMessage.read_at
      ) {
        this.makeSeen();
      }
    },
    makeSeen() {
      this.$axios
        .put(
          this.$supportChat.support.readMessages +
            `/${this.lastMessageOfList.conversation_id}/readAll`
        )
        .then((res) => {
          this.lastMessageOfList = 1;
          this.RESET_UNREAD_MESSAGES();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.isActive = false;
    },
  },
  mounted() {
    this.matchHeight();
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss">
.chat-body {
  display: flex;
  flex-direction: column;
  height: 100%;

  @include small-tablet {
    padding-bottom: 50rem;
  }

  &__top {
    padding: 15rem 0 16rem 25rem;
    position: relative;

    &:before {
      content: "";
      display: block;
      width: 3000px;
      height: 1px;
      background: $light-gray;
      position: absolute;
      left: 0;
      bottom: 0;
    }

    @include small-tablet {
      border-top: 1px solid $light-gray;
      border-bottom: 1px solid $light-gray;
      padding: 14rem var(--wrapper-offset);
      &:before {
        display: none;
      }
    }
  }

  &__column {
    &_left {
      display: flex;
      align-items: center;
    }
  }

  &__back {
    width: 22rem;
    height: 22rem;
    margin-right: 8rem;
    margin-left: -5rem;
    cursor: pointer;
    flex-shrink: 0;
    fill: #464646;

    svg {
      width: 100%;
      height: 100%;
    }

    @include min-large-tablet {
      display: none;
    }

    @include large-mobile {
    }
  }

  &__container {
    flex: 1 1 auto;
    position: relative;
    margin-top: 10rem;

    &-wrap {
      padding-top: 2px;
      padding-bottom: 2px;
      position: absolute;
      left: 0;
      top: 0;
      width: calc(100% + 10rem);
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 10rem;
      padding-left: 25rem;
    }

    @include small-tablet {
      margin-top: 20rem;
      &-wrap {
        padding: 10rem calc(var(--wrapper-offset) + 10rem) 10rem
          var(--wrapper-offset);
      }
    }
  }

  &__btn {
    &:not(:last-child) {
      margin-right: 10rem;
    }

    &.button-primary {
      padding-left: 30rem;
      padding-right: 30rem;
    }

    @include large-mobile {
      padding: 0;
      width: 40rem;
      &:not(:last-child) {
        margin-right: 5rem;
      }
      .button-medium {
        &__icon {
          margin-right: 0;
        }

        &__text {
          display: none;
        }
      }
    }

    &-manager {
      background: none;
      font-size: 14rem !important;

      svg {
        width: 24rem;
        height: 24rem;
      }
    }
  }

  &__action {
    text-align: left;
    margin: -10rem;
    min-width: 220rem;

    &-btn {
      padding: 5rem 19rem;
      font-size: 17rem;
      width: 100%;
      justify-content: flex-start;
      font-weight: 500;

      &:hover {
        background: #f5f5f7;
      }
    }
  }

  &__bottom {
    padding: 24rem 0 20rem 25rem;

    @include small-tablet {
      padding: 5rem var(--wrapper-offset);
      margin-top: 20rem;
    }

    @include large-mobile {
      border-top: 1px solid $light-gray;
    }
  }

  &__section {
    &:not(:first-child) {
      margin-top: 40rem;
    }

    @include large-mobile {
      &:not(:first-child) {
        margin-top: 30rem;
      }
    }
  }

  &__date {
    display: flex;
    overflow: hidden;
    justify-content: center;

    &-text {
      position: relative;
      color: $gray;

      &:before,
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        height: 1px;
        width: 1000px;
        background: $light-gray;
      }

      &:before {
        right: 100%;
        margin-right: 20rem;
      }

      &:after {
        left: 100%;
        margin-left: 20rem;
      }
    }

    @include large-mobile {
      &-text {
        &:before {
          margin-right: 15rem;
        }

        &:after {
          margin-left: 15rem;
        }
      }
    }
  }

  &__list {
    &:not(:first-child) {
      margin-top: 40rem;
    }

    @include large-mobile {
      &:not(:first-child) {
        margin-top: 30rem;
      }
    }
  }

  &__item {
    &:not(:first-child) {
      margin-top: 30rem;
    }
  }

  &__more {
    margin-right: -10rem;
    @include min-large-mobile {
      display: none !important;
    }
  }
}

.modal-another-manager {
  .save-manager__btn {
    float: right;
    margin-top: 30rem;
    margin-bottom: 60rem;
  }

  .no-wrap {
    white-space: nowrap;
    margin-right: 50rem;
    font-size: 20rem;
    font-weight: 600;
  }

  .select {
    font-size: 17rem;

    &__wrap,
    &__input,
    &__head,
    &__body {
      width: 100%;
    }

    &__head {
      border: 1px solid #d2d2d7;
      border-radius: 10px;
    }
  }
}

.button-primary_border-primary {
  .select__arrow {
    stroke: $blue;
    margin-left: 10rem;
  }
}
</style>