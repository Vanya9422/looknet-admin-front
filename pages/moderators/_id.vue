<template lang="pug">
main.main
  modal-delete(@cancel="flag = false", @deleteItem="delModal")
  section.section-user(v-if="user")
    .section-user__row
      .section-user__column.section-user__column_left
        part-user-box.section-user__box(
          buttonText="Delete this menager",
          :list="userList",
          :avatar="user.avatar",
          :userId="user.id",
          :name="user.full_name",
          about="",
          edit,
          @closeModal="fetchData",
          @btn="deleteModerator"
        )
      .section-user__column.section-user__column_right
        button-back.color-blue(blue, @click.prevent.native="$router.go(-1)") Back
        h3.section-user__title.h3 Publications
        div
        part-back-nav.section-user-inner(
          :nav="nav",
          :status="status",
          @change="changeStatus",
          mobile,
          mobileBlue
        )
        .section-user__settings(v-if="status === 1")
          .section-user__settings-list
            .section-user__settings-item
              .section-user__settings-title.h3 Username
              part-edit-field.section-user__settings-field(
                v-for="(field, i) in fields",
                :key="i",
                :label="field.label",
                v-model="field.value",
                :name="field.name",
                :type="field.type",
                :placeholder="field.placeholder",
                :modalName="field.modalName",
                :groupName="field.groupName",
                v-if="!field.option",
                @save="fetchData"
              )
            .section-user__settings-item
              .settings__item-title.h3 Notifications
              user-change-email.section-user__settings-field(
                :user="user",
                :edit="changeEmail",
                @edit="(val) => (changeEmail = val)"
              )
              user-change-phone.section-user__settings-field(
                :user="user",
                :edit="changePhone",
                @edit="(val) => (changePhone = val)"
              )
            .section-user__settings-item
              .settings__item-title.h3 Authorization
              user-change-password.section-user__settings-field
        .section-user__statistics(v-if="status === 2")
          .section-user__statistics-list
            .section-user__statistics-item(
              v-for="(item, index) in getList",
              :key="index"
            )
              span.section-user__statistics-item__number {{ statistic[item.key] || 0 }}
              .section-user__statistics-item__bottom
                .section-user__statistics-item__text {{ item.text }}
                .section-user__statistics-item__icon(
                  v-tippy="{ placement: 'bottom-center', animateFill: false, theme: 'statistics' }",
                  content="<strong class='section-user__statistics-item__icon-info'>Contrary to popular belief, Lorem Ipsum is not simply random text.</strong>"
                )
                  svg-icon(name="info-admin")
        modertaor-permissions(
          v-if="status === 3",
          :permissionsList="user.permissions_ids",
          :userId="$route.params.id"
        )
</template>

<script>
import moment from "moment";

