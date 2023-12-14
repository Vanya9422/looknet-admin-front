<template lang="pug">
main.main.bussness
  section-support-chat-container(
    :switchers="switchers",
    :title="pageType === 1 ? 'Banner' : 'Notifications'"
  )
    template(#filter)
      div
    template(#nav)
      part-back-nav.support-chat__nav(
        :nav="nav",
        :status="status",
        @change="(item) => (status = item.status)"
      )
      transition(name="page")
        button-primary.section-users__btn-add.mobile-show(
          border,
          icon="plusBig",
          :to="`/commercial/notification/add`"
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
          .commercial-table__name {{ row.name || row.title || "-" }}
        td
          .commercial-table__label Description
          .chat-table__desc {{ row.description }}
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
                v-if="status === 1",
                grayWithText,
                @click.native.prevent="draftItem(i)"
              ) Draft
              button-primary(
                blue,
                :to="`/commercial/${pageType === 1 ? 'banner' : 'notification'}/${row.id}`"
              ) Check
            .chat-table__arrow
              svg-icon(name="arrowRight")
      list-null(v-else)
    template(#footer)
      button-primary.modal-category__question-btn.ml-0.mobile-noShow(
        gray,
        icon="plusBig",
        :to="`/commercial/notification/add`"
      ) Add a new
  modal-delete(@cancel="deleteId = null", @deleteItem="delModal")
</template>


<script>
import deleteItem from "@/mixins/deleteItem";
import moment from "moment";

export default {
  middleware: ["showCommercial"],
  props: {
    pageType: {
      type: Number,
      default: 1,
    },
  },
  mixins: [deleteItem],
  data() {
    return {
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
      status: 1,
      rows: [],
      counts: {
        active_count: 0,
        draft_count: 0,
      },
    };
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
  created() {
    this.getList();
  },
  watch: {
    status() {
      this.getList();
    },
  },
  methods: {
    searchItems() {
      this.getList();
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    clickField(row) {
      if (!this.$screen.lt) {
        this.$router.push(`/commercial/notification/${row.id}`);
      }
    },
    getList() {
      const sortNewest = "orderBy=created_at&sortedBy=desc";
      let api = `${this.$api.notifications}?searchJoin=and&${sortNewest}&search=status:${this.status}`;
      this.$axios.$get(api).then(({ data, counts }) => {
        const res = [];
        data.forEach((item) => {
          res.push({
            id: item.id,
            name: item.title,
            description: item.description,
            created_at: item.created_at,
          });
        });
        this.counts = counts;
        this.rows = res;
      });
    },
    draftItem(index) {
      this.$axios
        .$put(`${this.$api.notifications}/${this.rows[index].id}`)
        .then(() => {
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
        .$delete(`${this.$api.notifications}/${this.deleteId}`)
        .then(() => {
          const index = this.rows.findIndex(
            (item) => item.id === this.deleteId
          );
          this.rows.splice(index, 1);
          if (this.status === 1) this.counts.active_count--;
          if (this.status === 0) this.counts.draft_count--;
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
</style>
