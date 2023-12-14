<template lang="pug">
.model-answer-item(:class='{"is-subfilter-exist": answer.haveSubfilter}')
    .model-answer-item__drag.handle(
        v-if="LANG === 'en'"
    )
        svg-icon(name="menu")

    form-input.model-answer-item__input(
        v-model="answer.name"
        :value="answer.name"
        :placeholder='answer.placeholder'
    )
    button-primary.model-answer-item__btn(
        v-if="canEdit && LANG === 'en'"
        gray 
        icon="close" 
        square 
        @click.prevent.native="callDeleteModal()"
    )
</template>

<script>
import {mapGetters} from "vuex";

export default {
    props: {
        answer: {
            type: Object,
            default: () => ({})
        },
        canEdit: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        ...mapGetters({
            LANG: 'correctText/LANG'
        }),  
    },
    methods: {
        callDeleteModal(){
            this.$emit('remove')
        }
    }
}
</script>


<style lang="scss">
.model-answer-item {
  display: flex;

  &.is-subfilter-exist{
    .model-answer-item{
        &__drag{
            stroke: $blue;
        }
        &__input{
            .input__field{
                border-color: $blue;
            }
        }
    }
  }

  &__input {
    width: 100%;
  }

  &__btn {
    margin-left: 10rem;
    flex-shrink: 0;

    @include large-mobile {
      margin-left: 6rem;
    }
  }

  &__drag {
    width: 29rem;
    min-width: 29rem;
    min-height: 100%;
    cursor: pointer;
    padding-right: 14rem;
    display: flex;
    align-items: center;
    stroke: $light-gray;
    stroke-width: 2;

    svg {
      height: 12rem;
    }
  }
}
</style>
