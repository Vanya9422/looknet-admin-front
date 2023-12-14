<template lang="pug">
section.section-users.checkboxs__list
  .section-users__head.flex.flex_vertical.flex_justify
    .section-users__head-column.section-users__head-column_left
      .annoucement-list__title
        h1.annoucement-list__title-text.h2.h2_big {{ title }}
        span.annoucement-list__title-counter.h3 ({{ total }})
      button-docs.mobile-visible(
        v-if="showExel >= 0",
        to="#",
        @click.prevent.native="downloadExcel"
      ) Download EXCL
    .section-users__head-column.section-users__head-column_right.flex.flex_vertical
      .section-users__sort
        form-checkbox.section-users__sort-checkbox(
          v-if="!$screen.st",
          :checked="checkedAll",
          @change.native="panelSelectedAll"
        )
          p.color-gray Select all
        form-select-array.favorites-ad__select(
          label="Sort by",
          :items="sorts",
          v-model="sort",
          :value="sort",
          noBorder
        )
      button-switcher.section-users__switcher(
        :items="switchers",
        @change="changeSwitcher",
        blue
      )
  button-primary.section-users__btn-add.mobile-visible(
    border,
    icon="plusBig",
    v-if="moderator",
    v-b-modal.modal-add-moderator
  ) Add moderator
  part-search-filter.annoucement-list__filter(
    :disabled="search",
    @search="searchUsers",
    :key="filterKey"
  )
    form-input.search-filter__field(
      v-for="(item, i) in filter",
      :key="i",
      :class="{ focus: item.value.length > 0 }",
      :name="item.name",
      :label="item.label",
      v-model="item.value",
      @clickLabel="item.key === 'phone' ? (phoneFlag = true) : false"
    )
      template(#input)
        transition(name="page", v-if="item.key === 'phone'")
          input.input__field(
            :id="item.key",
            type="tel",
            name="item.key",
            v-model="item.value"
          )
          //phone-mask.search-filter__field( :value="item.value" @input="(val) => item.value = val" v-show="phoneFlag"  )
      transition(name="page", v-if="item.value.length > 0")
        button-close.modal-search__clear(
          @click.native.prevent="removeValue(i)",
          type="button"
        )
    form-input.search-filter__field(
      :class="{ focus: openDatePiker || filterDays.date[0] !== null }",
      :name="filterDays.name",
      :label="filterDays.label"
    )
      template(#input)
        date-picker.two-column.input__field(
          @open="openDatePiker = true",
          @close="openDatePiker = false",
          @change="search = false",
          format="DD.MM.YYYY",
          v-model="filterDays.date",
          range
        )
      transition(name="page", v-if="filterDays.date[0] !== null")
        button-close.modal-search__clear(
          @click.native.prevent="removeDate()",
          type="button"
        )
  modal-filter(@search="searchUsers", @clear="clearUsers", v-if="!$screen.st")
    .modal-login__field(v-for="(item, i) in filter", :key="i")
      label.registration-form__label.p.b {{ item.label }}
      form-input(
        :placeholder="item.label",
        :name="item.name",
        v-model="item.value",
        @input="search = false"
      )
        template(#input)
          transition(name="page", v-if="item.key === 'phone'")
            input.input__field(
              placeholder="Phone",
              :id="item.key",
              type="tel",
              name="item.key",
              v-model="item.value"
            )
    .modal-login__field.filter-date
      label.registration-form__label.p.b {{ filterDays.label }}
      form-input.search-filter__field(
        :class="{ focus: openDatePiker || filterDays.date[0] !== null }",
        :name="filterDays.name"
      )
        template(#input)
          date-picker.two-column(
            :placeholder="filterDays.label",
            @open="openDatePiker = true",
            @close="openDatePiker = false",
            @change="search = false",
            format="DD.MM.YYYY",
            v-model="filterDays.date",
            range
          )

  part-users-table.section-users__table(
    :rows="list",
    :moderator="moderator",
    :total="total",
    :status="status",
    :checkedAll="checkedAll",
    @checked="checkedItem",
    @openBan="banUser",
    @allChecked="panelSelectedAll",
    v-if="list.length > 0"
  )
  list-null(v-else)
  infinite-loading(
    :distance="20"
    ref="infiniteLoading"
    @infinite="handleLoadMore"
    v-if="list.length && lastPage !== 1 && page < lastPage"
  )
    div(slot="no-results")
    div(slot="no-more")
    div(slot="spinner")
  .section-users__bottom.flex.flex_justify
    .section-users__bottom-column
      button-primary.section-users__btn(
        blue,
        v-if="lastPage !== 1 && page < lastPage",
        @click.prevent.native="handleLoad"
      ) Load more
    .section-users__bottom-column.flex
      button-primary.section-users__btn.section-users__btn-exel(
        gray,
        icon="plusBig",
        v-if="moderator",
        v-b-modal.modal-add-moderator
      ) Add moderator
      button-primary.section-users__btn.section-users__btn-exel(
        v-if="showExel >= 0",
        gray,
        icon="download",
        to="#",
        @click.prevent.native="downloadExcel"
      ) Download base EXCL
  .section-users__panel-wrap(v-if="!$screen.st")
    button-action.section-users__btn-filter(
      circle,
      icon="sliders",
      v-b-modal.modal-filter
    )
  transition(name="fade")
    part-annoucement-panel.section-users__panel(
      v-if="checkedList.length > 0",
      :type="title",
      @closePanel="checkedAllItems()",
      :selected="checkedList.length",
      modalName="modal-panel-users"
    )
      button-medium.annoucement-panel__btn(
        icon="noneUser",
        @click.native.prevent="banMoreUsers",
        blue,
        small
      ) {{ status === 1 ? "Un Ban" : "Ban" }}
  modal-panel#modal-panel-users
    .modal-panel__item
      button-border.modal-panel__btn(
        :icon="status === 1 ? 'user' : 'noneUser'",
        @click.native.prevent="banUserList",
        :blue="status === 1",
        :gray="status !== 1",
        BigIcon
      ) {{ status === 1 ? "Un Ban" : "Ban" }}
  modal-add-moderator(@close="getModerators")
  modal-ban-person(
    :title="status === 1 ? 'Un Ban' : 'Ban'",
    @ban="banUserModal",
    @cancel="ban = null",
    :status="status"
  )
</template>

<script>
import checkboxes from "@/mixins/checkboxes";
import filters from "@/mixins/filters";
import DatePicker from "vue2-datepicker";
import moment from "moment";

export default {
  props: {
    title: {
      type: String,
      default: "Users",
    },
    moderator: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
  },
  components: { DatePicker },
  mixins: [checkboxes, filters],
  data() {
    return {
      page: 0,
      total: 0,
      lastPage: 0,
      openDatePiker: false,
      phoneFlag: false,
      switchers: [
        {
          value: "Active",
          text: "Active",
          checked: true,
          status: 0,
        },
        {
          value: "Ban",
          text: "Ban",
          checked: false,
          status: 1,
        },
      ],
      status: 0,
      list: [],
      filter: [
        {
          name: "first_name",
          label: "Name",
          value: "",
          key: "first_name",
        },
        {
          name: "phone",
          label: "Phone",
          value: "",
          key: "phone",
        },
        {
          name: "email",
          label: "Email",
          value: "",
          key: "email",
        },
        {
          name: "id",
          label: "Id",
          value: "",
          key: "id",
        },
        // {
        //   name: 'date',
        //   label: 'Date',
        //   value: '',
        //   created_at: 'id'
        // },
      ],
      filterDays: {
        name: "created_at",
        label: "Date",
        date: [null, null],
        value: null,
        key: "created_at",
        created_at: "id",
      },
      search: true,
      expert: null,
      ban: null,
      filterKey: 0,
    };
  },
  created() {
    this.handleLoad();
  },
  computed: {
    showExel() {
      const permission = 5;
      return this.$auth.user.permissions_ids.findIndex(
        (item) => item === permission
      );
    },
  },
  watch: {
    sort() {
      this.page = 0;
      this.handleLoad();
    },
    filter: {
      handler() {
        this.search = false;
      },
      deep: true,
    },
  },
  methods: {
    removeValue(i) {
      this.filter[i].value = "";
      if (this.filter[i].key === "phone") this.phoneFlag = false;
      this.filterKey++;
      this.searchUsers();
    },
    removeDate() {
      this.filterDays.value = "";
      this.filterDays.date = [null, null];
      this.filterKey++;
      this.searchUsers();
    },
    getModerators() {
      this.page = 0;
      this.list = [];
      this.handleLoad();
    },
    changeSwitcher(item) {
      this.status = item.status;
      this.page = 0;
      this.checkedList = [];
      this.handleLoad();
    },
    searchUsers() {
      this.page = 0;

      this.handleLoad();
    },
    clearUsers() {
      this.page = 0;
      this.filter.forEach((item) => {
        item.value = "";
      });
      this.filterDays.value = "";
      this.filterDays.date = [null, null];
      this.handleLoad();
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("yyyy-MM-DD");
    },
    fetchData(flag) {
      let searchStr = `search=banned:${this.status}`;
      let type = "users";
      if (
        this.filterDays.date[0] !== null &&
        this.filterDays.date[1] !== null
      ) {
        this.filterDays.value = `${this.generateDate(
          this.filterDays.date[0]
        )},${this.generateDate(this.filterDays.date[1])}`;
      }
      if (
        !this.search &&
        this.$getQueryFilter([...this.filter, this.filterDays]) !== ""
      )
        searchStr +=
          ";" + this.$getQueryFilter([...this.filter, this.filterDays]);
      if (this.moderator) type = "moderators";
      let search = `admin/${type}?searchFields=phone:like;email:like&searchJoin=and&${this.getSort()}&${searchStr}&page=${
        this.page + 1
      }&per_page=20`;
      if (flag) search += "&export=true";

      return this.$axios.$get(search);
    },
    async handleLoad() {
      await this.fetchData().then(
        ({ data, meta: { current_page, last_page, total } }) => {
          if (this.page === 0) {
            this.list = [];
          }
          data.forEach((item) => {
            item.checked = false;
            this.list.push(item);
          });
          this.page = current_page;
          this.lastPage = last_page;
          this.total = total;
        }
      );
    },
    async handleLoadMore($state) {
      try {
        await this.handleLoad();
        $state.loaded();
      } catch (error) {
        $state.complete();
      }
    },
    banUser(item) {
      this.ban = item;
      this.$bvModal.show(`modal-ban-user`);
    },
    banUserModal() {
      const item = this.ban;
      this.ban = null;
      if (item) this.banOneUser(item);
      else this.banMoreUsers();
    },
    banOneUser(item) {
      const index = this.list.findIndex((i) => i.id === item.id);
      let api = "/admin/";
      if (this.moderator) api += "moderators";
      else api += "users";
      api += "/banned";
      this.$axios
        .$put(api, {
          banned_ids: [item.id],
          type: this.status === 1 ? 0 : 1,
        })
        .then((res) => {
          this.removeItem(item.id);
          this.list.splice(index, 1);
          this.total -= 1;
        });
    },
    banMoreUsers() {
      console.log("work2");
      const banned_ids = this.checkedList;
      let api = "/admin/";
      if (this.moderator) api += "moderators";
      else api += "users";
      api += "/banned";
      console.log("work");
      this.$axios
        .$put(api, {
          banned_ids,
          type: this.status === 1 ? 0 : 1,
        })
        .then((res) => {
          const checkedList = this.checkedList;
          this.total -= checkedList.length;
          this.checkedAllItems();
          checkedList.forEach((item) => {
            let index = this.list.findIndex((i) => i.id === item);
            this.list.splice(index, 1);
          });
        })
        .finally(() => this.$bvModal.hide(`modal-panel-users`));
    },
    banUserList() {
      this.ban = null;
      this.$bvModal.show(`modal-delete`);
    },
    downloadExcel() {
      let searchStr = `search=banned:${this.status}`;
      let type = "users";
      if (!this.search) searchStr += ";" + this.$getQueryFilter(this.filter);
      if (this.moderator) type = "moderators";
      let search = `admin/${type}?searchJoin=and&${this.getSort()}&${searchStr}&per_page=${
        this.page * 15
      }&export=true`;
      this.$axios.$get(search, { responseType: "arraybuffer" }).then((res) => {
        let fileURL = window.URL.createObjectURL(new Blob([res]));
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${type}.xlsx`);
        document.body.appendChild(fileLink);
        fileLink.click();
        document.body.removeChild(fileLink);
      });
    },
  },
};
</script>

<style lang="scss">
.search-filter .button-primary {
  height: 100%;
}

.section-users {
  padding: 30rem 0;
  position: relative;
  .section-users__panel {
    position: sticky;
    bottom: 30rem;
    margin-top: 30rem;
    z-index: 50;
    @include small-tablet {
      bottom: 60px;
    }
  }

  @include small-tablet {
    padding-bottom: 70rem;
  }

  @include large-mobile {
    padding-top: 20rem;
  }

  &__head {
    @include large-mobile {
      &-column {
        width: 100%;

        &_right {
          margin-top: 15rem;
        }

        &_left {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }

  &__switcher {
    @include large-mobile {
      width: calc(100% + 30rem);
    }
  }

  &__filter {
    margin-top: 45rem;
  }

  &__table {
    margin-top: 45rem;

    @include large-mobile {
      margin-top: 0;
      padding-top: 5rem;
    }
  }

  &__sort {
    margin-right: 20rem;
    display: flex;
    align-items: center;
    @include min-large-mobile {
      &-checkbox {
        display: none;
      }
    }

    @include large-mobile {
      order: 2;
      margin-top: 15rem;
      width: 100%;
      justify-content: space-between;
      margin-right: 0;
      padding: 0 5rem 0 11rem;
    }
  }

  &__bottom {
    margin-top: 40rem;

    @include large-mobile {
      display: none;
    }
  }

  &__btn {
    font-size: 14rem;
    min-width: 146rem;
    padding: 0 30rem;

    &:not(:last-child) {
      margin-right: 10rem;
    }
  }

  &__btn-filter {
    @include min-small-tablet {
      display: none;
    }
  }

  &__panel {
    margin-left: 0;
    margin-right: 0;
    position: static;

    &-wrap {
      position: sticky;
      bottom: 30rem;
      margin-top: 30rem;
      z-index: 50;
    }

    @include small-tablet {
      width: 100%;
      margin-top: 10rem;
      &-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin-top: -20rem;
        bottom: 63rem;
      }
    }

    @include large-mobile {
      &-wrap {
        margin-top: 0;
      }
    }
  }

  &__btn-add {
    margin-bottom: -5rem;
    margin-top: 15rem;
    width: 100%;
  }
}

.with-border {
  @include min-large-desktop() {
    padding: 29px 16px 29px 50px;
  }
  @include large-desktop {
    padding: 26px 16px 26px 50px;
  }
}

.lang-select .select__value {
  height: auto;
}

.section-users__sort-checkbox {
  margin-right: 12px;
}
.section-users__btn-exel {
  &:hover {
    background: #556dee !important;
    color: #fff;
    fill: #fff;
  }
}
</style>