export default {
  middleware: ["showModerators"],
  data() {
    return {
      user: null,
      nav: [
        {
          text: "Profile",
          status: 1,
        },
        {
          text: "Statistics",
          status: 2,
        },
        {
          text: "Rights ",
          status: 3,
        },
      ],
      status: 1,
      key: 0,
      fields: [
        {
          groupName: "Username",
          label: "First name",
          placeholder: "Alexandr",
          value: "",
          modalName: "first_name",
        },
        {
          groupName: "Username",
          label: "Last name",
          placeholder: "Bairamov",
          value: "",
          modalName: "last_name",
        },
      ],
      flag: false,
      changeEmail: false,
      changePhone: false,
      statistic: {},
    };
  },
  computed: {
    userList() {
      if (this.user) {
        return [
          {
            label: "Email",
            text: this.user.email || "-",
          },
          {
            label: "Date register",
            text: this.generateDate(this.user.created_at),
          },
          {
            label: "ID",
            text: this.user.id || "-",
          },
          {
            label: "Phone",
            text: this.user.phone_view ? "+" + this.user.phone_view : "-",
          },
        ];
      }
    },
    getList() {
      return [
        {
          text: "Ads viewed",
          key: "viewed_count",
        },

        {
          text: "Total ads approved",
          key: "approved_count",
        },

        {
          text: "Total ads rejected.",
          key: "rejected_count",
        },

        {
          text: "Number of banned users",
          key: "banned_count",
        },

        {
          text: "Number of unbanned users",
          key: "un_banned_count",
        },

        {
          text: "Number of completed requests in support",
          key: "closed_tickets_count",
        },

        {
          text: "Number of pending support requests.",
          key: "pending_tickets_count",
        },

        {
          text: "Number of transferred support requests per different manager",
          key: "another_moderator_count",
        },
      ];
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    generateDate(date) {
      if (!date) return "";
      return moment(date).utc().format("DD/MM/yyyy");
    },
    changeStatus(item) {
      this.status = item.status;
      this.key++;
    },
    fetchData() {
      let search = `/admin/moderators/${this.$route.params.id}`;
      ``;
      this.$axios.$get(search).then((res) => {
        this.user = res;
        this.fields[0].value = res.first_name;
        this.fields[1].value = res.last_name;
      });
      this.$axios
        .$get(`/admin/moderators/${this.$route.params.id}/statistics`)
        .then(({ data }) => {
          this.statistic = data;
          // this.user = res
          // this.fields[0].value = res.first_name
          // this.fields[1].value = res.last_name
        });
    },
    delModal() {
      this.$axios
        .$delete(`/admin/moderators/${this.$route.params.id}`)
        .then((res) => {
          this.$router.push("/moderators");
        });
    },
    deleteModerator() {
      this.flag = true;
      this.$root.$emit("bv::show::modal", "modal-delete");
    },
  },
};
</script>

<style lang="scss">
.section-user .section-user-inner {
  margin: 35px 0 60px;
}

.section-user__statistics {
  margin-top: -18px;

  &-list {
    @include items(4, 8);
    @include large-desktop {
      @include items(3, 8);
    }
    @include large-mobile {
      @include items(2, 8);
    }
  }

  &-item {
    min-height: 155px;
    padding: 17px 15px 15px;
    border-radius: 10px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #d2d2d7;
    @include large-mobile {
      min-height: 100px;
    }

    &__number {
      font-weight: 500;
      font-size: 20px;
      line-height: 120%;
      letter-spacing: -0.02em;
      color: $blue;
      @include large-mobile {
        font-size: 18px;
      }
    }

    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    &__text {
      font-weight: 500;
      font-size: 18px;
      line-height: 120%;
      letter-spacing: -0.02em;
      color: #062439;
      @include large-tablet {
        font-size: 16px;
      }
      @include large-mobile {
        font-size: 14px;
      }
    }

    &__icon {
      min-width: 22px;
      max-width: 22px;
      min-height: 22px;
      max-height: 22px;
      background: #f4f3f4;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      fill: #6e6e73;
      cursor: pointer;
      @include large-mobile {
        min-width: 16px;
        max-width: 16px;
        min-height: 16px;
        max-height: 16px;
      }
      &-info {
        max-width: 300px;
      }
      svg {
        width: 8px;
        height: 13px;
        @include large-mobile {
          width: 6px;
          height: 9px;
        }
      }
    }
  }
}

.section-user__chechboxes-item {
  margin: 50px 0;

  &:nth-child(2) {
    margin-top: 40px;
    @include large-mobile {
      margin-top: 20px;
    }
  }
  @include large-mobile {
    margin: 20px 0;
  }

  .checkbox__text {
    font-weight: 400;
    font-size: 20px;
    color: #062439;
    margin-left: 30px;
    @include large-mobile {
      font-size: 16px;
      margin-left: 15px;
    }
  }
}
.tippy-tooltip.statistics-theme {
  max-width: 300px !important;
  padding: 15px !important;
  @include large-mobile {
    font-size: 14px;
    padding: 10px 5px !important;
    strong {
      font-weight: 400;
    }
  }
}
</style>
