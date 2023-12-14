<template lang="pug">
  b-modal(
    id="modal-gallery"
    ref="modal-gallery"
    size="product-size"
    modal-class="modal-gallery"
    body-class="modal-gallery__body"
    header-class="modal-gallery__header"
    footer-class="modal-gallery__footer"
    @hide="closeModal"
    @show="openModal"
    centered
  )
    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal')
    .modal-gallery__container
      h3.modal-gallery__title.h3 {{title}}
    add-gallery-file.add-gallery-file(:img="img" :loading="loading" multiple @change="changeFile")
    transition(name="page")
      .alert-error(v-if="error") {{error}}
    h4.h4 Manager's name
    .modal-gallery__list.css-scrollbar
      .modal-gallery__item(
        v-for="(item, i) in list"
        :key="i"
        :class="{isActive:item.checked || false}"
        @click="changeCheckedList(item,i)"
      )
        //span {{item.name}}
        button-medium.photo-thumbnail__btn.photo-thumbnail__btn_left(type="button" verysmall blue square icon="pinned" v-if="item.checked")
        img.object-fit.object-fit-inner(:src="item.original_full_url")
      infinite-loading(v-if="list.length > 0" @distance="20" ref="infiniteLoading" @infinite="handleLoadMore")
        div(slot="no-results")
        div(slot="no-more")
        div(slot="spinner")
    template(#modal-footer='{ close }')
      .modal-gallery__buttons.flex
        div
        button-primary.modal-avatar__btn(small gray @click.native='closeModal()') Close
        button-primary.modal-avatar__btn(small blue  @click.native='save()') Save

</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Add a photo or choose from the gallery'
    },
    keyImage: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      infiniteScrollRouteUrl: this.$api.gallery,
      checkedList: [],
      list: [],
      page: 1,
      lastPage: 10,
      per_page: 20,
      id: 0,
      loading: false,
      error: null,
      active: null,
      img: null,
    }
  },
  computed: {
    searchUrl() {
      return `${this.infiniteScrollRouteUrl}?&per_page=${this.per_page}&page=${this.page}&orderBy=created_at&sortedBy=desc`
    }
  },
  methods: {
    openModal() {
      this.error = null
      this.handleLoad()
    },
    changeFile(val) {
      const form = document.getElementById('form-add-file')
      const formData = new FormData(form)
      this.loading = true
      this.$axios.$post(this.$api.gallery, formData)
          .then(({data}) => {
            let res = data
            res[0].checked = true
            this.list.forEach(item => item.checked = false)
            this.list.unshift(...res)
            this.active = res[0]
            console.log(this.active)
          })
          .catch(({response:{data:{errors:files}}}) => {
            this.error = files['files.0'][0]
          })
          .finally(() => this.loading = false)
    },
    closeModal() {
      this.list.forEach(item => item.checked = false)
      this.$bvModal.hide('modal-gallery')
      this.$emit('close')
    },
    fetchData() {
      return this.$axios.$get(this.searchUrl)
    },
    async handleLoad() {
      this.page = 1
      this.list = []
      const {data, meta: {current_page, last_page}} = await this.fetchData()
      this.list = data.map(item => ({...item, checked: false}))
      this.page = current_page + 1
      this.lastPage = last_page
      const ref = this.$refs.infiniteLoading
      if (ref) this.$refs.infiniteLoading.stateChanger.reset()
    },
    async handleLoadMore($state) {
      if (this.page > this.lastPage) {
        $state.complete()
      } else {
        const {data, meta: {current_page, last_page}} = await this.fetchData()
        if (data.length > 0) {
          this.list.push(...data.map(item => ({...item, checked: false})));
          this.page = current_page + 1
          this.lastPage = last_page
          $state.loaded()
        } else {
          $state.complete()
        }
      }
    },
    changeCheckedList(item, i) {
      this.error = null
      this.active = item
      this.list.forEach((item, index) => item.checked = index === i)
    },
    save() {
      if (this.active) {
        if (this.keyImage) this.$emit('save', {key: this.keyImage, val: this.active})
        else this.$emit('save', this.active)
        this.$bvModal.hide('modal-gallery')
        this.active = null
      } else {
        this.error = "Check active element"
      }

    },
  }
}
</script>
<style lang="scss">
.modal-gallery {
  @include large-mobile {
    .button-photo {
      height: 56px;
      font-size: 12px;
      .button-photo__wrap {
        border-radius: 10px;
      }
    }
    .modal-footer{
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
      padding: 0 15px 5px;
    }
  }

  &__buttons {
    max-width: 500px;
    width: 100%;
    @include items(3, 5);
  }

  .add-gallery-file {
    font-size: 16px;
    margin: 30px 0;
    @include large-mobile {
      margin: 20px 0;
    }
  }

  .modal-gallery__list {
    height: 294px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 16px;
    padding: 4px;
    @include large-mobile {
      max-height: 55vh;
      height: auto;
    }
  }

  .modal-gallery__item {
    max-width: 144px;
    width: 100%;
    height: 144px;
    border-radius: 6px;
    position: relative;
    @include large-mobile {
      max-width: 95px;
      width: 100%;
      height: 95px;
    }

    &.isActive::before {
      content: '';
      position: absolute;
      width: 150px;
      height: 150px;
      border: 3px solid #556DEE;
      border-radius: 6px;
      top: -3px;
      left: -3px;
      @include large-mobile {
        max-width: 101px;
        height: 102px;
      }
    }
  }

  overflow: hidden;

  @include large-tablet {
    .modal-content {
      padding: 60rem 30rem;
    }
  }

  @include large-mobile {
    padding: 0 !important;
    overflow: hidden !important;
    .modal-content {
      padding: 40rem 15rem 0 15rem;
      height: 90vh;
      display: flex;
    }
  }


  &__row {
    display: flex;

    @include large-tablet {
      flex-wrap: wrap;
    }

    @include large-mobile {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%;
    }
  }

  &__column {
    &_left {
      width: calc(100% - 375rem);
    }

    &_right {
      width: 375rem;
      padding-left: 35rem;
      position: relative;
    }

    @include large-tablet {
      &_left {
        width: 100%;
      }
      &_right {
        width: 100%;
        padding-left: 0;
        margin-top: 40rem;
      }
    }

    @include large-mobile {
      &_left {
        flex: 1 1 auto;
        position: relative;
      }
      &_right {
        padding: 15rem;
        margin: 0 -15rem;
        border-top: 1px solid $light-gray;
        width: calc(100% + 30rem);
      }
    }
  }

  &__container {
    @include large-mobile {
      .button-photo {
        height: 48px;
      }
    }
  }

  &__action {
    @include items(2, 5);
    display: flex;

    @include large-mobile {
      @include items(2, 3);
    }
  }

  &__buttons {
    margin-top: 12rem;
  }

  &__btn {
    width: 100%;

    &:not(:first-child) {
      margin-top: 10rem;
    }

    @include large-mobile {
      &-action {
        &:last-child {
          width: 25%;
        }
      }
    }
  }

  &__sidebar {
    &-bottom {
      margin-top: 20rem;
      padding-top: 20rem;
      border-top: 1px solid $light-gray;
    }

    @include large-mobile {
      &-bottom {
        display: none;
      }
    }
  }

  &__box {
    margin-top: 44rem;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__content {
    margin-top: 40rem;
    @include large-mobile {
      margin-top: 30rem;
    }
  }

  &__map {
    margin-top: 50rem;
    padding-top: 50rem;
    border-top: 1px solid $light-gray;
    @include large-mobile {
      margin-top: 30rem;
      padding-top: 30rem;
      padding-bottom: 30rem;
    }
  }

  &__gallery {
    @include small-tablet {
      .single-gallery {
        &__slider {
          margin-left: 0;
          margin-right: 0;
          width: 100%;
          margin-bottom: 0;
          border-radius: 6px;
        }
      }
    }

    @include large-mobile {
      margin-top: 15rem;
    }
  }

}
</style>