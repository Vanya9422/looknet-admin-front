<template lang="pug">
.chat-sidebar(:class="Mods")
  .chat-sidebar__top
    button-link-arrow.chat-sidebar__back(
      :to="backLink",
      v-if="moderator == true"
    )
    .chat-sidebar__title.h3 {{ title }}
      span.color-blue(v-if="ALL_MESSAGES_UNREAD_COUNT") ({{ ALL_MESSAGES_UNREAD_COUNT }})
    part-chat-search.chat-sidebar__search(v-if="search == true")
    form-checkbox.chat-sidebar__select-all(
      all,
      @change.native="panel",
      v-if="moderator == false"
    )
      span.color-gray.h6 Select all
  .chat-sidebar__stat(v-if="statText")
    .chat-sidebar__stat-text
      | {{ statText }}
      span.color-blue ({{ statCounter }})
  .chat-sidebar__container
    .chat-sidebar__container-wrap
      .chat-sidebar__list
        item-chat.chat-sidebar__item(
          v-for="(item, i) in list",
          :key="i",
          :name="getUserName(item)",
          :avatar="getUserAvatar(item)",
          :time="!isExpectationOrViewed ? generateDate(item.created_at) : item.last_message.created_at",
          :counter="item.unread_messages_count",
          :desc="item.name",
          :status="item.status",
          :last_message="item.last_message || {}",
          :checkbox="checkbox",
          :conversation_id="item.conversation_id",
          :small="small",
          button,
          :class="{ isActive: item.conversation_id ? number == item.conversation_id : number == item.id }",
          @change="tabList(i, item)",
          @showPanel="panel"
        )
          | {{ item.description || item.last_message.body }}
        infinite-loading(
          :distance="20",
          :identifier="GET_CHAT_USERS_SIDEBAR_IDENTIFIER",
          @infinite="infinite"
        )
          div(slot="no-results")
          div(slot="no-more")
          div(slot="spinner")
  transition(name="fade")
    part-chat-panel.chat-sidebar__panel(
      v-if="panelOpen",
      @closePanel="panelOpen = false"
    )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
