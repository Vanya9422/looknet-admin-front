export default {
  CHANGE_REVIEWS(state, { reviews }) {
    state.reviews.push(...reviews.data);
  },

  CHANGE_PAGE(state, nextPage) {
    state.page = nextPage;
  },

  CHANGE_LOADED(state, isReviewsLoaded) {
    state.isReviewsLoaded = isReviewsLoaded;
  },

  RESET_REVIEWS_STATE(state) {
    state.page = 1;
    state.reviews = [];
    state.isReviewsLoaded = false;
  },

  SET_REVIEWS_STATUS(state, status) {
    state.status = status;
  },
};
