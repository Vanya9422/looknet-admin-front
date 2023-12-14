<template lang="pug">
section.correct-categories.checkboxs__list
  .correct-categories__box
    h3.min-tablet-hidden Categories corrections
    .correct-categories__level.color-red 1 level
    h3.correct-categories__title.h3 Main category
    draggable.correct-categories__list.flex(
      v-model="listLevel1",
      v-bind="dragOptions",
      group="people",
      handle=".handle",
      @start="drag = true",
      @end="drag = false"
    )
      .correct-categories__item(v-for="(item, i) in listLevel1", :key="i")
        module-category(
          :class="{ active: item.id === level1 }",
          :img="item.picture ? item.picture.original_full_url : ''",
          :name="item.name",
          :counter="item.allSubCategories ? item.allSubCategories.length : 0",
          :checked="item.checked",
          @checked="checkedItem(i, listLevel1, checkedList)",
          @open="openNextLevel1(item.id)"
        )
      .correct-categories__item
        module-category(
          btn,
          icon="camera",
          @click.native="openModal('1 level')"
        )
  .correct-categories__box.level(v-if="level1")
    .correct-categories__level.color-blue 2 level
    h3.correct-categories__title.h3 Category 1
    draggable.correct-categories__list.flex(
      v-model="listLevel2",
      v-bind="dragOptions",
      group="people",
      handle=".handle",
      @start="drag = true",
      @end="drag = false"
    )
      .correct-categories__item(v-for="(item, i) in listLevel2", :key="i")
        module-category(
          :class="{ active: item.id === level2 }",
          :name="item.name",
          :counter="item.allSubCategories ? item.allSubCategories.length : 0",
          @checked="checkedItem(i, listLevel2, checkedList)",
          @open="openNextLevel2(item.id)"
        )
      .correct-categories__item
        module-category(
          btn,
          icon="category-1",
          @click.native="openModal('2 level')"
        )
  .correct-categories__box.level(v-if="level2")
    .correct-categories__level.color-brown 3 level
    h3.correct-categories__title.h3 Category 2
    draggable.correct-categories__list.flex(
      v-model="listLevel3",
      v-bind="dragOptions",
      group="people",
      handle=".handle",
      @start="drag = true",
      @end="drag = false"
    )
      .correct-categories__item(v-for="(item, i) in listLevel3", :key="i")
        module-category(
          :class="{ active: item.id === level3 }",
          :name="item.name",
          :counter="item.allSubCategories ? item.allSubCategories.length : 0",
          @checked="checkedItem(i, listLevel3, checkedList)",
          @open="openNextLevel3(item.id)"
        )
      .correct-categories__item
        module-category(
          btn,
          icon="category-1",
          @click.native="openModal('3 level')"
        )
  .correct-categories__box.level(v-if="level3")
    .correct-categories__level.color-green 4 level
    h3.correct-categories__title.h3 Category 3
    draggable.correct-categories__list.flex(
      v-model="listLevel4",
      v-bind="dragOptions",
      group="people",
      handle=".handle",
      @start="drag = true",
      @end="drag = false"
    )
      .correct-categories__item(v-for="(item, i) in listLevel4", :key="i")
        module-category(
          :class="{ active: item.id === level3 }",
          :name="item.name",
          :counter="item.allSubCategories ? item.allSubCategories.length : 0",
          @checked="checkedItem(i, listLevel4, checkedList)"
        )
      .correct-categories__item
        module-category(
          btn,
          icon="category-1",
          @click.native="openModal('4 level')"
        )
  transition(name="fade")
    part-annoucement-panel.correct-categories__panel(
      v-if="checkedList.length > 0",
      :selected="checkedList.length",
      @closePanel="closePanel",
      modalName="modal-correct-categories"
    )
      template(v-if="checkedList.length === 1")
        button-medium.annoucement-panel__btn(
          icon="duplicate",
          @click.native.prevent="addDuplicatione",
          blue,
          small
        ) Duplicate
        button-medium.annoucement-panel__btn(
          icon="plusBig",
          @click.native.prevent="addItem",
          blue,
          small
        ) Add category
        button-medium.annoucement-panel__btn(
          icon="penEdit",
          @click.native.prevent="editItem",
          blue,
          small
        ) Edit
      button-medium.annoucement-panel__btn(
        icon="delete",
        v-b-modal:modal-delete,
        blue,
        small
      ) Delete
  modal-panel#modal-correct-categories
    template(v-if="checkedList.length === 1")
      .modal-panel__item
        button-border.modal-panel__btn(
          icon="duplicate",
          @click.native.prevent="addDuplicatione",
          BigIcon,
          gray
        ) Duplicate
      .modal-panel__item
        button-border.modal-panel__btn(
          icon="plusBig",
          @click.native.prevent="addItem",
          BigIcon,
          gray
        ) Add category
      .modal-panel__item
        button-border.modal-panel__btn(
          icon="penEdit",
          @click.native.prevent="editItem",
          BigIcon,
          gray
        ) Edit
    .modal-panel__item
      button-border.modal-panel__btn(
        icon="closeBig",
        v-b-modal:modal-delete,
        BigIcon,
        gray
      ) Delete
  modal-category(
    :getLevelIds="getLevelIds",
    :categories="categories",
    :key="category ? category.id : 1",
    :categoryId="category ? category.id : false",
    :categorySlug="category ? category.slug : false",
    :level="level",
    @update="updateLevel",
    @close="modalClose"
  )
  modal-delete(
    @cancel="$bvModal.hide(`modal-correct-categories`)",
    @deleteItem="deleteAll"
  )
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      drag: true,
      listLevel1: [],
      listLevel2: [],
      listLevel3: [],
      listLevel4: [],
      checkedList: [],
      level: "1 level",
      category: null,
      level1: null,
      level2: null,
      level3: null,
    };
  },
  created() {
    this.handleLoad();
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    categories() {
      let array = [{ text: "1 level", color: "red" }];
      if (this.level1) array.push({ text: "2 level", color: "blue" });
      if (this.level2) array.push({ text: "3 level", color: "brown" });
      if (this.level3) array.push({ text: "4 level", color: "green" });
      return array;
    },
    getLevelIds() {
      return [this.level1, this.level2, this.level3];
    },
  },
  watch: {
    listLevel1(val) {
      this.changeOrder(val);
    },
    listLevel2(val) {
      this.changeOrder(val);
    },
    listLevel3(val) {
      this.changeOrder(val);
    },
    listLevel4(val) {
      this.changeOrder(val);
    },
    sort(val) {
      this.page = 0;
      this.handleLoad();
    },
  },
  methods: {
    modalClose() {
      this.category = null;
      this.$bvModal.hide(`modal-correct-categories`);
    },
    checkedItem(i, array = this.list, checkedList = this.checkedList) {
      if (array[i].checked === true) {
        array[i].checked = false;
        this.removeItem(array[i].id, checkedList);
      } else {
        array[i].checked = true;
        checkedList.push(array[i].id);
      }
      this.checkedAll = array.length === checkedList.length;
    },
    removeItem(id, checkedList) {
      const getIndex = checkedList.findIndex((item) => item === id);
      checkedList.splice(getIndex, 1);
    },
    checkedAllItems(flag, list, checkboxes) {
      const checked = [];
      list.forEach((i) => {
        i.checked = flag;
        if (flag) checked.push(i.id);
      });
      this[checkboxes] = checked;
      this.checkedAll = list.length === this[checkboxes].length;
    },
    closePanel() {
      this.checkedList = [];
      this.checkedAll = 0;
      const checkboxes = document.querySelectorAll(
        '.checkboxs__list input[type="checkbox"]'
      );
      checkboxes.forEach((item, i) => (checkboxes[i].checked = false));
    },
    fetchData(id = 0) {
      let search = `/admin/categories?searchJoin=and&orderBy=order&sortedBy=asc&page=1&with=allSubCategories`;
      if (id === 0) search += `;picture&search=parent_category:${id}`;
      else search += `&search=parent_id:${id}`;
      this.$axios.setHeader("Accept-Language", "en");
      return this.$axios.$get(search);
    },
    async handleLoad() {
      await this.fetchData().then(({ data }) => {
        this.listLevel1 = data;
      });
    },
    changeOrder(array) {
      let orders = [];
      array.forEach((item, index) =>
        orders.push({
          id: item.id,
          order: index + 1,
        })
      );
      if (orders.length > 0) {
        this.$axios.$put("/admin/categories/order", { orders }).then((res) => {
          console.log(res);
        });
      }
    },
    openNextLevel1(id) {
      if (id) {
        this.level1 = id;
        this.level2 = null;
        this.level3 = null;
      }
      if (this.level1) {
        this.fetchData(this.level1).then(({ data }) => {
          this.listLevel2 = data;
        });
      }
    },
    openNextLevel2(id) {
      if (id) {
        this.level2 = id;
        this.level3 = null;
      }
      if (this.level2) {
        this.fetchData(this.level2).then(({ data }) => {
          this.listLevel3 = data;
        });
      }
    },
    openNextLevel3(id) {
      if (id) {
        this.level3 = id;
      }
      if (this.level3) {
        this.fetchData(this.level3).then(({ data }) => {
          this.listLevel4 = data;
        });
      }
    },
    openModal(val) {
      this.level = val;
      this.$nextTick(() => {
        this.$root.$emit("bv::show::modal", "modal-category");
      });
    },
    updateLevel(val) {
      this.category = null;
      this.checkedList = [];
      this.closePanel();
      this.handleLoad();
      this.handleLoad();
      this.openNextLevel1();
      this.openNextLevel2();
      this.openNextLevel3();
    },
    getCheckedItemLevelText() {
      const level1 = this.listLevel1.find((i) => i.id === this.checkedList[0]);
      const level2 = this.listLevel2.find((i) => i.id === this.checkedList[0]);
      const level3 = this.listLevel3.find((i) => i.id === this.checkedList[0]);
      const level4 = this.listLevel4.find((i) => i.id === this.checkedList[0]);
      let str = "";
      if (level1) str = 1;
      if (level2) str = 2;
      if (level3) str = 3;
      if (level4) str = 4;
      str += " level";
      return str;
    },
    getCheckedItemLevel() {
      const level1 = this.listLevel1.find((i) => i.id === this.checkedList[0]);
      const level2 = this.listLevel2.find((i) => i.id === this.checkedList[0]);
      const level3 = this.listLevel3.find((i) => i.id === this.checkedList[0]);
      const level4 = this.listLevel4.find((i) => i.id === this.checkedList[0]);
      if (level1) return level1;
      if (level2) return level2;
      if (level3) return level3;
      if (level4) return level4;
    },
    deleteAll() {
      this.$axios
        .$post("/admin/categories", {
          categories: this.checkedList,
          _method: "DELETE",
        })
        .then(() => {
          this.checkedList.forEach((item) => {
            if (item === this.level1) {
              this.level1 = null;
              this.level2 = null;
              this.level3 = null;
            } else if (item === this.level2) {
              this.level2 = null;
              this.level3 = null;
            } else if (item === this.level3) {
              this.level3 = null;
            }
          });
          this.updateLevel();
          this.closePanel();
          this.$bvModal.hide(`modal-correct-categories`);
          this.$root.$emit("bv::hide::modal", "modal-category");
        });
    },
    editItem() {
      this.level = this.getCheckedItemLevelText();
      this.category = this.getCheckedItemLevel();
      this.$nextTick(() => {
        this.$root.$emit("bv::show::modal", "modal-category");
      });
    },
    addDuplicatione() {
      const categories = [
        ...this.listLevel1,
        ...this.listLevel2,
        ...this.listLevel3,
        ...this.listLevel4,
      ];
      const item = categories.find((i) => i.id === this.checkedList[0]);
      if (item) {
        this.$axios.$post(`/admin/categories/${item.slug}`).then(() => {
          this.updateLevel();
          this.$bvModal.hide(`modal-correct-categories`);
        });
      }
    },
    addItem() {
      const str = this.getCheckedItemLevelText();
      this.openModal(str);
    },
  },
};
</script>

