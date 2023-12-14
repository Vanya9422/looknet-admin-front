export default {
   SET_STATISTIC({commit}, statistic) {
    commit('CHANGE_STATISTIC', statistic)
  },
  async SET_DETAIL({commit}, detail) {
    if(!detail) {
      commit('CHANGE_DETAIL', null)
    }else{
      commit('CHANGE_DETAIL', null)
      await this.$axios.$get(`${this.$api.advertises.index}/${detail}?with=category;author.avatar;gallery;city;answers`)
        .then(({data}) => commit('CHANGE_DETAIL', data))
    }
  },
  async SET_MODAL_DETAIL({commit}, detail) {
      commit('CHANGE_MODAL_DETAIL', null)
      await this.$axios.$get(`${this.$api.advertises.index}/${detail}?with=category;author.avatar;gallery;city;answers`)
        .then(({data}) => commit('CHANGE_MODAL_DETAIL', data))
  },
  async SET_RECOMEND({commit, state},category_id) {
    await this.$axios.$get(`${this.$api.advertises.index}?with=category;author;gallery;city;answers&page=1&per_page=6&randomResult=true&search=category_id:${category_id}`)
      .then(({data,meta}) => {
        commit('CHANGE_RECOMEND', data)
        commit('CHANGE_CURRENT_PAGE_RECOMEND', meta.current_page)
        commit('CHANGE_LAST_PAGE_RECOMEND', meta.last_page)
      })
  },
  async SET_MORE_RECOMEND({commit, state},category_id) {
    await this.$axios.$get(`${this.$api.advertises.index}?with=category;author;gallery;city;answers&page=${state.currentPageRecomend + 1}&per_page=6&randomResult=true&search=category_id:${category_id}`)
      .then(({data,meta}) => {
        commit('CHANGE_MORE_RECOMEND', data)
        commit('CHANGE_CURRENT_PAGE_RECOMEND', meta.current_page)
        commit('CHANGE_LAST_PAGE_RECOMEND', meta.last_page)
      })
  },
  async SET_USER_PRODUCTS({commit, state}) {
    await this.$axios.$get(`${this.$api.advertises.index}?page=1&with=city;author;gallery;category&search=user_id:${state.detail.author.id}`)
      .then(({data}) => commit('CHANGE_USER_PRODUCTS', data))
  },
  async SET_DETAIL_LIST({commit},list) {
    commit('CHANGE_DETAIL_LIST', list)
  },
  async SET_DETAIL_ACTIVE({commit},index) {
    commit('CHANGE_DETAIL_ACTIVE', index)
  },
  SET_PRODUCT_CART_TYPE({commit}, type) {
    commit("CHANGE_PRODUCT_CART_TYPE", type);
  },
}
