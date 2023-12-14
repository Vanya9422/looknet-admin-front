<template lang="pug">
main.main
  section.section-user(v-if="user")
    .section-user__row
      .section-user__column.section-user__column_left
        part-user-box.section-user__box(
          :name="user.full_name",
          :avatar="user.avatar",
          :buttonText="!user.banned ? 'Ban' : 'UnBan'",
          @btn="banUser",
          about="",
          :edit="false",
          :list="userList"
        )
        modal-delete(title="Ban user", @deleteItem="banUserModal")
      .section-user__column.section-user__column_right
        button-back.color-blue(blue, @click.prevent.native="$router.go(-1)") Back
        .section-user__publications
          h3.section-user__title.h3 Publications
          part-back-nav.section-user__nav(
            :nav="nav",
            :status="status",
            @change="changeStatus",
            mobile,
            mobileBlue
          )
          .section-user__publications-list.flex(
            v-if="list.length > 0",
            :key="key"
          )
            item-card.section-categories__item(
              v-for="(item, i) in list",
              :key="i",
              :name="item.name",
              :city="item.city ? item.city.name : '-'",
              :distance="item.distance || '2 km near you'",
              :date="item.created_at",
              :phoneNumber="item.contact_phone",
              :price="item.price",
              :price-policy="item.price_policy",
              :status="item.type",
              :to="item.slug",
              :id="item.id",
              :gallery="item.gallery",
              @show="showProduct(item)"
            )
          list-null(v-else)
    modal-activated(
      @close="checkedListFlag = false",
      @continue="productsActive"
    )
      | You have activated the ad, if it is an error, click «Cancel»
    modal-refusal(
      @close="checkedListFlag = false",
      @continue="productsNoActive"
    )
    modal-ban-person(@close="banUserModal", @ban="banUserModal")
    modal-product(
      :product="product",
      @changeCategory="changeCategory(product.id)",
      @status="changeProductStatus",
      @ban="banUser",
      @close="GET_ACTIVE_PRODUCT_ID_REMOVE"
    )
    modal-categories(@continue="changeCategoryModal")
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
import getProducts from "@/mixins/getProducts";
import getProductsFilters from "@/mixins/getProductsFilters";

export default {
  middleware: ["showUsers"],
  mixins: [getProducts, getProductsFilters],

  data() {
    return {
      user: null,
      nav: [
        {
          text: "Active",
          status: 1,
        },
        {
          text: "Inactive",
          status: 2,
        },
        {
          text: "Сanceled",
          status: 3,
        },
      ],
      status: 1,
      key: 1,
      list: null,
      // product: null,
      // productId: null,
    };
  },
  computed: {
    userList() {
      if (this.user) {
        return [
          {
            label: "Email",
            text: this.user.email || "-",
          },
          {
            label: "Phone",
            text: this.user.phone_view ? "+" + this.user.phone_view : "-",
          },
          {
            label: "Date register",
            text: this.generateDate(this.user.created_at),
          },
          {
            label: "ID",
            text: this.user.id || "-",
          },
          {
            label: "Publications",
            text: this.user.advertises_count,
          },
          {
            label: "Сanceled publications",
            text: this.user.canceled_advertises_count,
          },
        ];
      }
    },
  },
  created() {
    this.handleLoad();
    // this.getUserProducts();
  },

  methods: {
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    changeStatus(item) {
      this.status = item.status;
      this.fetchData().then((res) => {
        this.user = res.user;
        this.list = res.data;
        this.key++;
      });
    },
    // changeProductStatus({id, status}) {
    //   this.productId = id
    // },
    // productsNoActive(form) {
    //   this.productChange({
    //     status: 2,
    //     advertises: this.checkedListFlag ? this.checkedList : [this.productId],
    //     refusal_comment: form.comment
    //   })
    // },
    // productsActive() {
    //   this.productChange({
    //     status: 1,
    //     advertises: this.checkedListFlag ? this.checkedList : [this.productId]
    //   })
    // },
    //   showProduct(item) {
    //     this.$axios.$get(`/products/${item.slug}?with=city;author.avatar;category;gallery;answers.filter&`).then(({data}) => {
    //       this.product = data
    //       this.$root.$emit('bv::show::modal', 'modal-product')
    //     })
    //   },
    getCountProducts(status = 1) {
      let count = 0;
      this.user.advertises.forEach((i) => {
        if (i.status === status) count++;
      });
      return count;
    },
    fetchData() {
      let search = `/admin/users/${
        this.$route.params.id
      }?page=1&searchJoin=and&search=status:${
        this.status - 1
      }&with=gallery;city;author`;
      return this.$axios.$get(search);
    },
    handleLoad() {
      this.fetchData().then((res) => {
        this.user = res.user;
        this.list = res.data;
        this.key++;
      });
    },
    ...mapActions({
      SET_DETAIL_LIST: "product/SET_DETAIL_LIST",
      SET_DETAIL_ACTIVE: "product/SET_DETAIL_ACTIVE",
    }),
    openProductModal(index, array) {
      const list = [];
      array.forEach((item) => list.push(item.slug));
      console.log(list);
      this.SET_DETAIL_LIST(list);
      this.SET_DETAIL_ACTIVE(index);
    },
    banUserModal() {
      let str = "/admin/users/banned";
      this.$axios
        .$put(str, {
          banned_ids: [this.$route.params.id],
          type: !this.user.banned ? 1 : 0,
        })
        .then((res) => {
          this.$router.go(-1);
        });
    },
    banUser() {
      this.$bvModal.show(`modal-delete`);
    },
  },
};
</script>

