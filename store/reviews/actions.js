export default {
  CHANGE_REVIEWS_STATUS({ commit }, { status }) {
    commit("RESET_REVIEWS_STATE");
    commit("SET_REVIEWS_STATUS", status);
  },

  async SET_REVIEWS({ state, commit }, { accessToken } = {}) {
    const storageToken = process.client
      ? localStorage.getItem("auth._token.laravelSanctum")
      : false;
    const token = accessToken || storageToken;

    if (token === "false" || token === false || token === null) return false;

    try {
      const reviews = await this.$axios.$get(
        `/admin/reviews?page=${state.page}&per_page=${state.per_page}&search=published:${state.status}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const nextPage = reviews.meta.current_page + 1;
      const isReviewsLoaded =
        reviews.meta.current_page === reviews.meta.last_page;

      commit("CHANGE_REVIEWS", { reviews });
      commit("CHANGE_PAGE", nextPage);
      commit("CHANGE_LOADED", isReviewsLoaded);
    } catch (error) {
      console.log(error);
    }
  },

  SET_REVIEWS_INITIAL_STATE({ commit }) {
    commit("RESET_REVIEWS_STATE");
  },
};
