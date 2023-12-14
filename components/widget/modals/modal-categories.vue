<template lang="pug">
b-modal(
	id="modal-categories"
	ref="modal-categories"
	size="refusal-size"
	modal-class="modal-refusal"
	body-class="modal-refusal__body"
	header-class="modal-refusal__header"
	footer-class="modal-refusal__footer"
	centered
	:hide-footer="true"
	@hide="closeModal"
)

	template(#modal-header='{ close }')
		button-close.modal__close(@click.native='closeModal')

	form.modal-refusal__form
		h3.modal-refusal__title.h3 {{ title }}
		.modal-refusal__field
			label.modal-refusal__label.h4 You have a criminal product
			form-select-category(@input="(val) => category = val" value="category" default :items="CATEGORY")
		button-primary.modal-refusal__btn(blue @click.prevent.native="send") Send

</template>
<script>
import { minLength, required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Choose category",
    },
  },
  data() {
    return {
      comment: "",
      category: null,
    };
  },
  computed: {
    ...mapGetters({
      CATEGORY: "category/CATEGORIES",
    }),
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.$bvModal.hide(`modal-categories`);
    },
    send() {
      this.$emit("continue", this.category);
      this.$bvModal.hide(`modal-categories`);
    },
  },
};
</script>
<style lang="scss">
.modal-refusal {
  .modal-content {
    padding: 60rem 50rem;
  }

  @include large-mobile {
    padding: 0 !important;
    .modal-content {
      padding: 20rem 15rem 30rem 15rem;
    }
  }

  &__title {
    font-weight: 600;
    @include large-mobile {
      padding-bottom: 5rem;
    }
  }

  &__field {
    margin-top: 40rem;
    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__label {
    display: block;
    font-family: "Gilroy";
    font-weight: 600;
    margin-bottom: 20rem;
    @include large-mobile {
      font-size: 16rem;
      margin-bottom: 10rem;
    }
  }

  &__btn {
    margin-top: 40rem;
    min-width: 192rem;
    @include large-mobile {
      width: 100%;
      margin-top: 20rem;
    }
  }
}
</style>
