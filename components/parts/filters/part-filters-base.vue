<template lang="pug">
.part-filters-base
    model-filter-item.part-filters-base__item(
        v-for="(filter, filterIndex) in controller.instances"
        :key="filter.fakeID"

        :filter='filter'
        @remove='showFilterDeleteModal(filterIndex)'
    )

    modal-subfilters(v-model='activeFilter')
    modal-delete(
        modalId="filter-modal-delete"
        @deleteItem="deleteFilterHandler"
        @close="deleteFilter=null"
    )
    modal-delete(
        modalId="answer-modal-delete"
        @deleteItem="deleteAnswerHandler"
        @close="answerTarget=null"
    )
</template>

<script>

import filterController from "~/core/controllers/filterController";
import {mapGetters, mapActions} from "vuex";
import makeAliasApi from "@/mixins/makeAliasApi";

const INCLUDE_METHODS = {
    GET_FILTERS: 'filters/GET_FILTERS',
    UPDATE_FILTERS: 'filters/UPDATE_FILTERS',
    DELETE_FILTER: 'filters/DELETE_FILTER',
    DELETE_ANSWER: 'filters/DELETE_ANSWER',
}
export default {
    mixins: [makeAliasApi],
    props: {
        categoryId: {
            type: Number,
            default: 132
        }
    },

    data(){
        return {
            // индекс фильтра в контроллере для удаления
            deleteFilter: null,
            // информация о удаляемом ответе (фильтр и индекс ответа)
            answerTarget: null,
            // главный контроллер
            controller: null,
            // текущий фильтр для модального окна подфильтров
            activeFilter: {}
        }
    },

    computed: {
        ...mapGetters({
            LANG: 'correctText/LANG'
        }),
    },

    created(){
        this.$nuxt.$on('add-subfilter', this.showSubfilterModal)
        this.$nuxt.$on('remove-answer-with-question', this.showAnswerDeleteModal)
        this.controller = new filterController({
            props: {
                category: this.categoryId
            },
            api: this.toAliasApi(INCLUDE_METHODS)
        });
    },

    beforeDestroy() {
        this.$nuxt.$off('add-subfilter', this.showSubfilterModal)
        this.$nuxt.$off('remove-answer-with-question', this.showAnswerDeleteModal)
        this.controller = this.controller.destroy();
    },

    methods: {
        ...mapActions(INCLUDE_METHODS),

        // открывает модалку удаления фильтра
        showFilterDeleteModal(index){
            this.deleteFilter = index;
            this.$bvModal.show('filter-modal-delete')
        },

        // открывает модалку удаления ответа
        showAnswerDeleteModal(params){
            this.answerTarget = params
            this.$bvModal.show('answer-modal-delete')
        },

        // открывает модалку добавления подфильтра
        showSubfilterModal(filter){
            this.activeFilter = filter;
            this.$bvModal.show('modal-subfilters');
        },

        // триггерит метод контроллера по добавлению фильтра
        makeNewFilter(type = 0){
            if(!this.controller) return false;
            this.controller.addFilter({
                category_id: this.categoryId,
                order: this.controller.instances.length,
                type: type
            })
        },

        // обработчик удаления фильтра
        deleteFilterHandler(){
            if(this.deleteFilter === null) return false;
            this.removeFilter(this.deleteFilter)
            this.deleteFilter = null
            this.$emit('update', JSON.parse(JSON.stringify(this.controller.instances)));
        },

        // обработчик удаления ответа
        // вызывает метод удаления ответа у модели фильтра
        async deleteAnswerHandler() {
          if (!this.answerTarget) return false;
          await this.answerTarget.filter.removeAnswer(this.answerTarget.index)
          this.answerTarget = null
        },

        // триггерит метод удаления фильтра
        async removeFilter(index){
          await this.controller.removeFilter(index);
          this.$emit('update', JSON.parse(JSON.stringify(this.controller.instances)));
        },

        // триггерит метод сохранения контроллера
        async saveFilters() {
          await this.controller.save();
          this.$emit('update', JSON.parse(JSON.stringify(this.controller.instances)));
        }
    },

    async fetch(){
        await this.controller.init()
    }
}
</script>

<style lang="scss">
.part-filters-base{
    &__item{
        &:not(:first-child) {
            margin-top: 10rem;
            
        }

        &:not(:last-child){
            .model-filter-item__question{
                @include large-mobile {
                    padding-bottom: 35rem;
                }                
            }

        }

        // модифицируем фильтры только верхнего уровня
        &.is-subfilter-exist{
            background:#F4F3F4;
            .button-primary{
                background: #fff;
            }
        }
    }
}
</style>
