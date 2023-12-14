<template lang="pug">
  section.section-photo.checkboxs__list
    button-primary.section-photo__btn(blue icon="plusBig" v-b-modal.modal-gallery)
      | Add a photo
    .section-photo__list.flex(v-if="list.length > 0" )
      item-photo.section-photo__item(
        v-for="(item, i) in list"
        :key="i"
        :name="item.name"
        :size="item.size"
        :img="item.original_full_url"
        :class="{isActive:item.checked || false}"
        @click.native="changeCheckedList(i)"
      )

      infinite-loading( @distance="20" @infinite="handleLoadMore")
        div(slot="no-results")
        div(slot="no-more")
        div(slot="spinner")

    transition(name="fade")
      part-annoucement-panel.section-photo__panel(v-if="checkedList.length > 0" :selected="checkedList.length" @closePanel="removeAll" modalName="modal-photo-panel")
        button-medium.annoucement-panel__btn(icon="delete" @click.native.prevent="changesPhotos()"  blue small) Delete
        button-medium.annoucement-panel__btn(icon="penEdit" @click.native.prevent="editPhoto" v-if="checkedList.length === 1"  blue small) Edit

    modal-panel(id="modal-photo-panel")
      .modal-panel__item
        button-border.modal-panel__btn(icon="closeBig" @click.native.prevent="changesPhotos()" BigIcon gray) Delete
      .modal-panel__item
        button-border.modal-panel__btn(icon="penEdit" @click.native.prevent="editPhoto" BigIcon gray) Edit
    modal-gallery(  @close="handleLoad")
    modal-photo(:id="id" @close="id = 0" @removePhoto="handleLoad")
    modal-delete(@deleteItem="changesPhoto('delete')")
</template>

<script>

export default {
  data() {
    return {
      infiniteScrollRouteUrl: this.$api.gallery,
      checkedList: [],
      list: [],
      page: 0,
      id:0
    }
  },
  created() {
    this.handleLoad()
  },
  methods: {
    editPhoto(){
      this.id = this.checkedList[0]
      this.$nextTick(() => {
        this.$root.$emit('bv::show::modal', 'modal-photo')
      })
    },
    changesPhotos(){
      this.$root.$emit('bv::show::modal', 'modal-delete')
    },
    changesPhoto(text) {
      const data = {
        media_ids: this.checkedList,
        _method: text
      }
      this.$axios.$post(this.$api.gallery, data).then(res => {
        if (text === 'delete') {
          this.checkedList.forEach(item => {
            const getIndex = this.list.findIndex(i => i.id === item)
            this.list.splice(getIndex, 1)
          })
        }
        this.removeAll()
      })
    },
    removeAll() {
      this.checkedList = []
      this.list.forEach(item => { item.checked = false})
    },
    changeCheckedList(i) {
      if (this.list[i].checked === true) {
        this.list[i].checked = false
        this.removeItem(this.list[i].id)
      } else {
        this.list[i].checked = true
        this.checkedList.push(this.list[i].id)
      }
    },
    removeItem(id) {
      const getIndex = this.checkedList.findIndex(item => item === id)
      this.checkedList.splice(getIndex, 1)
    },
    fetchData() {
      let search = `${this.infiniteScrollRouteUrl}?&per_page=${this.per_page || 20}&page=${this.page + 1}&orderBy=id&sortedBy=desc`;
      return this.$axios.$get(search)
    },
    handleLoadMore($state) {
      this.fetchData()
          .then(({data, meta: {current_page}}) => {
            if (data.length > 0) {
              let dataArray = []
              data.forEach(item => dataArray.push({...item, checked: false}))
              this.list.push(...dataArray);
              this.page = current_page
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((e) => console.log(e));
    },
    async handleLoad() {
      this.page = 0
      this.checkedList = []
      await this.fetchData().then(({data, meta: {current_page}}) => {
        if (data.length > 0) {
          let dataArray = []
          data.forEach(item => dataArray.push({...item, checked: false}))
          this.list = dataArray;
          this.page = current_page
        }
      })
    },
  }
}
</script>

<style lang="scss">
.section-photo {
  margin-top: 30rem;
  padding-bottom: 60rem;

  @include large-mobile {
    margin-top: 15rem;
  }

  &__btn {
    min-width: 190rem;
    @include large-mobile {
      min-width: 180rem;
    }
  }

  &__list {
    @include items(6, 8);
    padding-top: 8rem;

    @include large-desktop {
      @include items(5, 8);
    }
    @include large-tablet {
      @include items(3, 8);
    }
    @include large-mobile {
      @include items(2, 3);
      padding-top: 3rem;
    }
  }

  &__item {
    margin-top: 30rem;
    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__panel {
    margin: 30rem 0 0 0;
    @include large-mobile {
      margin-top: 20rem;
    }
  }
}
</style>
