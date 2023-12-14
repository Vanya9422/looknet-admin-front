<template lang="pug">
main.main.bussness
  section-support-chat-container(:switchers="switchers", title="For users")
    template(#filter)
      part-search-filter.support-chat__filter(
        :disabled="disabled",
        @search="searchItems"
      )
        form-select-array-big-group.commercial__input.mt-0(
          :key="searchKey",
          default,
          text="New Group",
          @change="changeSelect",
          :value="filter",
          :first="filter"
        )

    template(#nav)
      part-back-nav.support-chat__nav(
        :nav="nav",
        :status="status",
        @change="changeNav"
      )
      transition(name="page")
        button-primary.section-users__btn-add.mobile-show(
          border,
          v-if="showAddButton",
          icon="plusBig",
          :to="`/commercial/users/add?group=${filter.id}`"
        ) Add a new
    template(#table)
      part-chat-table.support-chat__table.commercial-table(
        v-if="rows.length > 0",
        @rowClick="clickField",
        :rows="rows",
        withoutStatus,
        v-slot="{ row, i }"
      )
        td
          .commercial-table__label Title
          .commercial-table__name {{ row.name }}
        td
          .commercial-table__label Description
          .chat-table__desc {{ row.description[0].text }}
        td
          .commercial-table__label Date
          .chat-table__date
            .chat-table__text {{ generateDate(row.created_a) }}
        td
          .chat-table-btns
            .chat-table-btns__switcher
              button-primary(
                icon="close",
                grayWithText,
                @click.native.prevent="delItem(i)"
              ) Delete
              button-primary(
                v-if="status === 1",
                grayWithText,
                @click.native.prevent="draftItem(i)"
              ) Draft
              button-primary(
                blue,
                :to="`/commercial/users/${row.id}?group=${filter.id}`"
              ) Check
            .chat-table__arrow(v-b-modal.modal-panel-users)
              svg-icon(name="arrowRight")
      list-null(v-else)
      part-chat-sidebar.support-chat__sidebar(:list="list")
    template(#footer)
      button-primary.modal-category__question-btn.ml-0.mobile-noShow(
        v-if="showAddButton",
        gray,
        icon="plusBig",
        :to="`/commercial/users/add?group=${filter.id}`"
      ) Add a new
  modal-delete(@cancel="deleteId = null", @deleteItem="delModal")
</template>


<script>
import moment from "moment";
import deleteItem from "@/mixins/deleteItem";

export default {
  data() {
    return {
      filter: {},
      switchers: [
        {
          value: "for_users",
          text: "For users",
          link: "/commercial/users",
        },
        {
          value: "for_business",
          text: "For business",
          link: "/commercial/business",
        },
        {
          value: "notification",
          text: "Notification",
          link: "/commercial/notification",
        },
      ],
      disabled: true,
      showAddButton: false,
      status: 1,
      rows: [],
      list: [],
      counts: {
        active_count: 0,
        draft_count: 0,
      },
      searchKey: 0,
    };
  },
  middleware: ["showCommercial"],
  mixins: [deleteItem],
  created() {
    const group = this.$route.query.group;
    if (group) {
      this.getGroups();
    }
  },
  watch: {
    status() {
      this.getList();
    },
    filter: {
      handler(newValue) {
        this.disabled = false;
      },
      deep: true,
    },
  },
  computed: {
    nav() {
      return [
        {
          text: "Active",
          status: 1,
          counter: this.counts.active_count,
        },
        {
          text: "Draft",
          status: 0,
          counter: this.counts.draft_count,
        },
      ];
    },
  },
  methods: {
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    changeNav(item) {
      if (this.showAddButton) this.status = item.status;
    },
    getGroups() {
      this.$axios.setHeader("Accept-Language", "en");
      this.$axios.$get(this.$api.clientsDays).then(({ data }) => {
        const group = this.$route.query.group;
        this.filter = data.find((i) => i.id === +group);
        this.searchKey++;
        this.getList(group);
      });
    },
    changeSelect(i) {
      this.filter = i;
    },
    clearFilter() {
      this.filter = {};
      this.getList();
    },
    changeTime() {
      this.disabled = false;
    },
    searchItems() {
      this.$router.push({ query: { group: this.filter.id } });
      this.getList();
    },
    getList(id) {
      const groupId = this.filter.id || id;
      const params = {
        searchJoin: "and",
        period: this.filter.id,
        with: "avatar",
        orderBy: "created_at",
        sortedBy: "desc",
        search: `status:${this.status};period_of_stay_id:${groupId};group_id:${groupId}`,
      };
      this.$axios
        .$get(this.$api.commercialUsers, { params })
        .then(({ data, counts }) => {
          const res = [];
          if (!this.showAddButton) this.showAddButton = true;
          data.forEach((item) => {
            try {
              const description = JSON.parse(item.description);
              res.push({
                id: item.id,
                name: item.name,
                description,
                created_at: item.created_at,
              });
            } catch (error) {
              console.error(`Tariff ${item.name} description error`);
              return;
            }
          });
          this.rows = res;
          this.counts = counts;
        });
    },
    draftItem(index) {
      this.$axios
        .$put(`${this.$api.commercialUsers}/${this.rows[index].id}`)
        .then((res) => {
          this.rows.splice(index, 1);
          this.counts.active_count--;
          this.counts.draft_count++;
        });
    },
    delItem(index) {
      this.deleteId = this.rows[index].id;
    },
    delModal() {
      this.$axios
        .$delete(`${this.$api.commercialUsers}/${this.deleteId}`)
        .then((res) => {
          const index = this.rows.findIndex(
            (item) => item.id === this.deleteId
          );
          this.rows.splice(index, 1);
          if (this.status === 1) this.counts.active_count--;
          if (this.status === 0) this.counts.draft_count--;
        });
    },
    clickField(row) {
      if (!this.$screen.lt) {
        this.$router.push(`/commercial/users/${row.id}`);
      }
    },
  },
};
</script>
<style lang="scss">
.chat-table-btns {
  display: flex;
  justify-content: flex-end;

  .button-primary:not(:last-child) {
    margin-right: 8px;
  }
}
@include large-mobile() {
  .bussness {
    .search-filter {
      margin-top: 20px;
      display: block;
    }
    .search-filter__fields {
      height: 60px;
    }
    .input__label {
      top: 50%;
      transform: translateY(-50%);
    }
    .focus {
      .input__label {
        top: 5px;
        transform: translateY(0);
      }
      .input__field {
        padding-top: 16px !important;
      }
    }
  }
}

.chat-table-btns__switcher {
  display: flex;
  flex-wrap: nowrap;
}

@include large-tablet {
  .chat-table__desc {
    white-space: inherit;
  }
}

.commercial-table {
  .commercial-table__label {
    font-size: 10rem;
    margin-bottom: 1px;
    color: #aeaeae;
    display: none;
  }

  .chat-table__arrow {
    display: none;
  }

  td,
  th {
    padding-right: 5px;

    &:nth-last-child(1) {
      padding-right: 0;
    }
  }

  @include small-tablet {
    margin-top: 0;
    .commercial-table__label {
      display: block;
    }
    table {
      border-collapse: separate;
      border-spacing: 0 10rem;
    }
    th {
      display: none;
    }
    .mobile-visible-not {
      display: none;
    }
    td {
      &:first-child {
        border-left: 1px solid #ececec;
        padding-left: 10rem;
        border-radius: 15rem 0 0 15rem;
      }

      &:last-child {
        border-right: 1px solid #ececec;
        padding-right: 10rem;
        border-radius: 0 15rem 15rem 0;
        width: 5%;
      }

      border-bottom: 1px solid #ececec;
      border-top: 1px solid #ececec;
      padding-top: 12rem;
      padding-bottom: 12rem;
      font-size: 12rem;
    }
    .chat-table__desc {
      color: #6e6e73;
    }
    .chat-table-btns {
      &__switcher {
        display: none;
      }

      display: flex;
      justify-content: flex-end;
    }

    .chat-table__arrow {
      width: 12rem;
      height: 10rem;
      fill: none;
      stroke: #6e6e73;
      stroke-width: 2px;
      display: block;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
