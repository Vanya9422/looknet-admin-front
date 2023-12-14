<template lang="pug">
b-modal#modal-photo(
  ref="modal-photo",
  size="photo-size",
  modal-class="modal-photo",
  body-class="modal-photo__body",
  header-class="modal-photo__header",
  footer-class="modal-photo_footer",
  centered,
  :hide-footer="true",
  @show="open"
)
  template(#modal-header="{ close }")
    button-close.modal__close(@click.native="closeModal()")
  h3.modal-photo__title.h3.mobile-visible {{ title }}
  form.modal-photo__row(ref="form")
    .modal-photo__column.modal-photo__column_left
      button-photo.modal-photo__img.modal-photo__img-1(
        :class="{ error: error }",
        :img="form.file",
        name="file",
        big,
        @change="changePhoto"
      )
        .modal-photo__img-icon
          svg-icon(name="image")
      .modal-photo__list
        .modal-photo__item.h6
          .modal-photo__item-label.color-gray Имя файла
          .modal-photo__item-text {{ info.name || "-" }}
        .modal-photo__item.h6
          .modal-photo__item-label.color-gray Тип файла
          .modal-photo__item-text {{ info.type || "-" }}
        .modal-photo__item.h6
          .modal-photo__item-label.color-gray Загружен
          .modal-photo__item-text {{ generateDate(info.date || new Date()) }}
        .modal-photo__item.h6
          .modal-photo__item-label.color-gray Размер файла
          .modal-photo__item-text {{ info.size ? Math.floor(info.size / 1000) + " KB" : "-" }}

    .modal-photo__column.modal-photo__column_right
      h3.modal-photo__title.h3.mobile-hidden {{ title }}
      .modal-photo__form
        .modal-photo__field
          label.modal-photo__label.h4 Атрибуты alt
          form-input.modal-photo__input(
            placeholder="Alexander",
            name="alt",
            v-model="form.alt",
            @input="$v.form.alt.$touch()",
            :error="$v.form.alt.$error"
          )
          .modal-photo__text
            | Опишите назначение изображения. Оставьте пустым, если изображение является только элементом декора
        .modal-photo__field
          label.modal-photo__label.h4 Header
          form-input.modal-photo__input(
            placeholder="example@gmail.com",
            name="header",
            v-model="form.header",
            @input="$v.form.header.$touch()",
            :error="$v.form.header.$error"
          )
        //.modal-photo__field
          //label.modal-photo__label.h4 Подпись
          //form-input.modal-photo__input
        .modal-photo__field
          label.modal-photo__label.h4 Description
          form-textarea.modal-photo__textarea(
            placeholder="Tell us about the product",
            v-model="form.description",
            name="description",
            @input="$v.form.description.$touch()",
            :error="$v.form.description.$error"
          )
        .modal-photo__field(v-if="user")
          .modal-photo__user
            .modal-photo__user-label.h4.mb-0 User
            .modal-photo__user-text.color-gray.p.mt-5 {{ user.user.full_name }}
        .modal-photo__buttons
          .modal-photo__buttons-wrap.flex.flex_right
            button-primary.modal-photo__delete(
              gray,
              v-if="id !== 0",
              @click.prevent.native="deletePhoto",
              icon="close",
              to="#"
            ) Delete
            button-primary.modal-photo__btn(blue, @click.prevent.native="save") Send form
</template>
<script>
import { minLength, required } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  props: {
    title: {
      type: String,
      default: "Заголовок",
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        file: "",
        alt: "",
        header: "",
        description: "",
      },
      info: {
        name: "",
        type: "",
        size: "",
        date: new Date(),
      },
      error: false,
      user: null,
    };
  },
  validations: {
    form: {
      alt: { required, minLength: minLength(2) },
      header: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(2) },
    },
  },
  methods: {
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD.MM.yyyy");
    },
    closeModal() {
      this.$refs["modal-photo"].hide();
      this.$emit("close");
    },
    open() {
      this.$v.form.$reset();
      this.error = false;
      if (this.id !== 0) {
        this.$axios.$get(`${this.$api.gallery}/${this.id}`).then(({ data }) => {
          const { auditModel, custom_details } = data;
          this.user = auditModel;
          this.form = custom_details || {
            file: "",
            alt: "",
            header: "",
            description: "",
          };
          this.form.file = data.original_full_url;
          this.info = {
            name: data.name,
            type: data.mime_type,
            date: new Date(data.created_at),
            size: data.size,
          };
        });
      } else {
        this.form = {
          file: "",
          alt: "",
          header: "",
          description: "",
        };
        this.info = {
          name: "",
          type: "",
          size: "",
          date: new Date(),
        };
      }
    },
    save() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        const form = this.$refs.form;
        const formData = new FormData(form);
        let api = this.$api.gallery;
        if (this.id !== 0) {
          api += `/${this.id}`;
          formData.append("_method", "PUT");
        }
        this.$axios
          .$post(api, formData)
          .then(() => {
            this.closeModal();
          })
          .catch(() => (this.error = true));
      }
    },
    deletePhoto() {
      if (this.id) {
        this.$axios.$delete(`${this.$api.gallery}/${this.id}`).then(() => {
          this.closeModal();
          this.$emit("removePhoto");
        });
      }
    },
    changePhoto(file, obj) {
      this.error = false;
      this.info = {
        name: obj[0].name,
        type: obj[0].type,
        size: obj[0].size,
      };
      this.form.file = file;
    },
  },
};
</script>
<style lang="scss">
.modal-photo__img-1 .button-photo__wrap .modal-photo__img-icon svg {
  fill: transparent !important;
}
.modal-photo {
  @include large-mobile {
    padding: 45rem 0 0 0 !important;
    .modal-content {
      padding: 25rem 15rem 0 15rem;
    }
  }

  &__row {
    display: flex;

    @include large-mobile {
      flex-wrap: wrap;
    }
  }

  &__column {
    &_left {
      width: 287rem;
      min-width: 287rem;
      margin-right: 50rem;
    }

    &_right {
      width: 100%;
    }

    @include small-tablet {
      &_left {
        width: 250rem;
        min-width: 250rem;
        margin-right: 30rem;
      }
    }

    @include large-mobile {
      width: 100%;
      &_left {
        min-width: inherit;
        margin-right: 0;
      }
    }
  }

  &__img {
    position: relative;
    background: #eef1fe;
    border-radius: 20rem;
    border: 1px solid #eef1fe;
    transition: 0.3s;

    &:hover {
      border-color: $blue;
    }

    &.error {
      border-color: $red;
    }

    .button-photo__edit {
      z-index: 9;
    }

    .button-photo__img {
      border-radius: 5px;

      img {
        max-height: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &.button-photo {
      width: 100%;
      height: 287rem;
    }

    .button-photo__wrap {
      border-width: 0;
      border-radius: 27px;

      &:before {
        background: transparent;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &-icon {
      width: 68rem;
      height: 68rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -34rem 0 0 -34rem;
      stroke: $blue;
      stroke-width: 1.5;
      fill: none;

      svg {
        height: 100%;
      }
    }

    @include large-mobile {
      padding-top: div(262, 345) * 100%;
    }
  }

  &__list {
    margin-top: 20rem;
  }

  &__item {
    display: flex;
    justify-content: space-between;

    &:not(:first-child) {
      margin-top: 10rem;
    }

    &-label {
      font-weight: normal;
    }

    @include large-mobile {
      font-size: 16rem;
    }
  }

  &__title {
    font-family: "Atyp Display";

    @include large-mobile {
      font-weight: 500;
      margin-bottom: 20rem;
    }
  }

  &__field {
    margin-top: 40rem;

    @include large-mobile {
      margin-top: 30rem;
    }
  }

  &__label {
    display: block;
    font-family: "Gilroy";
    margin-bottom: 15rem;

    @include large-mobile {
      font-family: "Atyp Display";
      font-size: 16rem;
      line-height: 1;
      margin-bottom: 10rem;
    }
  }

  &__text {
    margin-top: 10rem;
    max-width: 505rem;

    @include large-mobile {
      margin-top: 15rem;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    &-label {
      margin-right: 30rem;
    }

    @include large-mobile {
      &-label {
        font-family: "Atyp Display";
        font-size: 16rem;
        line-height: 1.25;
        margin-right: 15rem;
      }
    }
  }

  &__buttons {
    margin-top: 40rem;

    @include large-mobile {
      margin: 30rem -15rem 0 -15rem;
      padding: 10rem 15rem;
      border-top: 1px solid $light-gray;
      &-wrap {
        @include items(2, 6);
      }
    }
  }

  &__delete {
    min-width: 133rem;
    @include large-mobile {
      min-width: inherit;
    }
  }

  &__btn {
    margin-left: 10rem;
    min-width: 192rem;

    @include small-tablet {
      min-width: 150rem;
    }

    @include large-mobile {
      min-width: inherit;
      margin-left: 6rem;
    }
  }
}

.modal-photo__item-text {
  max-width: 175px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
