export default {
  SET_ADD_FAVOURITE({state, commit}, {id = null, to = null, auth}) {
    let array = []
    const storage = localStorage.getItem('favourites')
    if (storage && storage[0] ==='[' ) array = JSON.parse(storage)
    else if (storage) array = storage.split(',')
    if (!id && !to) {
      this.$axios.$post(`/products/favorite`, {advertises: array})
      this.$axios.$get('/users/products/favorites').then(res => {
        commit('CHANGE_FAVOURITE', res.data.favorites)
      })
    } else {
      let haveInArray = array.findIndex((i) => i === id)
      if (auth) {
        this.$axios.$post(`/statistics/${to}/favorite`)
        if (haveInArray === -1) {
          this.$axios.$post(`/products/favorite`, {advertises: [id]}).then(res => {
            this.$axios.$get('/users/products/favorites').then(res => {
              commit('CHANGE_FAVOURITE', res.data.favorites)
            })
          })
        } else {
          this.$axios.$post(`/products/favorite/remove`, {
            _method: 'DELETE',
            advertises: [id]
          }).then(res => {
            this.$axios.$get('/users/products/favorites').then(res => {
              commit('CHANGE_FAVOURITE', res.data.favorites)
            })
          })
        }


      } else if (haveInArray === -1) {
        array.push(id)
        commit('CHANGE_FAVOURITE', array)
      } else {
        array.splice(haveInArray, 1)
        commit('CHANGE_FAVOURITE', array)
      }
      commit('CHANGE_ALL_FAVOURITE')
    }

  },
  SET_ALL_FAVOURITE({commit}) {
    commit('CHANGE_ALL_FAVOURITE')
  }
}