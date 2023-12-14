export default {
 async SET_CATEGORIES({commit,state}, lang = 'en') {
    let filter = `filter=id;name;slug`
    let search = `search=parent_category:0&searchFields=name->${lang}:like`
    let withFields = `with=picture;allSubCategories`
    let api = `${this.$api.categories}?page=1&per_page=20&${search}&${filter}&${withFields}`

   if(state.categories.length === 0) await this.$axios.$get(api).then(({data}) => commit('CHANGE_CATEGORIES', data))

  },
  async SET_CATEGORY({commit}, slug) {
    await this.$axios.$get(`/admin/categories/${slug}`)
        .then(({data}) => commit('CHANGE_CATEGORY', data))
  },
   SET_REMOVE_CATEGORY({commit}) {
    commit('CHANGE_REMOVE_CATEGORY', null)
  },

  SET_CATEGORIES_ACTIVE({commit,state}, number = 0){
    commit('CHANGE_CATEGORY_NUMBER', number)
  },
}