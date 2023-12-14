<template lang="pug">
.model-filter-item(:class='{"is-subfilter-exist": filter.haveSubfilter}')
    .model-filter-item__row.flex.flex_vertical
        .model-filter-item__column.model-filter-item__column_left
            label.model-filter-item__label.h3 Name of filter
        .model-filter-item__column.model-filter-item__column_right
            part-correct-field.model-filter-item__field(
                v-model="filter.name"
                @close='callDeleteModal'
                :disabled="LANG !== 'en'"
            )
    .model-filter-item__addon(
      v-if="filter.type === 4"
    )
      .model-filter-item__row.model-filter-item__row_double.flex.flex_vertical
        .model-filter-item__column.model-filter-item__column_left
            label.model-filter-item__label.h3 Control Qty.
        .model-filter-item__column.model-filter-item__column_right.flex
            form-input.model-filter-item__field.model-filter-item__field_double(
              v-model="filter.min_value"
              placeholder="Min"
            )
            form-input.model-filter-item__field.model-filter-item__field_double(
              v-model="filter.max_value"
              placeholder="Max"
            )
      .model-filter-item__row.model-filter-item__row_double.flex.flex_vertical
        .model-filter-item__column.model-filter-item__column_left
            label.model-filter-item__label.h3 Names
        .model-filter-item__column.model-filter-item__column_right.flex
            form-input.model-filter-item__field.model-filter-item__field_double(
              v-model="filter.min_name"
              placeholder="From"
            )
            form-input.model-filter-item__field.model-filter-item__field_double(
              v-model="filter.max_name"
              placeholder="To"
            )

    .model-filter-item__row.model-filter-item__row_nested.flex.flex_vertical(
        v-if="filter.hierarchyLevel > 0"
        v-for="number in filter.hierarchyLevel" :key="`level-number-${number}`"
    )
        .model-filter-item__column.model-filter-item__column_left
            label.model-filter-item__label Nested filter №{{ number }}
        .model-filter-item__column.model-filter-item__column_right
            form-input(
                :value='filter.nested[number-1]'
                @input='value => setUpNestedName(value, number - 1, filter)'
                placeholder="Level name"
            )


    .model-filter-item__question
        model-filter-body(
            :filter='filter'
        )
    .model-filter-item__subfilters-list
        model-filter-nested.model-filter-item__nested(
            :filter='filter'
        )
</template>
<script>
import {mapGetters} from "vuex";

export default {
    props: {
        filter: {
            type: Object,
            default: () => ({})
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
        },
        setUpNestedName(value, number, filter){
            filter.nested = {value, number};
        }
    }
}
</script>

<style lang="scss">
.model-filter-item{
    padding-top: 47rem;
    padding-bottom:36rem;

    border-radius: 30rem;
    padding-left: 44rem;
    padding-right: 28rem;

    @include large-mobile {
        padding: 0rem;
    }

    &__column {
        &_left {
            width: 205rem;
            min-width: 205rem;
            @include large-mobile {
                width: 140rem;
                min-width: 140rem;
            }
        }

        &_right {
            width: 100%;
        }
    }

    &__addon{
      margin-top: 5px;
    }

    &__row {
        flex-wrap: nowrap;

        &_double{
          margin: 0 -5px;
        }

        &_nested{
            margin-top: 15rem;
        }
    }

    &__question {
        margin-top: 35rem;
        padding-bottom: 15rem;
        @include large-mobile {
            margin-top: 20px;
            padding-bottom: 0;
        }

        &-label {
            font-family: 'Gilroy';
            padding-top: 15rem;
        }

        &-btn {
            min-width: 185rem;
            margin-top: 20rem;
            margin-left: 29rem;
        }
    }

    &__field{
      &_double{
        flex: 1 1 auto;
        margin: 5px;
      }
    }
}
</style>
