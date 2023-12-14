export default {
  GET_REVIEWS: (state) => state.reviews,

  GET_REVIEWS_LOADED: (state) => state.isReviewsLoaded,

  GET_DEAL_STATUS: (state) => (value) => state?.dealStatus?.[value] || "",

  GET_REVIEW_STATUS_TEXT: (state) => (value) =>
    state?.reviewStatus?.[value] || "",

  GET_REVIEW_SWITCHERS: (state) => state.switchers,

  GET_REVIEW_STATUS: (state) => state.status,
};
