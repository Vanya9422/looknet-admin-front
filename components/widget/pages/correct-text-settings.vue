<template>
  <form class="correct-text__section-list" id="correct-text__section-form" v-if="loading" :key="key">
    <h3 class="correct-text__label h3 tablet-hidden">Modal</h3>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Modal</div>
            <div class="correct-text__label correct-text__label_small"> Modal</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.title" @input="$v.content.title.$touch()" :error="$v.content.title.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Nav</div>
            <div class="correct-text__label correct-text__label_small"> Nav</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field" v-for="(item,index) in content.nav" :key="'new'+index">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">{{item.label}}</div>
            </div>
            <form-input class="correct-text__input" v-model="item.text" @input="$v.content.nav.$each[index].text.$touch()" :error="$v.content.nav.$each[index].text.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Username</div>
            <div class="correct-text__label correct-text__label_small"> Username</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.username" @input="$v.content.username.$touch()" :error="$v.content.username.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Name</div>
            <div class="correct-text__label correct-text__label_small"> Name</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.fName.label" @input="$v.content.fName.label.$touch()" :error="$v.content.fName.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.fName.placeholder" @input="$v.content.fName.placeholder.$touch()" :error="$v.content.fName.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Last Name</div>
            <div class="correct-text__label correct-text__label_small"> Last Name</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.lName.label" @input="$v.content.lName.label.$touch()" :error="$v.content.lName.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.lName.placeholder" @input="$v.content.lName.placeholder.$touch()" :error="$v.content.lName.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Notifications</div>
            <div class="correct-text__label correct-text__label_small"> Notifications</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.notifications" @input="$v.content.notifications.$touch()" :error="$v.content.notifications.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Email</div>
            <div class="correct-text__label correct-text__label_small"> Email</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.email.label" @input="$v.content.email.label.$touch()" :error="$v.content.email.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.email.placeholder" @input="$v.content.email.placeholder.$touch()" :error="$v.content.email.placeholder.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Email taken message</div>
            </div>
            <form-input class="correct-text__input" v-model="content.email.taken" @input="$v.content.email.taken.$touch()" :error="$v.content.email.taken.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Phone</div>
            <div class="correct-text__label correct-text__label_small"> Phone</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.phone.label" @input="$v.content.phone.label.$touch()" :error="$v.content.phone.label.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Safety</div>
            <div class="correct-text__label correct-text__label_small"> Safety</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.safety" @input="$v.content.safety.$touch()" :error="$v.content.safety.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Error</div>
            </div>
            <form-input class="correct-text__input" v-model="content.safetyError" @input="$v.content.safetyError.$touch()" :error="$v.content.safetyError.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Current Password</div>
            <div class="correct-text__label correct-text__label_small"> Current Password</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.currentPassword.label" @input="$v.content.currentPassword.label.$touch()" :error="$v.content.currentPassword.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.currentPassword.placeholder" @input="$v.content.currentPassword.placeholder.$touch()" :error="$v.content.currentPassword.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Password</div>
            <div class="correct-text__label correct-text__label_small"> Password</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.password.label" @input="$v.content.password.label.$touch()" :error="$v.content.password.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.password.placeholder" @input="$v.content.password.placeholder.$touch()" :error="$v.content.password.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">New Password</div>
            <div class="correct-text__label correct-text__label_small"> New Password</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.newPassword.label" @input="$v.content.newPassword.label.$touch()" :error="$v.content.newPassword.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.newPassword.placeholder" @input="$v.content.newPassword.placeholder.$touch()" :error="$v.content.newPassword.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Language</div>
            <div class="correct-text__label correct-text__label_small"> Language</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.lang.label" @input="$v.content.lang.label.$touch()" :error="$v.content.lang.label.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Blacklist</div>
            <div class="correct-text__label correct-text__label_small">Blacklist</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Delete</div>
            </div>
            <form-input class="correct-text__input" v-model="content.blacklist.delete" @input="$v.content.blacklist.delete.$touch()" :error="$v.content.blacklist.delete.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Was removed from the list</div>
            </div>
            <form-input class="correct-text__input" v-model="content.blacklist.wasRemoved" @input="$v.content.blacklist.wasRemoved.$touch()" :error="$v.content.blacklist.wasRemoved.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Removed</div>
            </div>
            <form-input class="correct-text__input" v-model="content.blacklist.removed" @input="$v.content.blacklist.removed.$touch()" :error="$v.content.blacklist.removed.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">from the list</div>
            </div>
            <form-input class="correct-text__input" v-model="content.blacklist.fromTheList" @input="$v.content.blacklist.fromTheList.$touch()" :error="$v.content.blacklist.fromTheList.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <correct-text-save @save="save()"></correct-text-save>
  </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {minLength, required} from "vuelidate/lib/validators";
import constructorPage from "@/mixins/constructorPage";

export default {
  data() {
    return {
      loading: false,
      id: null,
      content: {
        title: 'Settings',
        nav: [
          {
            text: 'Profile',
            label: 'Profile',
            to: '/setting',
          },
          {
            to: '/safety',
            label: 'Safety',
            text: 'Safety',
          },
          {
            to: '/blacklist',
            label: 'Blacklist',
            text: 'Blacklist',
          },
        ],
        username: 'Username',
        notifications: 'Notifications',
        language: 'Language',
        safety: 'Safety',
        safetyError: 'Error',
        fName: {
          label: 'First name',
          placeholder: 'Your Name'
        },
        lName: {
          label: 'Last name',
          placeholder: 'Your Last name'
        },
        email: {
          label: 'Email',
          placeholder: 'Your Email',
          taken: 'Email is taken',
        },
        phone: {
          label: 'Phone',
        },
        currentPassword: {
          label: 'Your current password',
          placeholder: 'Your current password'
        },
        password: {
          label: 'Password',
          placeholder: 'Your Password'
        },
        newPassword: {
          label: 'New password',
          placeholder: 'Your New password'
        },
        lang: {
          label: 'Language'
        },
        blacklist: {
          wasRemoved: "Was removed from the list",
          removed: "Removed",
          fromTheList: "from the list",
          delete: "Delete",
        },
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      nav: {
        $each: {
          text: {required, minLength: minLength(3)}
        }
      },
      username: {required, minLength: minLength(3)},
      notifications: {required, minLength: minLength(3)},
      language: {required, minLength: minLength(3)},
      safety: {required, minLength: minLength(3)},
      safetyError: {required, minLength: minLength(3)},
      fName: {
        label: {required, minLength: minLength(3)},
        placeholder: {required, minLength: minLength(3)}
      },
      lName: {
        label: {required, minLength: minLength(3)},
        placeholder: {required, minLength: minLength(3)}
      },
      email: {
        label: {required, minLength: minLength(3)},
        placeholder: {required, minLength: minLength(3)},
        taken: {required, minLength: minLength(3)},
      },
      phone: {
        label: {required, minLength: minLength(3)},
      },
      currentPassword: {
        label: {required, minLength: minLength(3)},
        placeholder: {required, minLength: minLength(3)}
      },
      password: {
        label: {required, minLength: minLength(3)},
        placeholder: {required, minLength: minLength(3)}
      },
      newPassword: {
        label: {required, minLength: minLength(3)},
        placeholder: {required, minLength: minLength(3)}
      },
      lang: {
        label: {required, minLength: minLength(3)}
      },
      blacklist: {
        wasRemoved: {required, minLength: minLength(3)},
        removed: {required, minLength: minLength(3)},
        fromTheList: {required, minLength: minLength(3)},
        delete: {required, minLength: minLength(3)},
      }
    }
  },
  mixins:[constructorPage],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
