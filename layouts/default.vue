<template lang="pug">
  .container
    template(v-if="!$auth.loggedIn")
      module-page-helper
      part-header(  :small="$auth.loggedIn")
      Nuxt
    template(v-if="$auth.loggedIn")
      .container__row
        .container__column.container__column_left
          part-back-sidebar(:nav="nav")
        .container__column.container__column_right
          .container__inner
            part-header(back)
          Nuxt
          part-mobile-menu
          modal-search
</template>
<script>
export default {
  middleware: ['admin'],
  computed: {
    nav() {
      return [
        {
          icon: 'apps',
          to: '/announcement-list',
          name: 'Advertises',
          show: true
        },
        {
          icon: 'user',
          to: '/users',
          name: 'Users',
          show: this.isShow(1)
        },
				{
					icon: 'feedback',
					to: '/feedback-list',
					name: 'Feedback',
          show: true
				},
        {
          icon: 'shield',
          to: '/moderators',
          name: 'Moderators',
          show: this.isShow(6)
        },
        {
          icon: 'editText',
          to: '/redaction/web',
          name: 'Redaction',
          show: this.isShow(3)
        },
        {
          icon: 'editText',
          to: '/redaction/categories',
          name: 'Redaction',
          show: this.isShow(4) && !this.isShow(3)
        },
        {
          icon: 'support',
          to: '/support-chat',
          name: 'Support chat',
          show: this.isShow(7)
        },
        {
          icon: 'wallet',
          to: '/commercial',
          name: 'Commercial',
          show: this.isShow(2)
        }
      ]
    }
  },
  methods: {
    isShow(permission) {
      if (this.$auth.user) return this.$auth.user.permissions_ids.findIndex(item => item === permission) >= 0
    }
  }
}
</script>
