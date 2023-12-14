<template lang="pug">
b-modal(
  id="modal-subfilters"
  size="category-size"
  modal-class="modal-subfilters"
  body-class="modal-subfilters__body"
  header-class="modal-subfilters__header"
  footer-class="modal-subfilters__footer"
  centered
  @close="closeHandler"
)
  template(#modal-header='{ close }')
    button-close.modal__close(@click.native='close')
    h1.modal-subfilters__title.h3 Add under filter
  .modal-subfilters__inner
    .modal-subfilters__container
      h2.modal-subfilters__name.h3 {{ filter.name }}
      .modal-subfilters__list
        model-answer-checkbox.modal-subfilters__answer-checkbox(
          v-for="(answer, answerIndex) in filter.answers"
          :key="answer.fakeID"
          :use='answer'
          v-model='selectedAnswers'
          :actived='answer.sub_filters.length > 0'
          @actived-click='showSubfilterDeleteModal'
        )
          | {{ answer.name }}
          //- | {{ `${answer.sub_filters.length > 0 ? '(Subfilter exists)' : ''}` }}
  modal-delete(
      modalId="subfilter-modal-delete"
      @deleteItem="deleteSubfilterHandler"
      @close="closeSubfilterHandler"
  )
  template(#modal-footer='{ close }')
    .modal-subfilters__buttons.flex
      button-primary.modal-subfilters__btn.modal-subfilters__btn_cancel(small @click.native='close()') Cancel
      button-primary.modal-subfilters__btn(small blue @click.native='saveHandler()') Add Filter
</template>
<script>
export default {
  data() {
    return {
      selectedAnswers: [],
      removeAnswerTarget: null
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    filter: {
      get(){
        return this.value
      },
      set(filterInstance){
        this.$emit('input', filterInstance)
      }
    }
  },


  methods: {
    closeHandler(){
      this.selectedAnswers = []
    },
    saveHandler() {
      this.selectedAnswers.forEach(answer => {
        answer.addSubfilter({
          name: answer.name,
          type: 1
        })
      });
      this.$bvModal.hide('modal-subfilters')
      this.selectedAnswers = []
    },
    deleteSubfilterHandler(){
      if(!this.removeAnswerTarget) return false;
      this.removeAnswerTarget.removeSubfilter()
      this.closeSubfilterHandler()
    },
    closeSubfilterHandler(){
      this.removeAnswerTarget = null
    },
    showSubfilterDeleteModal(answer){
      this.removeAnswerTarget = answer
      this.$bvModal.show('subfilter-modal-delete') 
    },
  }
}
</script>
<style lang="scss">
.modal-subfilters {
  &__name{
    margin-bottom: 36rem;
    padding-top: 34rem;
    font-weight: 600;
  }

  &__title{
    font-weight: 600;
  }

  &__header{
    padding-bottom: 36rem;
    border-bottom: 1px solid $light-gray;
  }

  &__footer{
    padding-top: 31rem;
    border-top: 1px solid $light-gray;
  }

  &__body {
    
  }
  &__container {
    padding-bottom: 20rem;
    margin-right: -40rem;
    padding-right: 28rem;
    overflow-x: hidden;
    overflow-y: auto;
    // max-height: 60vh;
    height: 496rem;

    @include large-mobile {
      max-height: inherit;
    }

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(#D2D2D7, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background: $blue;
    }
  }

  &__btn{
    width: 122rem;
    &_cancel{
      width: 156rem;
    }
  }

  &__answer-checkbox{
    &:not(:last-child){
      margin-bottom: 20rem;
    }
  }

  &__buttons {
    grid-column-gap: 15rem;
  }
}
</style>
