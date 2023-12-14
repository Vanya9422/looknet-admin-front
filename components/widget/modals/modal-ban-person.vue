<template lang="pug">
b-modal(
	id="modal-ban-user"
	ref="modal-ban-user"
	size="thank-size"
	modal-class="modal-delete"
	body-class="modal-delete__body"
	header-class="modal-delete__header"
	footer-class="modal-delete__footer"
	centered
	@hide="closeModal"
	:hide-footer="true"
)

	template(#modal-header='{ close }')
		button-close.modal__close(@click.native='closeModal')
	div(:class="status === 1 ? 'modal-success__icon'  : 'modal-delete__icon'")
		svg-icon(name="User")
	.modal-delete__title.h2.h2_big {{title}}
	.modal-delete__desc.color-gray.h4 {{desc}}
	.modal-delete__btns
		button-primary.modal-delete__btn( @click.native.prevent="closeModal") Cancel
		button-primary.modal-delete__btn( @click.native.prevent="deleteItem" :class="colorClass") {{status === 1 ?'Un Ban': 'Ban'}}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Ban User",
    },
    desc: {
      type: String,
      default:
        "And pay attention - you need to update your adverise in 30 days, or than we deleted this publicaiton",
    },
    status: {
      type: Number,
      default: null,
    },
  },

  computed: {
    colorClass() {
      return this.status === 1 ? "green" : "red";
    },
  },
  methods: {
    closeModal() {
      this.$emit("cancel");
      this.$root.$emit("bv::hide::modal", "modal-ban-user");
    },
    deleteItem() {
      this.$emit("ban");
      this.$root.$emit("bv::hide::modal", "modal-ban-user");
    },
  },
};
</script>

<style lang="scss">
.modal-delete {
  .modal-content {
    padding-top: 70rem;
    padding-bottom: 70rem;
  }

  @include large-mobile {
    padding: 0 !important;
    .modal-content {
      border-radius: 10rem 10rem 0 0;
      padding: 50rem 15rem 20rem 15rem;
    }
  }

  &__body {
    text-align: center;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 77rem;
    height: 77rem;
    background: #fce7e7;
    border-radius: 20rem;
    margin: 0 auto;

    svg {
      width: 30rem;
      height: 23rem;
      stroke: none;
      fill: $red;
      stroke-width: 1.5;
    }
  }

  &__title {
    margin-top: 30rem;

    @include large-mobile {
      font-family: "Atyp Display";
      margin-top: 25rem;
      line-height: 1;
      font-weight: 500;
    }
  }

  &__desc {
    margin: 20rem auto 0 auto;
    font-weight: 400;
    max-width: 400rem;
    @include large-mobile {
      line-height: 1.3;
      font-size: 16rem;
      max-width: 272rem;
    }
  }

  &__btn {
    min-width: 131rem;
    margin-top: 40rem;
    background: #f4f3f4;
    border-radius: 10px;
    @include large-mobile {
      width: 100%;
      margin-top: 60rem;
    }

    &s {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 13px;
    }
    &:hover {
      color: inherit;
    }
    &.red,
    &.green {
      color: #fff !important;
      border-radius: 10px;

      &:hover {
        color: #fff;
      }
    }
    &.red {
      background: #eb5757 !important;
    }
    &.green {
      background: $green !important;
    }
  }
}

.modal-success__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 77rem;
  height: 77rem;
  background: rgba($green, 0.1);
  border-radius: 20rem;
  margin: 0 auto;

  svg {
    width: 30rem;
    height: 23rem;
    stroke: none;
    fill: $green;
    stroke-width: 1.5;
  }
}
</style>