<style lang="scss">
.correct-categories {
  // height: calc(100% - 85px);
  padding-bottom: 20rem;

  &__box {
    padding-top: 40rem;
    // height: calc(100% - 52px);

    &:not(:first-child) {
      margin-top: 20rem;
      border-top: 1px solid #d6d6d6;
    }
  }

  &__level {
    font-family: "Atyp Display";
    line-height: 1;
    font-weight: 500;
  }

  &__title {
    margin-top: 15rem;
    font-family: "Atyp Display";
    @include small-tablet {
      margin-top: 6rem;
      font-size: 18rem;
      font-weight: 500;
    }
  }

  &__list {
    padding-top: 20rem;
    margin: 0 0 0 -35rem;
  }

  &__item {
    margin-top: 10rem;
    margin-left: 20rem;
    width: calc(25% - 20rem);
    @include small-tablet {
      margin-top: 0;
    }
    @include large-desktop {
      width: calc(33% - 20rem);
    }
    @include large-tablet {
      width: calc(50% - 20rem);
    }
    @include large-mobile() {
      width: 100%;
      margin-left: 0;
    }
  }

  .module-category {
    @include small-tablet {
      padding: 0rem 5rem 0rem 0rem;
    }
  }

  &__panel {
    margin: 20rem 0 0 0;
  }

  .min-tablet-hidden {
    font-size: 20rem;
    font-family: "Atyp Display";
    font-weight: 500;
    margin-bottom: 20rem;
  }

  .level {
    @include large-mobile {
      .correct-categories__item {
        margin: 5rem 0;
      }
      .module-category {
        min-height: 30rem;
      }
    }
  }
}
</style>
