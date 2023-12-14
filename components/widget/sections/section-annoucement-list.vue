<template lang="pug">
  section.annoucement-list.checkboxs__list
    .annoucement-list__head.flex.flex_vertical.flex_justify
      .annoucement-list__title
        h1.annoucement-list__title-text.h2.h2_big {{title}}
        span.annoucement-list__title-counter.h3 ({{TOTAL}})
      button-switcher.annoucement-list__switcher(:items="SWITCHERS" @change="CHANGE_ADVERTISES_STATUS" blue)
    part-search-filter.annoucement-list__filter(:key="filterKey"  :disabled="search" @search="searchProduct")
      div.part-search-filter-category
        button-select.search-form__select(borderRight  name="tippyCategories") {{ CATEGORY.name ||  'Category' }}
        transition(name="page" v-if=" CATEGORY.name")
          button-close.modal-search__clear( @click.native.prevent="removeCategory"   type="button")
        tippy.tippy-hide(to="tippyCategories" placement="bottom-start" trigger="click" )
          part-modal-categories(
            :categories="CATEGORIES"
            :active="CATEGORY"
            @active="changeActive"
          )
      template( v-for="(item,i) in filter")
        form-input.search-filter__field(
          :key="i"
          :class="{focus:item.value.length > 0 }"
          :type="item.key=== 'contact_phone_numeric' ? 'number': 'text'"
          :name="item.name"
          :label="item.label"
          v-model="item.value"
        )
          transition(name="page" v-if="item.value.length> 0")
            button-close.modal-search__clear( @click.native.prevent="removeValue(i)"  type="button")
      form-input.search-filter__field(
        v-for="(item,i) in filter1 "
        :key="`new-${i}`"
        :class="{focus:openDatePiker || item.date[0]  !== null}"
        :name="item.name"
        :label="item.label"
      )
        template(#input)
          date-picker.two-column.input__field(
            @open="openDatePiker = true"
            @close="openDatePiker = false"
            @change="search = false"
            format="DD.MM.YYYY"
            v-model="item.date" range)
        transition(name="page" v-if="item.date[0]  !== null")
          button-close.modal-search__clear( @click.native.prevent="removeDate()"  type="button")
      form-input.search-filter__field(
        :class="{focus:cost.max.length > 0}"
        name="cost"
        label="Cost"
        @clickLabel="costFlag = true"
      )
        template(#input)
          input.input__field( id="cost" name="cost" v-model="cost.max" )
        transition(name="page" v-if="cost.max.length > 0")
          button-close.modal-search__clear( @click.native.prevent="removeCost()"  type="button")

    button-action.section-users__btn-filter(circle icon="sliders" v-b-modal.modal-filter v-if="!$screen.st")
    modal-filter(@search="searchProduct" @clear="clearSearch()" v-if="!$screen.st")
      .modal-login__field
        label.registration-form__label.p.b Categories
        part-modal-categories(
          :categories="CATEGORIES"
          :active="CATEGORY"
          @active="changeActive"
        )
      .modal-login__field(v-for="(item,i) in filter " :key="i")
        label.registration-form__label.p.b {{item.label}}
        form-input(
          :placeholder="item.label"
          :type="item.key=== 'contact_phone_numeric' ? 'number': 'text'"
          :name="item.name"
          v-model="item.value"
          @input="search = false"
        )
      .modal-login__field.filter-date(v-for="(item,i) in filter1 " :key="i")
        label.registration-form__label.p.b {{item.label}}
        form-input.search-filter__field(
          placeholder="Enter date"
          :name="item.name"
        )
          template(#input)
            date-picker.two-column.input__field(
              placeholder="Enter date"
              @open="openDatePiker = true"
              @close="openDatePiker = false"
              @change="search = false"
              format="DD.MM.YYYY"
              v-model="item.date" range)
      .modal-login__field
        label.registration-form__label.p.b Cost
        form-input(
          name="cost"
          label=""
          @clickLabel="costFlag = true"
        )
          template(#input)
            input.input__field(placeholder="Cost"     name="cost" v-model="cost.max" )
          transition(name="page" v-if="cost.max.length > 0")

    form-checkbox.annoucement-list__select-all(:checked="CHECKED_ALL" @change.native="panelSelectedAll" v-if="!$screen.st")
      span.color-gray.h6 Select all
    part-annoucement-table.annoucement-list__table(
      v-if="ADVERTISES.length > 0"
      :rows="ADVERTISES"
      :status="STATUS"
      :checkedAll="CHECKED_ALL"
      @checked="checkedItem"
      @checkedAll="panelSelectedAll"
      @show="showProduct"
      @status="changeProductStatus"
    )
      infinite-loading( @distance="20" ref="infiniteLoading1" @infinite="handleLoadMore")
        div(slot="no-results")
        div(slot="no-more")
        div(slot="spinner")
    .annoucement-list__items(v-if="ADVERTISES.length > 0")
      item-annoucement.annoucement-list__item(
        v-for="(item, i) in ADVERTISES"
        :key="i"
        :checked="item.checked"
        :name="item.name"
        :user="item.author"
        :category="item.category"
        :status="item.status"
        :date="item.created_at"
        :to="item.to"
        :preview="item.gallery.length > 0 ? item.gallery[0] : ''"
        @checked="checkedItem(i)"
        @show="showProduct({slug:item.slug})"
        small
      )
      infinite-loading(:distance="20" ref="infiniteLoading" @infinite="handleLoadMore")
        div(slot="no-results")
        div(slot="no-more")
        div(slot="spinner")
    //list-null( v-if="ADVERTISES.length === 0")
    transition(name="fade")
      part-annoucement-panel.annoucement-list__panel(v-if="CHECKED_LIST.length > 0"   @closePanel="SET_CHECKED_ALL(false)" :selected="CHECKED_LIST.length" modalName="modal-annoucement-list")
        template(v-if="CHECKED_LIST.length === 1")
          button-medium.annoucement-panel__btn(icon="category" blue small @click.prevent.native="changeCategory()") Change categories
          button-medium.annoucement-panel__btn( v-if="CHECKED_LIST.length === 1" @click.native.prevent="banPersonModal()" icon="minusCircle" blue small) Ban
            span.hidden  this person
        button-medium.annoucement-panel__btn(v-if="STATUS === 1" icon="closeCircle" blue small @click.prevent.native="productsDeactivate()") Deactivate


    modal-panel(id="modal-annoucement-list")
      template(v-if="CHECKED_LIST.length === 1")
        .modal-panel__item
          button-border.modal-panel__btn(v-if="CHECKED_LIST.length === 1" icon="category" blue BigIcon @click.prevent.native="changeCategory()") Change categories
        .modal-panel__item
          button-border.modal-panel__btn( v-if="CHECKED_LIST.length === 1" icon="minusCircle" @click.native.prevent="banPersonModal()" BigIcon gray) Ban this person

    modal-panel(id="modal-product-action" withoutClose)
      .modal-panel__item
        button-border.modal-panel__btn(icon="category" BigIcon blue @click.native.prevent="changeCategory(product.id)") Change categories
      .modal-panel__item
        button-border.modal-panel__btn(icon="minusCircle" BigIcon gray) Ban this person
    modal-activated(@close="checkedListFlag = false" @continue="productsActive")
      | You have activated the ad, if it is an error, click «Cancel»
    modal-refusal(@close="checkedListFlag = false" @continue="productsNoActive")
    modal-ban-person(@close="banPerson('remove')" @ban="banPerson()")
    modal-product(:product="product" @changeCategory="changeCategory(product.id)"  @status="changeProductStatus" @ban="banPersonModal(product.id)" @close="GET_ACTIVE_PRODUCT_ID_REMOVE")
    modal-categories(@continue="changeCategoryModal")
</template>

<script>
import getProducts from "@/mixins/getProducts";
import getProductsFilters from "@/mixins/getProductsFilters";

export default {
  middleware: ['admin'],
  props: {
    title: {
      type: String,
      default: "Advertises"
    },
  },
  // data() {
  //   return {
  //     product: null,
  //     productId: null,
  //   }
  // },
  created() {
    this.SET_CATEGORIES('en')
  },
  mixins: [getProducts, getProductsFilters],
  methods: {
    // showProduct(item) {
    //   this.$axios.$get(`/products/${item.slug}?with=city;author.avatar;category;gallery;answers.filter&`).then(({data}) => {
    //     this.product = data
    //     this.$root.$emit('bv::show::modal', 'modal-product')
    //   })
    // },
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
    // productChange(data) {
    //   this.SET_PRODUCT_STATUS({data, productId: this.productId})
    //       .then(() => {
    //         this.checkedList = []
    //         this.checkedListFlag = false
    //         this.productId = null
    //         this.$root.$emit('bv::hide::modal', 'modal-product')
    //       })
    // },
  }
}
</script>

<style lang="scss">
@include min-large-mobile {
  .cost {
    input {
      opacity: 0;
    }

    &.focus input,
    &:focus-within input {
      opacity: 1;
    }

  }
}

.part-search-filter-category {
  display: flex;
  align-items: center;
  position: relative;
}

.button-select_border-right .button-select__head {
  border: 0 !important;
}

.button-select__text {
  max-width: 100px;
  width: 100%;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.annoucement-list {
  padding: 30rem 0;

  @include small-tablet {
    padding-bottom: 80rem;
  }

  @include large-mobile {
    padding: 20rem 0 60rem 0;
  }

  &__title {
    display: flex;

    &-text {
      font-family: 'Atyp Display';
      font-weight: 500;
    }

    &-counter {
      font-family: 'Atyp Display';
      margin-left: 10rem;
      font-weight: 500;
      padding-top: 10rem;
      font-size: 24rem;
      color: #9A9A9A;
    }

    @include large-tablet {
      &-counter {
        font-size: 18rem;
        padding-top: 8rem;
      }
    }

    @include large-mobile {
      &-counter {
        font-size: 17rem;
        padding-top: 5rem;
        margin-left: 8rem;
      }
    }
  }

  &__switcher {
    @include large-mobile {
      margin-top: 15rem;
      width: calc(100% + 30rem);
    }
  }

  &__filter {
    margin-top: 40rem;
  }

  &__table {
    margin-top: 50rem;

    @include large-tablet {
      display: none !important;
    }
  }

  &__panel {
    margin-left: 0;
    margin-right: 0;
    margin-top: 10rem;
  }

  &__items {
    @include min-large-tablet {
      display: none;
    }
  }

  &__select-all {
    margin-top: 15rem;
    @include min-large-tablet {
      display: none;
    }
  }

  &__item {
    padding: 15rem 0;
    border-bottom: 1px solid $light-gray;
  }
}


.w-40 {
  width: 40%;
  display: inline-flex !important;
}

.w-50 {
  width: 50%;
  display: inline-flex !important;
}

@include large-mobile {
  .input.cost {
    display: flex;
    gap: 10px;
  }
}

.annoucement-list.section-users__panel-wrap {
  margin-top: 15px !important;
}

</style>
