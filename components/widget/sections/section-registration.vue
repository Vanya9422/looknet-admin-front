<template lang="pug">
	section.registration
		.registration__wrap.wrap
			.registration__img.registration__img_left
				img(src="~/assets/img/registration__img1.png")
			.registration__img.registration__img_right
				img(src="~/assets/img/registration__img2.png")
			.registration__inner
				part-registration-form.registration__form(:title="title"  )
					slot
					template(v-slot:bottom)
						slot(name="bottom")


</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Create your profile"
		},
	},
}
</script>

<style lang="scss">
.registration {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 100rem 0;
  overflow: hidden;

  @include small-tablet {
    padding-top: 60rem;
  }

  @include large-mobile {
    padding: 20rem 0 80rem 0;
  }

  &__wrap {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 0;
    @include large-mobile {
      flex-direction: column;
    }
  }

  &__inner {
    width: 100%;
    max-width: 530rem;
    position: relative;

    @include large-mobile {
      height: 100%;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }
  }

  &__img {
    position: absolute;

    &_left {
      top: -28px;
      left: -202rem;
      width: 487rem;
    }

    &_right {
      bottom: 33px;
      right: -167rem;
      width: 582rem;
    }

    @include large-desktop {
      &_left {
        left: -150rem;
      }
    }
    @include large-tablet {
      &_left {
        left: -75rem;
        width: 350px;
      }
      &_right {
        width: 400px;
        right: -150rem;
      }
    }

    @include small-tablet {
      display: none;
    }
  }

  &__form {
    @include large-mobile {
      position: relative;
      height: 100%;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
