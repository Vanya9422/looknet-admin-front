<template lang="pug">
b-modal(
  :id="id",
  :red="id",
  size="commercial-size",
  modal-class="modal-commercial",
  body-class="modal-commercial__body",
  header-class="modal-commercial__header",
  footer-class="modal-commercial__footer",
  centered,
  @show="openModal"
)
  template(#modal-header="{ close }")
    button-close.modal__close(@click.native="close()")
    .modal-commercial__title.h3.mobile-visible {{ title }}
    .modal-commercial__top(v-if="selectLabel")
      .modal-commercial__top-title.h4 {{ selectLabel }}
      form-select.modal-commercial__top-select(
        default,
        :value="value",
        :items="items"
      )
        button-medium.modal-commercial__btn(icon="plusBig", light) New client

    .modal-commercial__header-row
      .modal-commercial__title.h3.mobile-hidden {{ title }}
      button-switcher.modal-commercial__switcher(
        :items="switchers",
        @change="(item) => (status = item.status)",
        blue,
        name="commercial"
      )

  .modal-commercial__container.css-scrollbar
    table(v-if="rows.length > 0")
      thead
        tr
          th Title
          th Description
          th Date
          th
      tbody
        tr(v-for="(row, i) in rows", :key="i", @click="clickField(row)")
          td
            .modal-commercial__label.mobile-visible Title
            .modal-commercial__desc {{ row.name }}
          td
            .modal-commercial__label.mobile-visible Description
            .modal-commercial__desc {{ row.description }}
          td
            .modal-commercial__date.flex.flex_vertical.flex_justify
              .modal-commercial__date-wrap
                .modal-commercial__label.mobile-visible Date
                .modal-commercial__date-text {{ generateDate(row.created_at) }}
              .modal-commercial__date-buttons.flex
                button-medium.modal-commercial__open(
                  blue,
                  :to="`${open}/${row.id}`",
                  large
                ) Open
                button-medium.modal-commercial__delete(
                  gray,
                  square,
                  @click.native.prevent="delItem(i)",
                  icon="delete",
                  large
                )
              .modal-commercial__arrow.mobile-visible
                svg-icon(name="arrowRight")
  template(#modal-footer="{ close }")
    button-primary.modal-commercial__add(
      light,
      :to="`${open}/add`",
      icon="plusBig"
    ) Add new
</template>

<script>
import moment from "moment";

export default {
  props: {
    title: {
      type: String,
      default: "Commercial banners",
    },
    id: {
      type: String,
      default: "modal-commercial",
    },
    api: {
      type: String,
      default: "",
    },
    open: {
      type: String,
      default: "",
    },
    redirect: {
      type: String,
      default: "",
    },
    del: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    items: {
      type: [Array, Object],
      default: () => [],
    },
    selectLabel: {
      type: String,
      default: "",
    },
    users: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      switchers: [
        {
          value: "Active",
          text: "Active",
          checked: true,
          status: 1,
        },
        {
          value: "Draft",
          text: "Draft",
          status: 0,
        },
      ],
      rows: [],
      status: 1,
    };
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
    clickField(row) {
      if (!this.$screen.lt) {
        this.$router.push(`${this.open}/${row.id}`);
      }
    },
    openModal() {
      this.getList();
    },
    getList() {
      let api = `${this.api}status:${this.status}`;
      this.$axios.$get(api).then((res) => {
        const data = [];
        res.data.forEach((item) => {
          const description = this.users
            ? JSON.parse(item.description)[0].text
            : item.description;
          data.push({
            id: item.id,
            name: item.title || item.name,
            description,
            created_at: item.created_at,
          });
        });
        this.rows = data;
      });
    },
    delItem(index) {
      this.$emit("delete", this.rows[index].id);
      this.$root.$emit("bv::show::modal", "modal-delete");
    },
  },
};
</script>

<style lang="scss">
.modal-commercial {
  @include small-tablet {
    .modal-content {
      padding-top: 50rem;
      overflow: hidden;
    }
    .modal__close {
      width: 34rem;
      height: 34rem;
      top: 13rem;
      right: 15rem;
    }
  }
  @include large-mobile {
    padding: 0 !important;
    .modal-content {
      padding-top: 20rem;
      padding-bottom: 20rem;
    }
  }

  &__header {
    display: block;

    &-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    @include large-mobile {
      &-row {
        flex-wrap: wrap;
      }
    }
  }

  &__title {
    @include large-mobile {
      width: 100%;
    }
  }

  &__switcher {
    font-size: 20rem;
    margin-left: auto;

    .button-switcher__btn {
      font-size: inherit;
      min-width: 124rem;
    }

    @include large-mobile {
      width: calc(100% + 45rem);
      margin-top: 20rem;
      margin-left: -15rem;
      font-size: 15rem;
    }
  }

  &__footer {
    margin-top: 40rem;
    border: 0;
    padding: 0;
    justify-content: space-between;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__add {
    min-width: 150rem;
    @include large-mobile {
      width: 100%;
    }
  }

  &__container {
    margin-top: 30rem;
    overflow-x: hidden;
    overflow-y: auto;
    margin-right: -40rem;
    padding-right: 38rem;
    max-height: 440rem;

    @include small-tablet {
      padding-right: 40rem;
      &::-webkit-scrollbar {
        width: 0;
      }
    }

    @include large-mobile {
      margin-top: 10rem;
      max-height: calc(75vh - 200rem);
    }
  }

  table,
  thead,
  tr,
  td,
  th {
    border-collapse: collapse;
  }

  table {
    width: 100%;
  }

  th {
    padding-bottom: 17rem;
    color: $gray;
    font-weight: 500;
  }

  tr {
    border-bottom: 1px solid $light-gray;
  }

  th,
  td {
    //&:last-child {
    //  width: 50%;
    //}
    //
    //&:nth-child(2) {
    //  width: 15%;
    //}
  }

  td {
    padding-top: 15rem;
    padding-bottom: 15rem;
  }

  &__desc {
    font-weight: 600;
    font-size: 15rem;

    @include large-mobile {
      font-weight: 500;
      font-size: 12rem;
    }
  }

  &__open {
    min-width: 104rem;
  }

  &__delete {
    margin-left: 10rem;
  }

  &__label {
    font-size: 10rem;
    margin-bottom: 1px;
    color: #aeaeae;
  }

  &__date {
    @include large-mobile {
      &-buttons {
        display: none;
      }
    }
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

  &__top {
    padding-bottom: 30rem;
    border-bottom: 1px solid $light-gray;
    margin-bottom: 27rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-title {
      font-family: "Gilroy";
      font-weight: 600;
      white-space: nowrap;
      margin-right: 30rem;
    }

    &-select {
      width: 66.66%;
    }

    @include large-mobile {
      display: block;
      padding-bottom: 15rem;
      margin-bottom: -5rem;
      margin-top: 20rem;
      &-title {
        font-size: 16rem;
      }
      &-select {
        width: 100%;
        margin-top: 10rem;
      }
    }
  }

  @include large-mobile {
    table {
      border-collapse: separate;
      border-spacing: 0 5rem;
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
        padding-left: 14rem;
        border-radius: 15rem 0 0 15rem;
      }

      &:nth-child(2) {
        padding-left: 5rem;
        padding-right: 20rem;
        white-space: nowrap;
      }

      &:last-child {
        border-right: 1px solid #ececec;
        padding-right: 15rem;
        border-radius: 0 15rem 15rem 0;
        width: 33.33%;
      }
    }
  }

  &__btn {
    margin-top: 10rem;
    width: 100%;
  }
}
</style>