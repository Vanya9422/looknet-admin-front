<template lang="pug">
main.main.bussness
  section-support-chat-container(:switchers="switchers", title="For Business")
    template(#filter)
      part-search-filter.support-chat__filter(
        :disabled="disabled",
        @search="searchItems"
      )
        form-select-array-big.commercial__input(
          :key="filterKey",
          name="period_of_stay",
          default,
          @change="changeSelect",
          @more="changeClient",
          :items="filters",
          v-model="filter",
          :value="filter"
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
          :to="`/commercial/business/add?clientId=${clientId}`"
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
          .commercial-table__name.text-wrap {{ row.name }}
        td
          .commercial-table__label Description
          .chat-table__desc.text-wrap {{ row.description.desc || "-" }}
        td
          .commercial-table__label Date
          .chat-table__date
            .chat-table__text {{ generateDate(row.created_at) }}
        td
          .chat-table-btns
            .chat-table-btns__switcher
              button-primary(
                icon="close",
                grayWithText,
                @click.native.prevent="delItem(i)"
              ) Delete
              button-primary(
                v-if="status !== 3",
                grayWithText,
                @click.native.prevent="draftItem(i)"
              ) Draft
              button-primary(
                blue,
                :to="`/commercial/business/${row.id}?clientId=${clientId}`"
              ) Check
            .chat-table__arrow
              svg-icon(name="arrowRight")
      list-null(v-else)
      part-chat-sidebar.support-chat__sidebar(:list="list")
    template(#footer)
      button-primary.modal-category__question-btn.ml-0.mobile-noShow(
        v-if="showAddButton",
        gray,
        icon="plusBig",
        :to="`/commercial/business/add?clientId=${clientId}`"
      ) Add a new
  modal-delete(@cancel="deleteId = null", @deleteItem="delModal")
  modal-add-client(@close="getClients()")
  modal-edit-client(
    :key="clientKey",
    @changeClient="changeFilter",
    :clientId="editClient ? editClient.id : 0",
    @close="editClient = null"
  )
</template>


<script>
import moment from "moment";
import deleteItem from "@/mixins/deleteItem";

export default {
  middleware: ["showCommercial"],
  data() {
    return {
      filterKey: 0,
      filters: [],
      filter: {
        full_name: "",
        email: "",
        phone_view: "",
        company: "",
      },
      clientId: 0,
      clientKey: 0,
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
      editClient: null,
      showAddButton: false,
      status: 0,
      rows: [],
      list: [],
      counts: {
        vertical_count: 0,
        horizontal_count: 0,
        draft_count: 0,
      },
    };
  },
  mixins: [deleteItem],
  created() {
    this.getClients();
    const clientId = this.$route.query.clientId;
    if (clientId) {
      this.clientId = clientId;
      this.getList();
    }
  },
  computed: {
    nav() {
      return [
        {
          text: "Vertical",
          status: 0,
          counter: this.counts.vertical_count,
        },
        {
          text: "Gorizontal",
          status: 1,
          counter: this.counts.horizontal_count,
        },
        {
          text: "Draft",
          status: 3,
          counter: this.counts.draft_count,
        },
      ];
    },
  },
  watch: {
    status() {
      this.getList();
    },
  },
  methods: {
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    changeFilter(val) {
      if (val.email === "") this.rows = [];
      this.filter = val;
      this.getClients();
      this.filterKey++;
    },
    changeClient(id) {
      this.$axios
        .$get(`/admin/commercial/clients/${id}?with=avatar`)
        .then(({ data }) => {
          this.editClient = data;
          this.clientKey++;
          this.$nextTick(() => this.$bvModal.show("modal-edit-client"));
        });
    },
    changeNav(item) {
      if (this.showAddButton) this.status = item.status;
    },
    clickField(row) {
      if (!this.$screen.lt) {
        this.$router.push(
          `/commercial/business/${row.id}?clientId=${this.clientId}`
        );
      }
    },
    getClients() {
      this.$axios.$get(this.$api.clients).then(({ data }) => {
        this.filters = data;
        const query = this.$route.query.clientId;
        if (query) {
          const item = data.find((i) => i.id === +query);
          this.filter = item;
          this.clientId = item ? item.id : 0;
        }
      });
    },
    changeSelect(i) {
      this.filter = this.filters[i];
      this.clientId = this.filter.id;
      this.disabled = false;
    },
    searchItems() {
      this.$router.push({ query: { clientId: this.clientId } });
      this.getList();
    },
    getList() {
      if (this.clientId > 0) {
        this.disabled = false;
        const sortNewest = "orderBy=created_at&sortedBy=desc";
        let api = `${this.$api.businesses}?${sortNewest}&searchJoin=and&client=${this.clientId}&search=client_id:${this.clientId}`;
        if (this.status === 3) api += `;status:0`;
        else api += `;type:${this.status};status:1`;
        this.$axios
          .$get(api)
          .then(({ data, counts }) => {
            const res = [];
            data.forEach((item) => {
              let list = {
                id: item.id,
                name: item.name,
                created_at: item.created_at,
              };
              if (item.details) list.description = JSON.parse(item.details);
              res.push(list);
            });
            this.counts = counts;
            this.rows = res;
          })
          .finally(() => {
            if (!this.showAddButton) this.showAddButton = true;
          });
      }
    },
    draftItem(index) {
      this.$axios
        .$put(`${this.$api.businesses}/${this.rows[index].id}`)
        .then(() => {
          this.rows.splice(index, 1);
          if (this.status === 0) this.counts.vertical_count--;
          if (this.status === 1) this.counts.horizontal_count--;
          this.counts.draft_count++;
        });
    },
    delItem(index) {
      this.deleteId = this.rows[index].id;
    },
    delModal() {
      this.$axios
        .$delete(`${this.$api.businesses}/${this.deleteId}`)
        .then(() => {
          const index = this.rows.findIndex(
            (item) => item.id === this.deleteId
          );
          this.rows.splice(index, 1);
          if (this.status === 0) this.counts.vertical_count--;
          if (this.status === 1) this.counts.horizontal_count--;
          if (this.status === 3) this.counts.draft_count--;
        });
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

.support-chat__filter input:disabled {
  border-color: transparent;
  background: #fff;
  color: #062439;
}

.support-chat__filter-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 78px;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    height: 28rem;
    width: 1px;
    margin-top: -14rem;
    background: #d2d2d7;
  }

  svg {
    width: 10px;
    height: 10px;
    stroke: #9a9a9a;
    stroke-width: 2px;
    fill: transparent;
  }
}
</style>
