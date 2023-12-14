import {searchFields, sortNewest, withField} from "~/mixins/helpers/products";

export default {
  CHANGE_ADVERTISES_STATUS({commit, dispatch}, {status}) {
    commit('SET_ADVERTISES_STATUS', status)
    commit('CHANGE_PAGE', 1)
  },
  SET_PAGE({commit}, page = 1) {
    commit('CHANGE_PAGE', page)
  },
  SET_ADVERTISES({commit, state}, filter = {}) {
    return new Promise((resolve, reject) => {
      let loaded = undefined;
      let api =
          `${this.$api.products}?per_page=${state.per_page || 20}&page=${state.page}&${withField}&${searchFields}&${sortNewest}`;
      api += `&search=status:${state.status}`
      let search = this.$getQueryFilter([...filter])
      if (search !== '') api += ';' + search
      // let api = `${this.$api.products}?per_page=${state.per_page || 10}&page=${state.page}&${filter}&${withField}&${noVip}`;
      this.$axios.$get(api)
          .then(({data, meta: {current_page, last_page, total}}) => {
            commit('CHANGE_ADVERTISES', data)
            commit('CHANGE_PAGE', current_page + 1)
            commit('CHANGE_TOTAL', total)
            commit('CHANGE_LAST_PAGE', last_page)
            loaded = current_page < last_page
            resolve(loaded);
          })
          .catch(error => reject(error));
    })
  },
  SET_CHECKED_ALL({commit, state}, flag) {
    commit('CHANGE_CHECKED_LIST_ALL', flag)
  },
  SET_CHECKED_LIST({commit, state}, i) {
    commit('CHANGE_CHECKED_LIST', i)
  },
  GET_BAN_USER({commit, state}, id = false) {
    return new Promise((resolve, reject) => {
      commit('CHANGE_GET_BAN_USER', id)
      resolve(true);
    })
  },
  SET_BAN_USER_REMOVE({commit}) {
    commit('CHANGE_BAN_USER_REMOVE')
  },
  BAN_USER({commit, state}) {
    return new Promise((resolve, reject) => {
      const data = {
        banned_ids: state.banUserId,
        type: 1
      }
      this.$axios.$put(this.$api.banUser, data).then(() => {
        commit('CHANGE_BAN_USER')
        resolve(true);
      })
    })

  },
  GET_ACTIVE_PRODUCT_ID({commit, state}, id = false) {
    return new Promise((resolve, reject) => {
      commit('CHANGE_GET_ACTIVE_PRODUCT_ID', id)
      resolve(true);
    })
  },
  GET_ACTIVE_PRODUCT_ID_REMOVE({commit}) {
    commit('CHANGE_ACTIVE_PRODUCT_ID_REMOVE')
  },
  SET_ACTIVE_PRODUCT({commit, state}, category) {
    return new Promise((resolve, reject) => {
      const route = state.advertises[state.activeProductId].slug
      const data = {category_id: category.id}
      this.$axios.$put(`${this.$api.products}/${route}/change-category`, data).then(() => {
        commit('CHANGE_ACTIVE_PRODUCT', category)
        resolve(true);
      })
    })
  },

  SET_PRODUCT_STATUS({commit, state}, {data,productId}) {
    return new Promise((resolve, reject) => {
      this.$axios.$put(this.$api.productStatus, data)
          .then(()=>{
            commit('CHANGE_PRODUCT_STATUS', {data,productId})
            resolve(true);
          })
    })
  }
}
