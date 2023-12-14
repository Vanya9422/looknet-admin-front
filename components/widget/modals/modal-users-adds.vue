<template lang="pug">
  b-modal(
    id="users-adds"
    ref="users-adds"
    size="users"
    modal-class="users-adds"
    body-class="users-adds__body"
    header-class="users-adds__header"
    footer-class="users-adds__footer"
    centered
    @show="openModal"
    :hide-footer="true"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='close()')
    module-user-info(
      v-if="user"
      :name="user.full_name"
      :about="`Registered ${user.registered}`"
      :avatar="user.avatar"
      :verified="user.verified_at !== null "
      vertical
    )

    .users-adds__title.h3 {{title}}

    .users-adds__nav.flex
      module-tag.users-adds__nav-btn(
        v-for="(tag, i) in tags"
        :key="i"
        :text="tag.text"
        :to="tag.to"
        :active="tag.active"
        button
        @click.native.prevent="changeActiveTag(i)"
      )
        span.tag__counter.color-blue(v-if="tag.text === 'Active'") ({{ counts.active_count }})
        span.tag__counter.color-blue(v-else) ({{ counts.inactive_count }})

    .users-adds__container.css-scrollbar
      .users-adds__list.flex(v-if='products.length > 0')
        item-card.users-adds__item(
          v-for="(item, i) in products"
          :key="i"
          :contacts="item.contacts"
          :name="item.name"
          :city="item.city.name"
           :coordinates="{longitude:item.longitude,latitude:item.latitude}"
          :date="item.created_at"
          :phoneNumber="item.contact_phone"
          :price="item.price"
          :gallery="$galleryList(item.gallery)"
          :author_id="user.id"
          :author_full_name="user.full_name"
          :status="item.status"
          :to="item.slug"
          :id="item.id"
          @show="openProductModal(i,products)"
          @sendMessage="hideModal"
        )
      infinite-loading(v-if="products.length > 0" :distance="100" ref="infiniteLoading" @infinite="handleLoadMore")
        div(slot="no-results")
        div(slot="no-more")
        div(slot="spinner")
      .section-notifications__center(v-if="products.length === 0")
        part-not-notification.section-notifications__not-notification.section-notifications__not-notification-small

</template>

<script>
import openProductModal from "@/mixins/openProductModal";
import {mapActions,mapGetters} from "vuex";
export default {
  props: {
    title: {
      type: String,
      default: 'Users adds'
    },
    userId:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      products:[],
      user:{},
      counts:{
        active_count: 0,
        inactive_count: 0
      },
      status:1,
      page:1,
      last_page:2,

    }
  },
  mixins: [openProductModal],
  computed:{
    ...mapGetters({
      CONVERSATION_TYPE: 'chat/CONVERSATION_TYPE',
    }),
    tags(){
      return [
        {
          text: 'Active',
          // counter: this.counts.active_count,
          active: true,
          status:1
        },
        {
          text: 'Non active',
          // counter: this.counts.inactive_count,
          status:2
        }
      ]
    }
  },
  methods:{
    ...mapActions({
      GET_CHAT_USERS_LIST: 'chat/GET_CHAT_USERS_LIST',
    }),
    openModal(){
      this.handleLoad()
    },
     hideModal(){
      setTimeout(() =>
         this.GET_CHAT_USERS_LIST({query: this.CONVERSATION_TYPE|| 'resell'})
      ,300);

      this.$bvModal.hide('users-adds')
    },
    changeActiveTag(index) {
      this.tags.forEach((item, i) => item.active = i === index);
      this.status =  this.tags[index].status;
      this.handleLoad()
    },
    fetchData() {
      let search = `/users/${this.userId}/information?page=${this.page}&searchJoin=and&search=status:${this.status}&with=gallery;city;author.avatar`;
      return this.$axios.$get(search)
    },
    handleLoadMore($state){
      if (this.page >= this.last_page) $state.complete();
      this.fetchData().then(({counts,data,user,meta:{current_page,last_page}}) => {
        if ( current_page < last_page) $state.loaded();
        else $state.complete();
        this.counts = counts;
        this.products.push(...data);
        this.page = current_page + 1;
        this.last_page= last_page
      })
    },
    handleLoad() {
      const ref = this.$refs.infiniteLoading
      if (ref) this.$refs.infiniteLoading.stateChanger.reset();
      this.page = 1;
      this.products = [];
      this.fetchData().then(({counts,data,user,meta:{current_page,last_page}}) => {
        if(data.length >0) this.user = data[0].author
        this.counts = counts;
        this.products = data;
        this.page = current_page + 1;
        this.last_page= last_page
      })
    },
  }
}
</script>

<style lang="scss">
.section-notifications__not-notification-small .not-notification__img{
  max-width: 350rem ;
}
.users-adds {
  .modal-content {
    overflow: hidden;
  }

  .modal-dialog.modal-users {
    transform: none;
  }

  @include large-mobile {
    padding: 0 !important;
    .modal-dialog.modal-users {
      transform: translate(0, 30rem);
    }
    &.show .modal-dialog.modal-users {
      transform: none;
    }
    .modal-content {
      padding: 30rem 15rem 0 15rem;

    }
  }

  &__title {
    margin-top: 30rem;
  }

  &__nav {
    margin-top: 30rem;
    border-bottom: 1px solid $light-gray;

    &-btn {
      margin-bottom: -1px;
      cursor: pointer;
    }

    @include large-mobile {
      margin-top: 20rem;
      &-btn {
        padding: 0 16rem 10rem 16rem;
      }
    }
  }

  &__container {
    margin-top: 20rem;
    margin-right: -40rem;
    margin-left: -30rem;
    padding-left: 30rem;
    padding-right: 38rem;
    height: calc(320px * 2);
    overflow-x: hidden;
    overflow-y: auto;

    @include small-tablet {
      padding-right: 20rem;
      margin-right: -22rem;
    }

    @include large-mobile {
      margin-top: 20rem;
      padding-bottom: 60rem;
      min-height: 55vh;
      max-height: 55vh;
    }
  }

  &__list {
    @include items(3, 10);

    @include large-mobile {
      @include items(2, 5);
      margin-top: -20rem;
    }
  }

  &__item {
    margin-top: 30rem;

    @include large-mobile {
      margin-top: 20rem;
    }
  }
}
</style>
