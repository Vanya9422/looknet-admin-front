<template lang="pug">
  .single-content
    h3.single-content__heading.h3 Description

    ul.single-content__list.color-gray.flex.flex_vertical.p
      li.single-content__list-item(v-for="(item, i) in answers" :key="i")
        | {{  item.filter.name  }}
        b {{ item.name }}

    .single-content__content.content.h4
      p  {{!readMore === false ? description : description.slice(0,300)+'...'}}
      span.single-content__more.blue-link.p(v-if="description.split('').length > 300" @click="readMore = !readMore")  {{readMore === false ? 'More' : 'Hide'}}

    .single-content__category
      p(v-for="itemCategory of category.parentCategories") {{ itemCategory.name }}/
      p {{ category.name }} {{ category.allSubcategories ? '/' : '' }}
      p(v-for="itemSubcategory of category.allSubCategories") {{ itemSubcategory.name }}
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: ''
    },
    answers: {
      type: Array,
      default: []
    },
    category: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      Labels: [
        {
          name: "Condition:",
          value: "Used",
        },
        {
          name: "Production:",
          value: "Apple",
        },
      ],
      readMore: false,
    }
  }
}
</script>

<style lang="scss">
.single-content {
  &__category {
    display: flex;
    align-items: center;
    padding-top: 6rem;
    p {
      font-size: 16rem;
    }
  }
  &__content {
    line-height: 150%;
    font-weight: 400;
    padding-right: 45rem;

    & > * {
      &:not(:last-child) {
        margin-bottom: 28rem;
      }
    }

    @include small-tablet {
      padding-right: 0;
    }

    @include large-mobile {
      line-height: 21rem;

      & > * {
        &:not(:last-child) {
          margin-bottom: 20rem;
        }
      }
    }
  }

  &__more {
    margin-top: 30rem;
    cursor: pointer;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__heading {
    margin-bottom: 30rem;
  }

  &__list {
    margin-bottom: 15rem;

    &-item {
      display: block;
      margin-right: 30rem;

      margin-bottom: 15rem;
    }

    b {
      color: #212D38;
      margin-left: 10rem;
    }

    @include large-mobile {
      margin-bottom: 10rem;

      &-item {
        margin-bottom: 10rem;
      }
    }
  }
}
</style>
