<template lang="pug">
.users-table(:class="Mods")
  table
    thead.color-gray
      tr
        th
          form-checkbox.users-table__checkbox(
            :checked="checkedAll",
            @change.native="$emit('allChecked')"
          )
        th
          | User
        th
          | Email
        th
          | Phone
        th
          | Date register
        th
          | ID

    tbody
      tr(v-for="(row, i) in rows", :key="i")
        td
          form-checkbox.users-table__checkbox(
            :checked="row.checked",
            @change.native="$emit('checked', i)"
          )
        td
          .users-table__label.mobile-visible User
          .users-table__text.text-wrap {{ row.first_name }}
        td
          .users-table__label.mobile-visible Email
          .users-table__text.text-wrap {{ row.email || "-" }}
        td
          .users-table__label.mobile-visible Phone
          .users-table__text.text-wrap {{ row.phone_view ? "+" + row.phone_view : "-" }}
        td
          .users-table__label.mobile-visible Date register
          .users-table__text.text-wrap {{ row.created_at ? generateDate(row.created_at) : "-" }}
        td
          .users-table__id-inner
            .users-table__id
              .users-table__id-wrap
                .users-table__label.mobile-visible ID
                .users-table__text {{ row.id }}
            .text-right
              .users-table__switcher
                button-primary.users-table__switcher(
                  gray,
                  @click.native.prevent="$emit('openBan', row)"
                ) {{ status === 1 ? "Un Ban" : "Ban" }}
                button-primary.users-table__switcher(
                  blue,
                  v-if="moderator && status !== 1",
                  :to="`${moderator ? 'moderators' : 'users'}/${row.id}`"
                ) Check
                button-primary.users-table__switcher(
                  blue,
                  v-else-if="moderator === false",
                  :to="`${moderator ? 'moderators' : 'users'}/${row.id}`"
                ) Check
              //button-switcher.users-table__switcher(:items="switchers" light :name="row.first_name")
              .mobile-visible.item-absalute(@click.prevent="showPanel(row.id)")
              .users-table__arrow.mobile-visible(v-b-modal.modal-panel-users)
                svg-icon(name="arrowRight")
</template>

<script>
import moment from "moment";

export default {
  props: {
    moderator: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 0,
    },
    checkedAll: {
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
          value: "Ban",
          text: "Ban",
        },
        {
          value: "Check",
          text: "Check",
          checked: true,
        },
      ],
    };
  },
  computed: {
    Mods() {
      return {
        "users-table_moderator": this.moderator,
      };
    },
  },
  methods: {
    showPanel(id) {
      this.$router.push(`${this.moderator ? "moderators" : "users"}/${id}`);
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD.MM.yyyy");
    },
  },
};
</script>

<style lang="scss">
.users-table {
  .item-absalute {
    position: absolute;
    right: 0;
    height: 57px;
    width: calc(100% - 30px);
    z-index: 3;
    transform: translateY();
  }

  @include min-large-mobile {
    .users-table__switcher .button-primary.button-primary_gray {
      background: #f4f3f4;
      color: #9a9a9a;
    }
  }

  .users-table__id-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  table {
    width: 100%;
  }

  tr {
    position: relative;
  }

  th {
    font-weight: 500;
    text-align: left;
    padding-bottom: 17rem;
  }

  th,
  td {
    border-bottom: 1px solid $light-gray;

    &:first-child {
      width: 80rem;
    }

    &:last-child {
      width: 40%;
    }
  }

  td {
    padding: 20rem 0;
    font-size: 15rem;
  }

  &__id {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__switcher {
    margin-left: 10rem;

    @include large-mobile {
      display: none;
    }
  }

  &__label {
    font-size: 10rem;
    margin-bottom: 1px;
    color: #aeaeae;
  }

  &__arrow {
    width: 12rem;
    height: 10rem;
    fill: none;
    stroke: $gray;
    stroke-width: 2px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  @include large-tablet {
    th,
    td {
      &:first-child {
        width: 35rem;
      }

      &:nth-child(3) {
        display: none;
      }
    }
  }

  @include large-mobile {
    table {
      border-collapse: separate;
      border-spacing: 0 10rem;
    }
    thead {
      display: none;
    }
    td {
      border-bottom: 1px solid #ececec;
      border-top: 1px solid #ececec;
      padding-top: 12rem;
      padding-bottom: 12rem;
      font-size: 12rem;

      &:first-child {
        border-left: 1px solid #ececec;
        padding-left: 10rem;
        border-radius: 15rem 0 0 15rem;
        width: 38rem;
      }

      &:last-child {
        border-right: 1px solid #ececec;
        padding-right: 10rem;
        border-radius: 0 15rem 15rem 0;
        width: 33.33%;
      }

      &:nth-child(4) {
        display: none;
      }
    }
  }
}

td.text-right {
  text-align: right;
}
</style>
