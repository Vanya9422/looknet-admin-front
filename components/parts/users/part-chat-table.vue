<template lang="pug">
.chat-table(:class="Mods")
  table(v-if="rows.length || $screen.lt")
    thead.color-gray
      tr
        th(v-if="hasName") Name
        th(v-if="isChat") Email
        th Title
        th.mobile-hidden Description
        th.chat-table__buttons-td Date
        th(v-if="!isChat")
    tbody
      tr(v-for="(row, i) in rows", :key="i", @click.prevent="check(row)")
        slot(:row="row", :i="i")
          td.text-wrap
            .commercial-table__label Title
            .commercial-table__name {{ row.user ? row.user.first_name : "Ghost" }}
          td.text-wrap
            .commercial-table__label Email
            .commercial-table__name {{ row.email }}
          td.text-wrap.mobile-hidden
            .commercial-table__label Name
            .commercial-table__name {{ row.name }}
          td.text-wrap.mobile-hidden
            .chat-table-btns__switcher.chat-table__desc.text-wrap {{ row.description }}
          td.chat-table__buttons-td
            .chat-table__buttons.align-items-center
              div
                .commercial-table__label Date
                .chat-table__date
                  .chat-table__text {{ generateDate(row.created_at) }}
              slot(:row="row", :i="i")
                .chat-table-btns
                  .chat-table-btns__switcher
                    button-primary.chat-table__switcher(
                      @click.native.prevent="toChat(row)",
                      blue
                    ) Check
                  nuxt-link.chat-table__arrow(
                    :to="`/support-chat/chat/${activeThemeID}/${activeStatus}`"
                  )
                    svg-icon(name="arrowRight")
  infinite-loading(
    :distance="20",
    @infinite="infinite",
    :identifier="GET_SUPPORT_THEMES_ANSWER_IDENTIFIER"
  )
    div(slot="no-results")
    div(slot="no-more")
    div(slot="spinner")
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";
export default {
  props: {
    isChat: {
      type: Boolean,
      default: false,
    },
    activeThemeID: {
      type: Number,
      default: 0,
    },
    activeStatus: {
      type: Number,
      default: 0,
    },
    hasName: {
      type: Boolean,
      default: false,
    },
    moderator: {
      type: Boolean,
      default: false,
    },
    withoutStatus: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      switchers: [
        {
          value: "Check",
          text: "Check",
          checked: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      GET_SUPPORT_THEMES_ANSWER_IDENTIFIER:
        "support_chat/GET_SUPPORT_THEMES_ANSWER_IDENTIFIER",
      STATUS_CLOSE: "support_chat/STATUS_CLOSE",
      STATUS_NEW: "support_chat/STATUS_NEW",
    }),
    Mods() {
      return {
        "users-table_moderator": this.moderator,
      };
    },
    isNewOrClose() {
      return (
        parseInt(this.$route.params.status) === this.STATUS_NEW ||
        parseInt(this.$route.params.status) === this.STATUS_CLOSE
      );
    },
  },
  methods: {
    ...mapMutations({
      SET_ACTIVE_TICKET_ID: "support_chat/SET_ACTIVE_TICKET_ID",
      SET_ACTIVE_CONVERSATION_ID: "support_chat/SET_ACTIVE_CONVERSATION_ID",
      SET_CHAT_TOP_USER_DATA: "support_chat/SET_CHAT_TOP_USER_DATA",
      SET_CONVERSATION_MESSAGES_PAGE:
        "support_chat/SET_CONVERSATION_MESSAGES_PAGE",
      SET_CONVERSATION_MESSAGES: "support_chat/SET_CONVERSATION_MESSAGES",
      SET_CONVERSATION_MESSAGES_IDENTIFIER:
        "support_chat/SET_CONVERSATION_MESSAGES_IDENTIFIER",
      SET_TICKET_CONVERSATIONS_PAGE:
        "support_chat/SET_TICKET_CONVERSATIONS_PAGE",
      SET_TICKET_CONVERSATIONS_USERS_LIST:
        "support_chat/SET_TICKET_CONVERSATIONS_USERS_LIST",
      SET_USERS_CHAT_SIDEBAR_IDENTIFIER:
        "support_chat/SET_USERS_CHAT_SIDEBAR_IDENTIFIER",
    }),
    infinite($state) {
      this.$emit("fetchMoreData", $state);
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    check(row) {
      this.$emit("rowClick", row);
      if (!this.$screen.lt) {
        this.$router.push(
          `/support-chat/chat/${this.activeThemeID}/${this.activeStatus}`
        );
      }
    },
    async toChat(data) {
      if (
        this.activeStatus === this.STATUS_CLOSE ||
        this.activeStatus === this.STATUS_NEW
      ) {
        this.SET_ACTIVE_TICKET_ID(data.id);
        this.SET_CHAT_TOP_USER_DATA(data);
      } else {
        setTimeout(() => {
          this.SET_ACTIVE_CONVERSATION_ID(data.conversation.conversation_id);
        }, 700);
        await this.SET_TICKET_CONVERSATIONS_PAGE();
        await this.SET_TICKET_CONVERSATIONS_USERS_LIST({ data: [] });
        await this.SET_USERS_CHAT_SIDEBAR_IDENTIFIER();

        await this.SET_CONVERSATION_MESSAGES_PAGE();
        await this.SET_CONVERSATION_MESSAGES({ data: [], current_page: 1 });
        await this.SET_CONVERSATION_MESSAGES_IDENTIFIER();
      }
      this.$router.push(
        `/support-chat/chat/${this.activeThemeID}/${this.activeStatus}`
      );
    },
  },
};
</script>

<style lang="scss">
.chat-table {
  &__buttons {
    display: flex;
    justify-content: space-between;
  }
  table {
    overflow-x: auto;
    width: 100%;
    tbody {
      tr {
        @include small-tablet {
          cursor: pointer;
        }
        min-width: 550px;
        width: 100%;
      }
    }
  }

  th {
    font-weight: 500;
    text-align: left;
    padding-bottom: 18rem;
  }

  th,
  td {
    border-bottom: 1px solid $light-gray;

    &:last-child {
      width: 35%;
    }

    &:nth-child(3) {
      width: 22%;
    }
    &.chat-table__buttons-td {
      width: 45%;
    }
  }

  td {
    padding: 15rem 0;
    font-size: 15rem;
  }

  &__date {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__switcher {
    margin-left: 10rem;

    @include large-mobile {
      display: none;
    }

    .button-switcher {
      &__item {
        width: auto;
      }
      &__list {
        justify-content: end;
      }
    }
  }

  &__desc {
    max-width: 241rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @include large-tablet { // TODO проверить этот стиль
    .mobile-hidden {
      display: none;
    }
  }
}
</style>
