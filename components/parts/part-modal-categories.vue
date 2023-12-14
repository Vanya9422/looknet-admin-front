<template lang="pug">
  .filter-category
    .filter-category--list
      .filter-category--item(v-for="item in categories" :key="item.id")
        .filter-category--item_info(:class="{active:actives[0] === item.id || shows[0] === item.id}")
          span.filter-category--item_inner
            .filter-category--arrow( @click="changeCategory(item.slug,item,0,true)")
              svg-icon.arrow(v-if="item.allSubCategories.length > 0" name="arrowDown")
              svg-icon.dote(v-else name="dot")
            span.filter-category--title(  :class="{active:active.id===item.id}" @click.prevent="changeCategory(item.slug,item,0)") {{item.name}}
          span.filter-category--item_right
            .filter-category--number
            span(v-if="mobile")
              form-radio.filter-category--radio(:checked="active.id===item.id" @change="changeCategory(item.slug,item,0)")
        transition-group(name="slide"  v-on:before-enter="beforeEnter" v-on:enter="enter"
          v-on:before-leave="beforeLeave" v-on:leave="leave")
          .filter-category--item.filter-category--item_child(
            v-for="item1 in item.allSubCategories"
            :key="item1.id"
            v-show="shows[0] === item.id"
          )
            .filter-category--item_info(:class="{active:actives[1] === item1.id || shows[1] === item1.id  }")
              span.filter-category--item_inner
                .filter-category--arrow(:class="{'opacity-0':item1.allSubCategories.length === 0}"  @click="changeCategory(item1.slug,item1,1,true)")
                  svg-icon.arrow(v-if="item1.allSubCategories.length > 0" name="arrowDown")
                  svg-icon.dote(v-else name="dot")
                span.filter-category--title(
                  :class="{active:active.id===item1.id}"
                  @click.prevent="changeCategory(item1.slug,item1,1)") {{item1.name}}
              span.filter-category--item_right
                .filter-category--number
                span(v-if="mobile")
                  form-radio.filter-category--radio(:checked="active.id===item1.id" @change="changeCategory(item1.slug,item1,1)")
            transition-group(name="slide" v-on:before-enter="beforeEnter" v-on:enter="enter"
              v-on:before-leave="beforeLeave" v-on:leave="leave")
              .filter-category--item.filter-category--item_child(
                v-for="item2 in item1.allSubCategories" :key="item2.id"
                v-show="shows[1] === item1.id"
              )
                .filter-category--item_info(:class="{active:actives[2] === item2.id || shows[2] === item2.id}")
                  span.filter-category--item_inner
                    .filter-category--arrow(:class="{'opacity-0':item2.allSubCategories.length === 0}"  @click="changeCategory(item2.slug,item2,2,true)")
                      svg-icon.arrow(v-if="item2.allSubCategories.length > 0" name="arrowDown")
                      svg-icon.dote(v-else name="dot")
                    span.filter-category--title(  :class="{active:active.id===item2.id}" @click.prevent="changeCategory(item2.slug,item2,2)") {{item2.name}}
                  span.filter-category--item_right
                    .filter-category--number
                    span(v-if="mobile")
                      form-radio.filter-category--radio(:checked="active.id===item2.id" @change="changeCategory(item2.slug,item2,2)")
                transition-group(name="slide" v-on:before-enter="beforeEnter" v-on:enter="enter"
                  v-on:before-leave="beforeLeave" v-on:leave="leave")
                  .filter-category--item.filter-category--item_child(
                    v-for="item3 in item2.allSubCategories" :key="item3.id"
                    v-show="shows[2] === item2.id"
                  )
                    .filter-category--item_info(:class="{active:actives[3] === item3.id || shows[3] === item3.id}")
                      span.filter-category--item_inner
                        .filter-category--arrow(:class="{'opacity-0':item3.allSubCategories.length === 0}"  @change="changeCategory(item3.slug,item3,3,true)" )
                          svg-icon.arrow(v-if="item3.allSubCategories.length > 0" name="arrowDown")
                          svg-icon.dote(v-else name="dot")
                        span.filter-category--title(  :class="{active:active.id===item3.id}" @click.prevent="changeCategory(item3.slug,item3,3)") {{item3.name}}
                      span.filter-category--item_right
                        .filter-category--number
                        span(v-if="mobile")
                          form-radio.filter-category--radio(:checked="active.id===item3.id" @change="changeCategory(item3.slug,item3,3)")

</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    categories: {
      type: Array,
      default: () => ([])
    },
    active: {
      type: Object,
      default: null
    },
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      shows: [0],
      actives: [0]
    }
  },
  watch: {
    active(val) {
      if (Object.keys(val).length === 0) {
        this.shows = [0]
        this.actives = [0]
      }
    }
  },
  methods: {
    ...mapActions({
      SET_CATEGORY: 'category/SET_CATEGORY',
    }),
    beforeEnter: function (el) {
      el.style.minHeight = '0';
    },
    enter: function (el) {
      el.style.minHeight = el.scrollHeight + 'px';
    },
    beforeLeave: function (el) {
      el.style.minHeight = el.scrollHeight + 'px';
    },
    leave: function (el) {
      el.style.minHeight = '0';
    },
    changeCategory(slug, item, index, flag = false) {
      if (flag) {
        if (this.shows.length > 0) this.shows.splice(index + 1, this.shows.length - index)
        if (this.actives.length > 0) this.actives.splice(index + 1, this.actives.length - index)
        if (this.shows[index] === item.id) {
          this.shows[index] = 0
          this.actives[index] = 0
        } else {
          this.actives[index] = item.id
          this.shows[index] = item.id
        }
      } else {
        this.SET_CATEGORY(slug)
        if (this.shows.length > 0) this.shows.splice(index, this.shows.length - index)
        if (this.actives.length > 0) this.actives.splice(index, this.actives.length - index)
        this.actives[index] = item.id
        this.shows[index] = item.id
      }
    }
  }
}
</script>

<style lang="scss">
.filter-category {
  min-width: 280px;
  padding: 10px 20px;
  @include large-mobile{
    padding: 0;
  }

  &--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 10px;
    font-weight: 600;

    &_title {
      color: $default;
      transition: all 0.3s;

      &:hover {
        color: $blue
      }
    }
  }

  &--number {
    color: #9A9A9A;
  }

  &--arrow {
    width: 28px;
    height: 20px;
    border-radius: 59px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    margin-right: 10px;

    .arrow {
      width: 10px;
      height: 6px;
      stroke: #9A9A9A;
      fill: transparent;
    }

    .dote {
      width: 6px;
      height: 6px;
      stroke: #9A9A9A;
      fill: #9A9A9A;
    }
  }

  &--title {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #9A9A9A;

    &.active {
      color: $blue;
    }
  }

  &--radio {
    margin-left: 14px;
    margin-right: 0;

    .checkbox__text {
      display: none;
    }

    .checkbox__icon {
      border-radius: 50%;
    }
  }

  &--list {
    margin-bottom: 11px;
  }

  &--item {
    cursor: pointer;

    &_right {
      display: flex;
      align-items: center;

    }

    &_inner {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    &_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 9px 0;
      transition: all 0.3s;

      &:hover {
        .filter-category--title {
          color: $blue;
        }
      }

      &.active {
        .filter-category--arrow {
          background: $blue;

          .arrow {
            stroke: #fff;
          }

          .dote {
            stroke: #fff;
            fill: #fff;
          }
        }
      }
    }

    &_child {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      transition: min-height 0.3s ease;
    }
  }

  .opacity-0 {
    opacity: 0;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translate(0, 0);
  opacity: 0;
}
</style>
