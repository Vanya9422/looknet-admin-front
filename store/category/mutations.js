export default {
  CHANGE_CATEGORIES(state, categories) {
    state.categories = categories
  },
  CHANGE_CATEGORY(state, category) {
    state.category = category
  },
  CHANGE_REMOVE_CATEGORY(state, category) {
    state.category = {}
    state.active = 0
  },
  CHANGE_CATEGORY_NUMBER(state,number) {
    state.active = number >= 0 ? number : 0
  }
}

