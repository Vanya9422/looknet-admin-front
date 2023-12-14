<template lang="pug">
section.support-chat
  .support-chat__top
    .support-chat__head.flex.flex_vertical.flex_justify
      h1.support-chat__title.h2.h2_big {{ title }}
      button-switcher.support-chat__head-switcher(
        :items="switchers",
        @change="changeStatus",
        blue
      )
    part-search-filter.support-chat__filter(
      :disabled="disabled",
      @search="search",
      :key="filterKey"
    )
      form-input.search-filter__field(
        name="Title",
        label="Title",
        v-model="searchQuery.name",
        :class="{ focus: searchQuery.name.length > 0 }",
        @input="disabled = false"
      )
        transition(name="page", v-if="searchQuery.name.length > 0")
          button-close.modal-search__clear(
            @click.native.prevent="clearSearch('name')",
            type="button"
          )
      form-input.search-filter__field(
        name="email",
        label="Email",
        autocomplete="off",
        :class="{ focus: searchQuery.email.length > 0 }",
        v-model="searchQuery.email",
        @input="disabled = false"
      )
        transition(name="page", v-if="searchQuery.email.length > 0")
          button-close.modal-search__clear(
            @click.native.prevent="clearSearch('email')",
            type="button"
          )
      form-input.search-filter__field(
        name="Description",
        label="Description",
        :class="{ focus: searchQuery.description.length > 0 }",
        v-model="searchQuery.description",
        @input="disabled = false"
      )
        transition(name="page", v-if="searchQuery.description.length > 0")
          button-close.modal-search__clear(
            @click.native.prevent="clearSearch('description')",
            type="button"
          )
      form-input.search-filter__field(
        :class="{ focus: openDatePiker || searchQuery.filterDays.date[0] !== null }",
        :name="searchQuery.filterDays.name",
        :label="searchQuery.filterDays.label"
      )
        template(#input)
          date-picker.two-column.input__field(
            @open="openDatePiker = true",
            @close="openDatePiker = false",
            @change="disabled = false",
            format="DD.MM.YYYY",
            v-model="searchQuery.filterDays.date",
            range
          )
        transition(name="page", v-if="searchQuery.filterDays.date[0] !== null")
          button-close.modal-search__clear(
            @click.native.prevent="clearSearch('filterDays')",
            type="button"
          )
    button-action.section-users__btn-filter(
      circle,
      icon="sliders",
      v-b-modal.modal-filter,
      v-if="!$screen.st"
    )
    modal-filter(
      @search="search",
      @clear="clearSearchMobile()",
      v-if="!$screen.st"
    )
      .modal-login__field
        label.registration-form__label.p.b Title
        form-input.search-filter__field(
          name="Title",
          v-model="searchQuery.name",
          @input="disabled = false"
        )
      .modal-login__field
        label.registration-form__label.p.b Email
        form-input.search-filter__field(
          name="email",
          autocomplete="off",
          v-model="searchQuery.email",
          @input="disabled = false"
        )
        transition(name="page", v-if="searchQuery.email.length > 0")
          button-close.modal-search__clear(
            @click.native.prevent="clearSearch('email')",
            type="button"
          )
      .modal-login__field
        label.registration-form__label.p.b Desc
        form-input.search-filter__field(
          name="Description",
          v-model="searchQuery.description",
          @input="disabled = false"
        )
          transition(name="page", v-if="searchQuery.description.length > 0")
            button-close.modal-search__clear(
              @click.native.prevent="clearSearch('description')",
              type="button"
            )
      .modal-login__field
        label.registration-form__label.p.b Date
        form-input.search-filter__field(:name="searchQuery.filterDays.name")
          template(#input)
            date-picker.two-column(
              @open="openDatePiker = true",
              @close="openDatePiker = false",
              @change="disabled = false",
              format="DD.MM.YYYY",
              v-model="searchQuery.filterDays.date",
              range
            )
          transition(
            name="page",
            v-if="searchQuery.filterDays.date[0] !== null"
          )
            button-close.modal-search__clear(
              @click.native.prevent="clearSearch('filterDays')",
              type="button"
            )

    part-back-nav-chat.support-chat__nav(:nav="supportThemes")
  .support-chat__body
    part-chat-table.support-chat__table.commercial-table(
      :rows="supportThemesAnswers",
      isChat,
      :activeThemeID="activeThemeID",
      :activeStatus="activeStatus",
      @fetchMoreData="handleLoadMoreAnswers",
      hasName
    )
    <!--part-chat-sidebar.support-chat__sidebar(:list="list")-->
  .support-chat__bottom
    button-switcher.support-chat__switcher(
      :items="switchers",
      @change="changeStatus",
      name="switchers2",
      blue
    )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DatePicker from "vue2-datepicker";
import moment from "moment";

export default {
  props: {
    title: {
      type: String,
      default: "Themes",
    },
  },
  components: { DatePicker },
  data() {
    return {
      openDatePiker: false,
      disabled: true,
      newSearch: "",
      searchQuery: {
        name: "",
        email: "",
        description: "",
        filterDays: {
          name: "created_at",
          label: "Date",
          date: [null, null],
          value: "",
          key: "created_at",
          created_at: "id",
        },
      },
      filterKey: 0,
      filterKeyMobile: 0,
    };
  },
  watch: {
    searchQuery: {
      handler(newVal, oldVal) {
        this.newSearch = Object.entries(newVal)
          .filter(
            ([key, value]) => typeof newVal[key] !== "object" && value !== ""
          )
          .map(([key, value]) => `${key}:${value}`)
          .join(";");

        if (this.searchQuery.filterDays.date[0] !== null) {
          let startDate = this.generateDate(
            this.searchQuery.filterDays.date[0]
          );
          let endDate = this.generateDate(this.searchQuery.filterDays.date[1]);
          let concatDates = [startDate, endDate].join(",");
          if (this.newSearch) {
            this.newSearch += `;created_at:${concatDates}`;
          } else {
            this.newSearch += `created_at:${concatDates}`;
          }
        }

        if (this.newSearch) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      SUPPORT_THEMES: "support_chat/SUPPORT_THEMES",
      ACTIVE_THEME_ID: "support_chat/ACTIVE_THEME_ID",
      ACTIVE_STATUS: "support_chat/ACTIVE_STATUS",
      GET_SWITCHERS: "support_chat/GET_SWITCHERS",
      GET_SUPPORT_THEMES_ANSWER_PAGE:
        "support_chat/GET_SUPPORT_THEMES_ANSWER_PAGE",
      GET_SUPPORT_THEMES_ANSWER_LAST_PAGE:
        "support_chat/GET_SUPPORT_THEMES_ANSWER_LAST_PAGE",
      GET_SUPPORT_THEMES_ANSWER_LIST:
        "support_chat/GET_SUPPORT_THEMES_ANSWER_LIST",
      STATUS_CLOSE: "support_chat/STATUS_CLOSE",
    }),
    supportThemesAnswerPage: {
      get() {
        return this.GET_SUPPORT_THEMES_ANSWER_PAGE;
      },
      set(val) {},
    },
    supportThemesAnswerLastPage: {
      get() {
        return this.GET_SUPPORT_THEMES_ANSWER_LAST_PAGE;
      },
      set(val) {},
    },
    activeThemeID() {
      return this.ACTIVE_THEME_ID || 1;
    },
    activeStatus() {
      if (this.ACTIVE_STATUS === this.STATUS_CLOSE) return this.ACTIVE_STATUS;

      return this.ACTIVE_STATUS || 1;
    },
    supportThemes() {
      return this.SUPPORT_THEMES;
    },
    switchers() {
      return this.GET_SWITCHERS;
    },
    supportThemesAnswers() {
      return this.GET_SUPPORT_THEMES_ANSWER_LIST;
    },
  },
  methods: {
    ...mapActions({
      FETCH_SUPPORT_THEMES: "support_chat/FETCH_SUPPORT_THEMES",
      FETCH_SUPPORT_THEMES_ANSWER_LIST:
        "support_chat/FETCH_SUPPORT_THEMES_ANSWER_LIST",
    }),
    ...mapMutations({
      SET_ACTIVE_STATUS: "support_chat/SET_ACTIVE_STATUS",
      SET_ACTIVE_THEM_ID: "support_chat/SET_ACTIVE_THEM_ID",
      SET_SUPPORT_THEMES_ANSWER_LIST:
        "support_chat/SET_SUPPORT_THEMES_ANSWER_LIST",
      SET_SUPPORT_THEMES_ANSWER_PAGE:
        "support_chat/SET_SUPPORT_THEMES_ANSWER_PAGE",
      SET_SUPPORT_THEMES_ANSWER_IDENTIFIER:
        "support_chat/SET_SUPPORT_THEMES_ANSWER_IDENTIFIER",
      SET_SEARCH_QUERY: "support_chat/SET_SEARCH_QUERY",
      SET_APPLY_FLAG: "support_chat/SET_APPLY_FLAG",
    }),
    handleLoadMoreAnswers($state) {
      if (this.supportThemesAnswerPage > this.supportThemesAnswerLastPage) {
        return;
      }

      let params = {
        active_theme_id: this.ACTIVE_THEME_ID || 1,
        // active_status: this.ACTIVE_STATUS || 1,
      };

      if (this.ACTIVE_STATUS === 0) {
        params = { ...params, active_status: this.ACTIVE_STATUS };
      } else {
        params = { ...params, active_status: this.ACTIVE_STATUS || 1 };
      }

      params = { ...params, search: this.newSearch };

      this.FETCH_SUPPORT_THEMES_ANSWER_LIST(params).then((loadState) => {
        if (loadState) $state.loaded();
        else $state.complete();
      });
    },

    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("yyyy-MM-DD");
    },
    changeStatus(item) {
      this.SET_ACTIVE_STATUS(item.status);
      this.clearTable();
    },
    search() {
      this.clearTable();
    },
    clearSearch(key) {
      if (key === "filterDays") {
        this.searchQuery[key].value = "";
        this.searchQuery[key].date = [null, null];
        this.clearTable();
      } else {
        this.searchQuery[key] = "";
        this.filterKey++;
        this.clearTable();
      }
    },
    clearSearchMobile() {
      let _this = this;
      Object.entries(this.searchQuery).map(function ([key, value]) {
        if (key === "filterDays") {
          _this.searchQuery[key].value = "";
          _this.searchQuery[key].date = [null, null];
        } else {
          _this.searchQuery[key] = "";
        }
      });

      this.filterKeyMobile++;
      this.clearTable();
    },
    clearTable() {
      this.SET_SUPPORT_THEMES_ANSWER_PAGE();
      this.SET_SUPPORT_THEMES_ANSWER_LIST({ data: [] });
      this.SET_SUPPORT_THEMES_ANSWER_IDENTIFIER();
    },
  },
  beforeDestroy() {
    this.SET_ACTIVE_THEM_ID();
    this.SET_ACTIVE_STATUS();
    this.SET_SUPPORT_THEMES_ANSWER_PAGE();
    this.SET_SUPPORT_THEMES_ANSWER_LIST({ data: [] });
  },
  created() {
    this.SET_APPLY_FLAG();
  },
  // async fetch() {
  //   await this.FETCH_SUPPORT_THEMES();
  // }
};
</script>

<style lang="scss">
.support-chat {
  padding: 33rem 0 80rem 0;

  @include small-tablet {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    padding-bottom: 70rem;
  }

  @include large-mobile {
    padding: 20rem 0 58rem 0;
  }

  &__head {
    @include small-tablet {
      &-switcher {
        display: none;
      }
    }
  }

  &__filter {
    margin-top: 30rem;
  }

  &__nav {
    margin-top: 50rem;

    @include small-tablet {
      margin-top: 30rem;
    }

    @include large-mobile {
      .back-nav__btn {
        padding-left: 15rem;
        padding-right: 15rem;
      }
    }
  }

  &__table {
    margin-top: 50rem;

    &:not(.support-chat__table) {
      @include small-tablet {
        display: none;
      }
    }
  }

  &__body {
    @include small-tablet {
      display: flex;
      flex-direction: column;
      position: relative;
      flex: 1 1 auto;
    }
  }

  &__bottom {
    margin-top: 10rem;
    border-top: 1px solid $light-gray;
    padding-top: 20rem;
    margin-left: -32px;
    margin-right: -32px;
    padding-left: var(--wrapper-offset);
    padding-right: var(--wrapper-offset);
    @include min-small-tablet {
      display: none;
    }
    @include large-mobile {
      padding-top: 10rem;
      overflow: hidden;
      margin-left: -15rem;
      margin-right: -15rem;
      .button-switcher {
        &__btn {
          padding-left: 20rem;
          padding-right: 20rem;
        }
      }
    }
  }

  &__sidebar {
    @include min-small-tablet {
      display: none !important;
    }
    @include small-tablet {
      padding-bottom: 0 !important;
      margin-top: 10rem;
      .chat-sidebar {
        &__top {
          display: none;
        }

        &__container-wrap {
          padding: 0 12rem 0 0;
        }
      }
    }
  }
}
@include large-mobile {
  .modal-filter {
    .search-filter__field:not(:first-child):before {
      background: transparent;
    }
    .input__field {
      border: 1px solid #d2d2d7;
      height: 50px;
    }
  }
}
</style>