<style lang="scss">
.section-user {
  padding: 30rem 0 80rem 0;

  @include large-mobile {
    padding: 10rem 0 70rem 0;
  }

  &__row {
    display: flex;
    @include large-tablet {
      flex-wrap: wrap;
    }
  }

  &__column {
    &_left {
      width: 355rem;
      min-width: 355rem;

      @include min-large-tablet {
        position: sticky;
        height: 100%;
        top: 20px;
      }
    }

    &_right {
      width: 100%;
      margin-left: 40rem;
      @include min-large-tablet {
        width: calc(100% - 355px);
        position: relative;
        padding-top: 48px;
      }
    }

    .button-back {
      display: none;
    }

    @include min-large-tablet {
      .button-back {
        position: absolute;
        top: -10px;
        left: -18px;
        display: flex;
      }
    }

    @include large-tablet {
      width: 100%;
      min-width: inherit;
      &_right {
        margin-left: 0;
        margin-top: 50rem;
      }
    }

    @include large-mobile {
      &_right {
        margin-top: 38rem;
      }
    }
  }

  &__title {
    font-family: "Atyp Display";
    font-weight: 500;
  }

  &__nav {
    margin-top: -15rem;

    .back-nav__row {
      justify-content: flex-end;
    }

    @include large-mobile {
      margin-top: 15rem;
    }
  }

  &__publications {
    &-list {
      @include items(3, 6);
      padding-top: 30rem;
      gap: 20px 0;
    }

    &-item {
      //margin-top: 25rem;
      margin: 25px 0;
    }

    @include min-large-mobile {
      .item-card__gallery {
        padding-top: 67.27%;
      }
    }

    @include large-mobile {
      &-list {
        @include items(2, 5);
      }
      &-item {
        margin-top: 15rem;
      }
    }
  }

  &__settings {
    &-item {
      &:not(:first-child) {
        margin-top: 60rem;
      }

      @include large-mobile {
        &:not(:first-child) {
          margin-top: 40rem;
        }
      }
    }

    &-field {
      padding: 20rem;
      margin-left: -20rem;
      border-bottom: 1px solid $light-gray;

      @include small-desktop {
        padding-right: 0;
      }

      @include large-tablet {
        padding: 15rem 0;
        margin-left: 0;
      }

      @include large-mobile {
        padding: 27rem 0 20rem 0;
      }
    }
  }
}
</style>
