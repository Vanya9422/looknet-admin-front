<template lang="pug">
  .correct-head
    .correct-head__row.flex.flex_vertical.flex_justify
      .correct-head__column.correct-head__column_left
        h1.correct-head__title.h2.h2_big {{title}}
      .correct-head__column.correct-head__column_right.flex.flex_vertical
        button-switcher-links.correct-head__switcher(:items="switchers" blue)
        slot
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: 'Web site corrections'
    },
  },
  data() {
    return {
    }
  },
  computed:{

    switchers(){
      const switchers = []
      const tabs = {
        website: {
          value: 'Web site',
          text: 'Web site',
          link: '/redaction/web'
        },
       categories: {
          value: 'Categories',
          text: 'Categories',
          link: '/redaction/categories'
        },
        gallery: {
          value: 'Gallery',
          text: 'Gallery',
          link: '/redaction/gallery'
        }
      }

      const hasCategories =  this.$auth.user.permissions_ids.includes(4)
      const hasWebsite =  this.$auth.user.permissions_ids.includes(3)


      if(hasWebsite) {
        switchers.push(tabs.website)
        switchers.push(tabs.gallery)
      }

      if(hasCategories) {
        switchers.push(tabs.categories)
      }

      return switchers

    }
  }
}
</script>

<style lang="scss">
.correct-head {
  margin-top: 30rem;

  @include large-mobile {
    margin-top: 15rem;
  }

  &__column {
    @include small-tablet {
      width: 100%;
      display: block;
      &_left {
        display: none;
      }
    }
  }

  &__switcher {
    order: 2;
  }

  &__btn {
    min-width: 180rem;
    margin-right: 10rem;
    order: 1;

    @include small-tablet {
      margin-top: 30rem;
      min-width: 190rem;
    }
  }
}
</style>
