import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      product: null,
      productId: null,
    };
  },
  watch: {
    STATUS() {
      this.handleLoad();
      this.checkedAllItems();
    },
  },
  created() {
    this.handleLoad();
  },
  computed: {
    ...mapGetters({
      CATEGORY: "category/CATEGORY",
      ADVERTISES: "advertises/ADVERTISES",
      TOTAL: "advertises/TOTAL",
      SWITCHERS: "advertises/SWITCHERS",
      CHECKED_ALL: "advertises/CHECKED_ALL",
      CHECKED_LIST: "advertises/CHECKED_LIST",
      STATUS: "advertises/STATUS",
    }),
  },
  methods: {
    ...mapActions({
      CHANGE_ADVERTISES_STATUS: "advertises/CHANGE_ADVERTISES_STATUS",
      SET_ADVERTISES: "advertises/SET_ADVERTISES",
      SET_CHECKED_ALL: "advertises/SET_CHECKED_ALL",
      SET_CHECKED_LIST: "advertises/SET_CHECKED_LIST",
      SET_BAN_USER_REMOVE: "advertises/SET_BAN_USER_REMOVE",
      BAN_USER: "advertises/BAN_USER",
      GET_BAN_USER: "advertises/GET_BAN_USER",
      GET_ACTIVE_PRODUCT_ID: "advertises/GET_ACTIVE_PRODUCT_ID",
      GET_ACTIVE_PRODUCT_ID_REMOVE: "advertises/GET_ACTIVE_PRODUCT_ID_REMOVE",
      SET_ACTIVE_PRODUCT: "advertises/SET_ACTIVE_PRODUCT",
      SET_PAGE: "advertises/SET_PAGE",
      SET_PRODUCT_STATUS: "advertises/SET_PRODUCT_STATUS",
    }),
    searchProduct() {
      this.SET_PAGE(1);

      this.handleLoad();
    },
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("yyyy-MM-DD");
    },
    getFilters() {
      let category = [{ name: "category_id", value: "" }];
      if (this.CATEGORY.id) category[0].value = this.CATEGORY.id;
      if (
        this.filter1[0].date[0] !== null &&
        this.filter1[0].date[1] !== null
      ) {
        this.filter1[0].value = `${this.generateDate(
          this.filter1[0].date[0]
        )},${this.generateDate(this.filter1[0].date[1])}`;
      }
      let price = [{ name: "price", value: "" }];
      if (this.cost.min !== "" && this.cost.max !== "") {
        price[0].value =
          this.cost.max.split(" ").join("").split(",").join(".") * 1;
      }
      return [...this.filter, ...this.filter1, ...price, ...category];
    },
    handleLoadMore($state) {
      this.SET_ADVERTISES(this.getFilters()).then((loadState) => {
        if (loadState) $state.loaded();
        else $state.complete();
      });
    },
    handleLoad() {
      const ref = this.$refs.infiniteLoading;
      const ref1 = this.$refs.infiniteLoading1;
      if (ref) this.$refs.infiniteLoading.stateChanger.reset();
      if (ref1) this.$refs.infiniteLoading1.stateChanger.reset();
      this.SET_ADVERTISES(this.getFilters()).then(() => console.log("ok"));
    },
    checkedItem(i) {
      this.SET_CHECKED_LIST(i);
    },
    checkedAllItems(flag = false) {
      this.SET_CHECKED_ALL(flag);
    },
    panelSelectedAll() {
      if (window.innerWidth > 580) this.panelOpen = true;
      else this.$root.$emit("bv::show::modal", "modal-panel");
      this.SET_CHECKED_ALL(!this.CHECKED_ALL);
    },
    banPersonModal(id = false) {
      this.GET_BAN_USER(id).then(() => {
        this.SET_CHECKED_ALL(false);
        this.$root.$emit("bv::show::modal", "modal-ban-user");
      });
    },
    banPerson(flag = false) {
      if (!flag)
        this.BAN_USER().then(() =>
          this.$root.$emit("bv::hide::modal", "modal-product")
        );
      else this.SET_BAN_USER_REMOVE();
    },
    changeCategory(id = null) {
      this.GET_ACTIVE_PRODUCT_ID(id).then(() => {
        this.$bvModal.show(`modal-categories`);
        this.$bvModal.hide(`modal-product-action`);
      });
    },
    changeCategoryModal(category) {
      this.SET_ACTIVE_PRODUCT(category).then(() => {
        this.SET_CHECKED_ALL(false);
        this.$bvModal.hide(`modal-product`);
        this.$bvModal.hide(`modal-categories`);
      });
    },
    changeProductStatus({ id, status }) {
      this.productId = id;
    },
    productsNoActive(form) {
      this.productChange({
        status: 3,
        advertises: this.checkedListFlag ? this.checkedList : [this.productId],
        refusal_comment: form.comment,
        // refusal_id:1
      });
    },
    productsDeactivate(id) {
      this.productChange({
        status: 3,
        advertises: this.CHECKED_LIST,
      });
    },
    productsActive() {
      this.productChange({
        status: 1,
        advertises: this.checkedListFlag ? this.checkedList : [this.productId],
      });
    },
    showProduct(item) {
      this.$axios
        .$get(
          `/admin/products/${item.slug}/details?with=city;author.avatar;category;gallery;answers.filter&`
        )
        .then(({ data }) => {
          this.product = data;
          this.$root.$emit("bv::show::modal", "modal-product");
        });
    },
    productChange(data) {
      this.SET_PRODUCT_STATUS({ data, productId: this.productId }).then(() => {
        this.checkedList = [];
        this.checkedListFlag = false;
        this.productId = null;
        this.$root.$emit("bv::hide::modal", "modal-product");
      });
    },
  },
};
