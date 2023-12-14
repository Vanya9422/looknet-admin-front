<template lang="pug">
.model-filter-body
    .model-filter-body__row.flex
        .model-filter-body__column.model-filter-body__column_left
            label.model-filter-body__question-label.h4.color-gray Answers
        .model-filter-body__column.model-filter-body__column_right
            draggable.model-filter-body__draggable(
                v-if='filter && filter.answers'
                v-model="filter.answers"
                v-bind="dragOptions"
                :disabled="LANG !== 'en'"
                :group="dragGroup"
                handle=".model-answer-item__drag"
                @change="onDragChange()"
            )
                model-answer-item.model-filter-body__answer(
                    v-for="(answer, answerIndex) in filter.answers"
                    :key="answer.fakeID"

                    :can-edit="filter.isAnswersAccept"
                    :answer="answer"
                    @remove="callDeleteModal(filter, answerIndex)"
                )
            button-primary.model-filter-body__question-btn(
                gray
                icon="plusBig"
                @click.native='filter.addAnswer({order: filter.answers.length || 0})'
                v-if="filter.isAnswersAccept && LANG === 'en'"
            ) Add a variant
            button-primary.model-filter-body__question-btn(
                gray
                icon="plusBig"
                @click.native.prevent="addSubfilter"
                v-if="filter.isAnswersAccept && filter.type !== 4 && LANG === 'en'"
            ) Add subfiltr

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import draggable from 'vuedraggable'
export default {
    components: {
        draggable,
    },
    computed: {
        ...mapGetters({
            LANG: 'correctText/LANG'
        }),
    },
    data(){
        return {
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            },
            dragGroup: {
                name: 'filters',
                pull: false,
                put: false
            }
        }
    },
    props: {
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        addSubfilter(){
            this.$nuxt.$emit('add-subfilter', this.filter)
        },
        onDragChange(){
            this.filter.answers.forEach((answer, index) => (answer.order = index))
        },
        callDeleteModal(filter, index){
            const answer = filter.answers[index];
            const params = {filter, index}

            if(!answer?.name) filter.removeAnswer(index);
            else this.$nuxt.$emit('remove-answer-with-question', params)
        }
    }
}
</script>

<style lang="scss">
.model-filter-body{
    &__answer{
        &:not(:last-child){
            margin-bottom: 15rem;
        }
    }

    &__row {
        flex-wrap: nowrap;
    }

    &__draggable{
        width: 100%
    }


    &__column {
        &_left {
            width: 205rem;
            min-width: 205rem;

            @include large-mobile {
                display: none;
            }
        }

        &_right {
            width: 100%;

            @include large-mobile {
                display: flex;
                flex-wrap: wrap;
            }
        }
    }

    &__question {
        margin-top: 35rem;
        padding-bottom: 15rem;
        @include large-mobile {
            margin-top: 20px;
            // padding-bottom: 35rem;
        }

        &-label {
            font-family: 'Gilroy';
            padding-top: 15rem;
        }

        &-btn {
            min-width: 185rem;
            margin-top: 20rem;
            margin-left: 29rem;

            @include large-mobile {
                min-width: 0;
                margin-left: 0;
                flex: 1 1 auto;

                &:not(:last-child){
                    margin-right: 15rem;
                }
            }
        }
    }
}
</style>
