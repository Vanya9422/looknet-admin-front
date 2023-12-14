<template lang="pug">
.model-filter-nested
    .model-filter-nested__answer(
        v-for="(answer, answerIndex) in getFIlteredAnswers" 
        :key="answer.fakeID"
    )
        .model-filter-nested__subfilter(
            v-for="(subfilter, subfilterIndex) in answer.sub_filters" 
            :key="subfilter.fakeID"
        )
            .model-filter-nested__subfilter-header.h3(
                :class='{"is-open": bodyVisible[getID(answer.fakeID, subfilter.fakeID)]}'
                @click="toggleBody(getID(answer.fakeID, subfilter.fakeID))"
            )
                .model-filter-nested__subfilter-name
                    span(
                        v-for="(name, nameIndex) in getSubfilterName(subfilter)" 
                        :key="nameIndex"
                    )
                        | {{ name }} 
                    svg-icon.model-filter-nested__subfilter-arrow(
                        name="arrowDown"
                        viewBox="0 0 11 7"
                    )
                .model-filter-nested__subfilter-line


            b-collapse.model-filter-nested__subfilter-collapse(
                v-model="bodyVisible[getID(answer.fakeID, subfilter.fakeID)]"
            )
                model-filter-body.model-filter-nested__subfilter-body(
                    :filter='subfilter'
                )

            .model-filter-nested__subfilter-footer
                model-filter-nested.model-filter-nested__subfilter-nested(
                    :filter='subfilter'
                    :parent-name='getSubfilterName(subfilter)'
                )
</template>

<script>
export default {
    props: {
        filter: {
            type: Object,
            default: () => ({})
        },
        parentName: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        getFIlteredAnswers(){
            const answers = this.filter?.answers || [];
            return answers.filter(answer => answer?.sub_filters.length)
        },
    },
    data(){
        return {
            bodyVisible: {}
        }
    },
    methods: {
        getSubfilterName(subfilter){
            const names = [...this.parentName, subfilter?.name]
            return names
        },
        toggleBody(index){
            this.bodyVisible[index] = !this.bodyVisible[index]
        },
        getID(answerIndex, subfilterIndex){
            return `${answerIndex}-${subfilterIndex}`
        }
    }
}
</script>
<style lang="scss">
.model-filter-nested{
    &__answer{
        &:not(:last-child){
            margin-bottom: 23rem;
        }
    }
    &__subfilter{
        &:not(:last-child){
            margin-bottom: 23rem;
        }
        &-name{
            flex: 0 0 auto;
            display: flex;
            margin-right: 33rem;
            align-items: center;
        }
        &-line{
            flex: 1 1 auto;
            border-bottom: 1px solid $blue;
        }
        &-body{
            padding-top: 23rem;
        }
        &-header{
            display: flex;
            align-items: center;

            &.is-open{
                .model-filter-nested__subfilter-arrow{
                    transform: rotate(-180deg);
                }
            }

            span:not(:last-of-type){
                margin-right: 20rem
            }
            span:last-of-type{
                color: $blue;
            }
        }
        &-arrow{
            fill: transparent;
            width: 14rem;
            margin-left: 47rem;
            stroke-width: 2px;
            stroke: $blue;
        }

        &-collapse{
        }

        &-footer{
            .model-filter-nested__answer{
                &:first-child{
                    margin-top: 23rem;
                }
                
            }
        }
    }

}
</style>