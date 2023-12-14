<template lang="pug">
    label.model-answer-checkbox(
        :class="mods"
        @click="activeClickHandler"
    )
        span.model-answer-checkbox__inner.flex.flex_vertical
            span.model-answer-checkbox__icon
                svg-icon(
                    name="answerDone"
                    viewBox="0 0 16 12"
                )
            span.model-answer-checkbox__field
                input.model-answer-checkbox__input(
                    v-if="!actived"
                    type="checkbox"
                    ref="input"
                    :name="name" 
                    :true-value="use"
                    :value="use"
                    v-model="model"
                    
                    @change="ChangeHandler"
                )
                span.model-answer-checkbox__text(v-if="$slots.default")
                    slot
</template>

<script>
import TOGGLE from "~/mixins/ui/toggle";
export default {
    mixins: [TOGGLE],
    props: {
		actived: {
			type: Boolean,
			default: false
		},
    },
    methods: {
        activeClickHandler(){
            if(!this.actived) return false;

            this.$emit('actived-click', this.use)
        }
    },
    computed: {
        mods(){
            return {
                'is-active': this.actived || this.isSelected
            }
        },

        isSelected(){
            const find = this.model.find(item => item.fakeID === this.use.fakeID);
            return find !== undefined;
        }
    }
};
</script>

<style lang="scss">
.model-answer-checkbox{
    display: block;
    cursor: pointer;
    user-select: none;

    &.is-active{
        .model-answer-checkbox{
            &__icon{
                background: $blue;
                border-color: transparent;
                svg{
                    opacity: 1;
                }
            }

            &__field{
                border-color: $blue;
            }
        }
    }

    &__icon{
        width: 26rem;
        height: 26rem;
        border-radius: 50%;
        border: 1px solid $light-gray;
        margin-right: 29rem;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: ease .25s;

        svg{
            width: 16rem;
            stroke-width: 3;
            stroke: #fff;
            fill: transparent;
            opacity: 0;
        }
    }

    &__text{
        line-height: 1em;
        display: block;
        margin-top: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__field{
        width: 474rem;
        height: 60rem;
        max-width: 100%;
        border: 1px solid $light-gray;
        display: flex;
        align-items: center;
        padding: 0 28rem;
        border-radius: 10rem;
        transition: ease .25s;
        font-size: 17rem;
        line-height: 1em;
        font-weight: 500;
    }
}

</style>