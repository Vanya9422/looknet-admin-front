<template lang="pug">
.annoucement-table
  table
    thead
      tr
        th
          form-checkbox(
            :checked="checkedAll",
            @change.native="$emit('checkedAll')"
          )
        th Image
        th Name
        th Categories
        th User
        th Email
        th Phone
        th Status
        th Date public
        th ID
    tbody
      tr(v-for="(row, i) in rows", :key="i")
        td
          form-checkbox.users-table__checkbox(
            :checked="row.checked",
            @change.native="$emit('checked', i)"
          )
        td
          .annoucement-table__img
            set-img.object-fit(
              :src="row.gallery.length > 0 ? row.gallery[0] : ''",
              :defaultImg="require('assets/img/default-product.jpg')"
            )
        td
          .annoucement-table__name.text-wrap {{ row.name || "" }}
        td.text-wrap {{ row.category ? row.category.name : "" }}
        td
          span.auth_name.text-wrap {{ row.author ? row.author.full_name : "" }}

        td.text-wrap {{ row.author ? row.author.email : "" }}
        td.text-wrap {{ row.contact_phone ? "+" + row.contact_phone : "" }}
        td.text-wrap {{ getStatus(row.status) }}
        td.text-wrap {{ generateDate(row.created_at) }}
        td
          .annoucement-table__row
            .annoucement-table__id {{ row.id }}
            .annoucement-table__buttons
              button-medium.annoucement-table__btn(
                icon="arrowRight",
                border,
                square,
                @click.prevent.native="showProduct(row)"
              )
              .item-absalute(@click.prevent="showProduct(row)")
  slot
</template>

<script>
import moment from "moment";
export default {
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    status: {
      type: Number,
      default: 0,
    },
    checkedAll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    showProduct(row) {
      this.$emit("show", { slug: row.slug });
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    getStatus(statusNumber) {
      if (statusNumber === this.$status.notVerified) return "not Verifed";
      if (statusNumber === this.$status.active) return "Active";
      if (statusNumber === this.$status.nonActive) return "No Active";
      if (statusNumber === this.$status.rejected) return "Rejected";
      if (statusNumber === this.$status.banned) return "Banned";
      if (statusNumber === this.$status.draft) return "in Draft";
    },
  },
};
</script>

<style lang="scss">
.annoucement-list__table {
  position: relative;
}

.auth_name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  display: block;
}

.annoucement-table {
  .item-absalute {
    position: absolute;
    right: 0;
    height: 91px;
    width: calc(100% - 30px);
    z-index: 1;
    top: auto;
    transform: translateY(-25px);
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tbody tr:hover {
    cursor: pointer;

    .annoucement-table__name {
      color: $blue;
    }

    .annoucement-table__btn {
      border-color: $blue;

      svg {
        stroke: $blue;
      }
    }
  }

  tr {
    border-bottom: 1px solid $light-gray;
    position: relative;
  }

  th {
    color: $gray;
    font-weight: 500;
    padding-bottom: 17rem;
  }

  th,
  td {
    &:first-child {
      width: 40rem;
    }

    &:nth-child(2) {
      width: 78rem;
    }

    &:nth-child(3) {
      width: 17%;
    }

    &:last-child {
      width: 62px;
    }
  }

  td {
    padding-bottom: 15rem;
    padding-top: 15rem;
    font-size: 15rem;
    font-weight: normal;
  }

  &__img {
    position: relative;
    overflow: hidden;
    width: 63rem;
    height: 60rem;
    border-radius: 10rem;
  }

  &__name {
    max-width: 223rem;
    padding-right: 20rem;
    font-weight: 500;
    transition: 0.3s;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__buttons {
    display: flex;
    margin-left: 20rem;
  }

  &__btn {
    transition: 0.3s;

    &:not(:first-child) {
      margin-left: 5rem;
    }

    &:last-child {
      margin-left: 10rem;
    }
  }
}

.annoucement-table__btn .button-medium__icon {
  stroke: #6e6e73;
  stroke-width: 2;
  width: 10px;
  height: 10px;
}
</style>