export default {
  props: {
    title: {
      type: String,
      default: "Messages",
    },
    counter: {
      type: Number,
      default: 20,
    },
    statCounter: {
      type: Number,
      default: null,
    },
    statText: {
      type: String,
      default: "",
    },
    search: {
      type: Boolean,
      default: true,
    },
    isExpectationOrViewed: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isClose: {
      type: Boolean,
      default: false,
    },
    moderator: {
      type: Boolean,
      default: false,
    },
    checkbox: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
    backLink: {
      type: String,
      default: "#",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultUserName: "Ghost",
      panelOpen: false,
      // number: 0,
      i: 2,
    };
  },
  methods: {
    ...mapMutations({
      SET_ACTIVE_TICKET_ID: "support_chat/SET_ACTIVE_TICKET_ID",
      SET_CHAT_TOP_USER_DATA: "support_chat/SET_CHAT_TOP_USER_DATA",
      SET_ACTIVE_CONVERSATION_ID: "support_chat/SET_ACTIVE_CONVERSATION_ID",
      SET_CONVERSATION_MESSAGES_PAGE:
        "support_chat/SET_CONVERSATION_MESSAGES_PAGE",
      SET_CONVERSATION_MESSAGES: "support_chat/SET_CONVERSATION_MESSAGES",
      SET_CONVERSATION_MESSAGES_IDENTIFIER:
        "support_chat/SET_CONVERSATION_MESSAGES_IDENTIFIER",
      SET_ACTIVE_USER: "support_chat/SET_ACTIVE_USER",
    }),
    tabList(i, data) {
      if (!this.isExpectationOrViewed) {
        this.SET_ACTIVE_TICKET_ID(data.id);
      } else {
        this.SET_ACTIVE_CONVERSATION_ID(data.conversation_id);
        this.SET_ACTIVE_TICKET_ID(data.ticket_id);
        this.SET_CONVERSATION_MESSAGES_PAGE();
        this.SET_CONVERSATION_MESSAGES({ data: [], current_page: 1 });
        this.SET_CONVERSATION_MESSAGES_IDENTIFIER();
      }
      this.SET_CHAT_TOP_USER_DATA(data);

      this.number = data.conversation_id || data.id;

      if (window.innerWidth < 1121) {
        if (document.querySelector(".section-chat__column_left")) {
          document.querySelector(".section-chat__column_left").style.display =
            "none";
        }
      }
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("hh mm ss");
    },
    panel() {
      this.panelOpen = true;
    },
    infinite($state) {
      this.$emit("fetchMoreData", $state);
    },
    getUserName(item) {
      if (this.isNew && item.user) {
        return item.user.first_name;
      } else if (this.isNew && !item.user) {
        return this.defaultUserName;
      }

      if (this.isClose && item.user) {
        return item.user.first_name;
      } else if (this.isClose && !item.user) {
        return this.defaultUserName;
      }

      return item.participants.messageable.first_name;
    },
    getUserAvatar(item) {
      if (this.isNew && item.user) {
        return item.user.avatar ? item.user.avatar.original_full_url : "";
      } else if (this.isNew && !item.user) {
        return "";
      }

      if (this.isClose && item.user) {
        return item.user.avatar ? item.user.avatar.original_full_url : "";
      } else if (this.isClose && !item.user) {
        return "";
      }

      return item.participants && item.participants.messageable.avatar
        ? item.participants.messageable.avatar.original_full_url
        : "";
    },
  },
  computed: {
    ...mapGetters({
      GET_CHAT_USERS_SIDEBAR_IDENTIFIER:
        "support_chat/GET_CHAT_USERS_SIDEBAR_IDENTIFIER",
      NUMBER: "support_chat/NUMBER",
      ALL_MESSAGES_UNREAD_COUNT: "support_chat/ALL_MESSAGES_UNREAD_COUNT",
    }),
    number: {
      get() {
        return this.NUMBER;
      },
      set(number) {
        this.SET_ACTIVE_USER(number);
      },
    },
    Mods() {
      return {
        "chat-sidebar_moderator": this.moderator,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  },
};
</script>

<style lang="scss">
.chat-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20rem;

  @include small-tablet {
    padding-bottom: 60rem;
  }

  &_moderator {
    .chat-sidebar {
      &__top {
        min-height: 92rem;
        border-bottom: 1px solid $light-gray;
        padding-top: 20rem;
        padding-bottom: 20rem;
        display: flex;
        align-items: center;
      }
    }
  }

  &__back {
    margin-right: 25rem;

    .link-arrow {
      &__icon {
        width: 15rem;
        height: 17rem;
        transform: rotate(180deg);
        stroke: $default;
      }
    }
  }

  &__top {
    padding: 32rem 25rem 14rem 25rem;

    @include large-tablet {
      padding-right: 0;
    }

    @include small-tablet {
      padding: 20rem var(--wrapper-offset) 5rem var(--wrapper-offset);
    }
  }

  &__container {
    flex: 1 1 auto;
    position: relative;

    &-wrap {
      position: absolute;
      left: 0;
      top: 0;
      width: calc(100% - 4px);
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 4px;
      padding-left: 10px;

      &::-webkit-scrollbar {
        width: 2px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: none;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: $blue;
        border-radius: 5px;
      }
    }

    @include small-tablet {
      overflow: hidden;
      &-wrap {
        width: calc(100% + 12rem);
        padding: 0 32rem 0 20rem;
      }
    }
  }

  &__title {
    font-family: "Atyp Display";
    line-height: 0.8;
    @include large-mobile {
      font-weight: 500;
    }
  }

  &__search {
    margin-top: 24rem;

    @include large-mobile {
      margin-top: 17rem;
    }
  }

  &__select-all {
    margin-top: 25rem;

    @include large-mobile {
      display: none;
    }
  }

  &__panel {
    margin-top: -50rem;
  }

  &__item {
    &:not(:first-child) {
      border-top: 1px solid #f4f3f4;
    }
  }

  &__stat {
    padding: 22rem 10rem 14rem 30rem;
    font-size: 16rem;
    font-weight: 600;
  }
}
</style>