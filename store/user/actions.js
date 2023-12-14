export default {
  async SET_USER_LOCAL({commit}, accessToken) {
    let storage = process.browser ? window.localStorage.getItem('auth._token.laravelSanctum') : false
    let token = accessToken ? accessToken : storage
    console.log(token, 'TOKEN')
    if (token !== 'false') {
      this.$auth.strategy.token.set(token);
      this.$axios.setToken(token, 'Bearer')
      await this.$axios.$get('/user', {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      }).then(async (result) => {
        await this.$auth.setUser(result)
        this.$auth.$storage.setUniversal('loggedIn', true)
      });
    }
  }
}
