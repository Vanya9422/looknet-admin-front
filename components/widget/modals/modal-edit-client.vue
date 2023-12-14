<template lang="pug">
b-modal#modal-edit-client(
  ref="modal-edit-client",
  size="photo-size",
  modal-class="modal-add-moderator modal-edit-moderator",
  body-class="modal-add-moderator__body",
  header-class="modal-add-moderator__header",
  footer-class="modal-add-moderator__footer",
  @show="openModal",
  @hide="closeModal",
  centered,
  :hide-footer="true"
)
  template(#modal-header="{ close }")
    button-close.modal__close.modal__close-edit(@click.native="close()")
  section.section-user.modal-edit(v-if="client")
    .section-user__row
      .section-user__column.section-user__column_left
        part-user-box.section-user__box(
          :isClient="client.id",
          buttonText="Delete",
          :list="clientList",
          :avatar="client.avatar",
          :userId="client.id",
          :name="client.full_name",
          edit,
          about="",
          @btn="deleteClient",
          @closeModal="getClient"
        )
      .section-user__column.section-user__column_right
        h3.section-user__title.h3 Settings
        .section-user__settings
          .section-user__settings-list
            .section-user__settings-item(:key="key")
              part-edit-field.section-user__settings-field(
                v-for="(field, i) in fields",
                :key="i",
                :label="field.label",
                v-model="field.value",
                :name="field.name",
                :type="field.type",
                :placeholder="field.placeholder",
                :modalName="field.modalName",
                @save="handleLoad",
                :client="client"
              )
            user-change-phone.section-user__settings-field(
              isClient,
              @save="handleLoad",
              :user="client",
              :edit="changePhone",
              @edit="(val) => (changePhone = val)"
            )
</template>
<script>
import recommendedPassword from "@/mixins/auth/recommendedPassword";
import moment from "moment";
export default {
  props: {
    title: {
      type: String,
      default: "Add new Moderator",
    },
    avatar: {
      type: String,
      default: "",
    },
    userId: {
      type: Number,
      default: 0,
    },
    clientId: {
      type: Number,
      default: {},
    },
  },
  mixins: [recommendedPassword],
  data() {
    return {
      key: 0,
      client: null,
      name: "file",
      // changePhone:this.client.phone_view,
      changePhone: false,
      isPassword: true,
      loading: false,
      isPasswordConfirm: true,
      form: {
        img: "",
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        company: "",
      },
    };
  },
  computed: {
    clientList() {
      if (this.client) {
        return [
          {
            label: "Email",
            text: this.client.email || "-",
          },
          {
            label: "Date register",
            text: this.generateDate(this.client.created_at),
          },
          {
            label: "ID",
            text: this.client.id || "-",
          },
          {
            label: "Phone",
            text: this.client.phone_view ? "+" + this.client.phone_view : "-",
          },
        ];
      }
    },
    fields() {
      if (!this.client) return [];
      return [
        {
          label: "First name",
          placeholder: "Alexandr",
          value:
            this.client && this.client.first_name ? this.client.first_name : "",
          modalName: "first_name",
        },
        {
          label: "Last name",
          placeholder: "Bairamov",
          value:
            this.client && this.client.last_name ? this.client.last_name : "",
          modalName: "last_name",
        },
        {
          label: "Email",
          placeholder: "Email",
          value: this.client && this.client.email ? this.client.email : "",
          modalName: "email",
        },
      ];
    },
  },
  methods: {
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    deleteClient() {
      this.$axios.$delete(`${this.$api.clients}/${this.client.id}`).then(() => {
        this.$emit("changeClient", {
          full_name: "",
          email: "",
          phone_view: "",
          company: "",
        });
        this.closeModal();
      });
    },
    handleLoad() {
      this.key++;
      this.getClient();
    },
    changeAvatar(val) {
      let urlCreator = window.URL || window.webkitURL;
      this.form.img = urlCreator.createObjectURL(val);
      this.blob = val;
    },
    closeModal() {
      this.$refs["modal-edit-client"].hide();
      this.$emit("close");
    },
    isPhoneValid(val) {
      this.error.phone = false;
      this.form.phone = val;
      const error = this.$v.form.phone.$touch();
    },
    getClient() {
      this.$axios
        .$get(`/admin/commercial/clients/${this.clientId}`)
        .then(({ data }) => {
          this.client = data;
          this.$emit("changeClient", data);
        });
    },
    openModal() {
      this.key++;
      this.getClient();
    },
  },
};
</script>


<style lang="scss">
.modal-login__field:not(:first-child) {
  margin-top: 20rem;
}

.commercial__add-avatar .button-photo__wrap {
  border-radius: 50%;
}

.modal-add-moderator {
  .modal-dialog {
    max-width: 737px;
    width: 100%;
  }

  &.modal-edit-moderator {
    .modal-dialog {
      max-width: 1150px;
    }

    .edit-field__column_left {
      max-width: 25%;
    }

    .edit-field__column_right {
      width: 33%;
    }
  }

  &__buttons {
    @include items(3, 5);
  }

  .button-photo__img {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-height: 100%;
    }
  }

  &__footer {
    padding: 0;
    margin-top: 20rem;
    display: block;
    border: none;
  }

  .add-avatar__btn-full {
    margin: 24rem 0 20rem;
    height: 600px;

    width: 100%;

    .button-photo__wrap {
      border-radius: 16px;
      border-width: 2px;

      svg {
        width: 56px;
        height: 56px;
      }
    }
  }
}

.recommended-password-content {
  margin: 15px 0;
}

.section-user.modal-edit {
  margin: 0 !important;
  padding: 0 !important;
}

@include large-mobile {
  .modal__close-edit {
    display: none;
  }
}
</style>