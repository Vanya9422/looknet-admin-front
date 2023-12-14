import correctTextPages from "~/misc/data/correctTextPages";

export default {
  CHANGE_LANGUAGES(state, languages) {
    state.languages = languages
  },
  CHANGE_ADD_LANGUAGES(state, languages) {
    state.languages.push(languages)
  },
  CHANGE_DELETE_LANGUAGES(state,id) {
    const index = state.languages.findIndex(item => item.id === id)
    if(state.lang === state.languages[index].code) state.lang = ''
    state.languages.splice(index, 1)
  },

  CHANGE_EDIT_LANGUAGES(state, languages) {
    const index = state.languages.findIndex(item => item.id === languages.id)
    state.languages[index] = languages
    state.lang = languages.code
  },
  CHANGE_LANGUAGE(state, code) {
    state.lang = code
  },
  CHANGE_TYPE(state, code) {
    state.type = code
    state.pages = correctTextPages[code]
    state.page = ''
  },
  CHANGE_PAGE(state, code) {
    state.page = code
  },
  CHANGE_CORRECT(state, correct) {
        state.correct = correct
  },
  ADD_CORRECT_CONTACT_PHONE(state, contact) {
    state.correct.content.phone.list.push(contact)
  },
  ADD_CORRECT_CONTACT_EMAIL(state, contact) {
    state.correct.content.email.list.push(contact)
  },
  DELETE_CORRECT_CONTACT_PHONE(state, index) {
      state.correct.content.phone.list.splice(index, 1)
  },
  DELETE_CORRECT_CONTACT_EMAIL(state, index) {
      state.correct.content.email.list.splice(index, 1)
  },
  SAVE_PAGE(state, index) {
      state.correct.content.email.list.splice(index, 1)
  },
  CHANGE_OPEN_MODAL(state, flag = false){
    state.openModal = flag
  },
  LOADING(state, flag = false){
    state.loading = flag
  }
}

