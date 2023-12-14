<script>
export default {
  created() {
  this.logOut()
    },
  methods:{
    logOut() {
      this.$auth.logout()
    }
  }
}
</script>