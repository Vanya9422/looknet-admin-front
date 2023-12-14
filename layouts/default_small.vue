<template lang="pug">
  .container
    module-page-helper
    part-header(  :small="$auth.loggedIn")
    Nuxt

</template>

<script>
export default {
  middleware: ['ghost'],
  data(){
    return{
      nav: [
        {
          icon: 'apps',
          to: '/announcement-list',
          name: 'Advertises'
        },
        {
          icon: 'user',
          to: '/users',
          name: 'Users'
        },
        {
          icon: 'shield',
          to: '/moderators',
          name: 'Moderators'
        },
        {
          icon: 'editText',
          to: '/сorrect-text',
          name: 'Correct the text'
        },
        {
          icon: 'support',
          to: '/support-chat',
          name: 'Support chat',
        },
        {
          icon: 'wallet',
          to: '/commercial',
          name: 'Commercial',
        }
      ]
    }
  },
  mounted() {
    console.log(this.$auth)
  }
}
</script>