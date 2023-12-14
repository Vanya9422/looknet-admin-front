import login from "~/pages/auth/login";

export default {
  async SET_LANGUAGES({ commit }) {
    await this.$axios.$get(this.$api.lang).then(({ data }) => commit('CHANGE_LANGUAGES', data))
  },
  async SET_ADD_LANGUAGES({ commit }, form) {
    return new Promise((resolve, reject) => {
      if (form.id) form._method = 'PUT'
      this.$axios.$post(this.$api.langChane, form).then(({ data }) => {
        if (form.id) commit('CHANGE_EDIT_LANGUAGES', data)
        else commit('CHANGE_ADD_LANGUAGES', data)
        resolve(data);
      }).catch((error) => {
        reject(error);
      })
    });
  },
  async SET_DELETE_LANGUAGES({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.$delete(`${this.$api.langChane}/${id}`).then(({ data }) => {
        commit('CHANGE_DELETE_LANGUAGES', id)
        resolve(data);
      }).catch((error) => {
        reject(error);
      })
    });
  },
  SET_LANGUAGE({ commit }, code) {
    commit('CHANGE_LANGUAGE', code)
  },
  SET_TYPE({ commit }, code) {
    commit('CHANGE_TYPE', code)
  },
  async SET_PAGES({ commit, state }, code) {
    try {
      const res = await this.$axios.$get(this.$api.page, {
        page_key: code,
        locale: state.lang,
        type: state.type
      })
      commit('CHANGE_PAGE', code)
      if (res) {
        commit('CHANGE_CORRECT', res.data)
      } else {
        commit('CHANGE_CORRECT', state.contact)
      }

    } catch (e) {
      console.log(e)
    }
  },
  CHANGE_CORRECT({ commit }, array) {
    commit('CHANGE_CORRECT', array)
  },
  ADD_CORRECT_CONTACT_PHONE({ commit }, code) {
    commit('ADD_CORRECT_CONTACT_PHONE', code)
  },
  ADD_CORRECT_CONTACT_EMAIL({ commit }, code) {
    commit('ADD_CORRECT_CONTACT_EMAIL', code)
  },
  DELETE_CORRECT_CONTACT_PHONE({ commit }, index) {
    commit('DELETE_CORRECT_CONTACT_PHONE', index)
  },
  DELETE_CORRECT_CONTACT_EMAIL({ commit }, index) {
    commit('DELETE_CORRECT_CONTACT_EMAIL', index)
  },
  SAVE_PAGE({ commit, state }, page) {
    return new Promise((resolve, reject) => {
      if (!state.loading) {
        commit('LOADING', true)
        let page_key = state.page;
        if (page.type) page_key += `-${page.type}`
        // if (state.lang !== 'en') page_key += `-${state.lang}`
        let formData = {
          type: state.type,
          locale: 'en',
          page_key,
          content: JSON.stringify(page.content),
          files: page.files
        }
        if (page.id) formData.id = page.id
        this.$axios.setHeader('Accept-Language', state.lang || 'en')
        this.$axios.$put(this.$api.adminPage, formData)
          .then(res => {
            commit('CHANGE_OPEN_MODAL', true)
            resolve(res);
          })
          .finally(() => commit('LOADING'))
      }
    })
  },
  SET_OPEN_MODAL({ commit }, flag = false) {
    commit('CHANGE_OPEN_MODAL', flag)
  }


}
