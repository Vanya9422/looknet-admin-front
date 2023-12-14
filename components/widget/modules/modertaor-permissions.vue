<template lang="pug">
  .section-user__chechboxes
    .section-user__settings-title.h3 Rights
    .section-user__chechboxes-item(v-for="(item) in permissions" :key="item.id")
      form-checkbox(
        :checked="item.checked"
        @change="changePermissions(item.id)"
      ) {{item.text}}
</template>

<script>
export default {
  props: {
    permissionsList: {
      type: Array,
      default: []
    },
    userId: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      list: this.permissionsList
    }
  },
  computed: {
    permissions() {
      return [
        {
          id: 1,
          key: 'user_information',
          text: 'View user information',
          checked: this.findPermissions(1),
        }, {
          id: 2,
          key: 'access_commercial',
          text: 'Access to the commercial part of the site',
          checked: this.findPermissions(2),

        }, {
          id: 3,
          key: 'access_website_content_and_picture_editing',
          text: 'Access to editing website content And Picture editing',
          checked: this.findPermissions(3),

        }, {
          id: 4,
          key: 'category_management',
          text: 'Category Management',
          checked: this.findPermissions(4),

        }, {
          id: 5,
          key: 'access_excel_data_users',
          text: 'Access to generate and download Users Excel data',
          checked: this.findPermissions(5),

        }, {
          id: 6,
          key: 'view_and_manage_managers',
          text: 'View and Manage Managers',
          checked: this.findPermissions(6),

        }, {
          id: 7,
          key: 'access_support',
          text: 'Access to user support',
          checked: this.findPermissions(7),

        }, {
          id: 9,
          key: 'special_advertise_account',
          text: 'РЕКЛАМНЫЙ АКУКАУНТ',
          checked: this.findPermissions(9),

        }
      ]
    }
  },
  methods: {
    findPermissions(id) {
      return this.list.findIndex(item => id === item) >= 0
    },
    findIndexArray(id){
      return this.list.findIndex(item => item === id);
    },
    changePermissions(id) {
      const index = this.findPermissions(id)
      const indexArray = this.findIndexArray(id);
      if (index) this.list.splice(indexArray, 1)
      else this.list.push(id)
      const form = {
        user_id: this.userId,
        permissions: this.list
      }
      this.$axios.$post('/admin/give-permission', form).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
