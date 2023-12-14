export default () => ({
  page: 1,
  status: 0,
  per_page: 20,
  isReviewsLoaded: false,
  reviews: [],
  dealStatus: {
    0: "Не общались",
    1: "Сделка совершена",
    2: "Сделка сорвалась",
  },
  reviewStatus: {
    0: "On moderation",
    1: "Active",
    2: "Non Active",
  },
  switchers: [
    {
      value: "On moderation",
      text: "On moderation",
      checked: true,
      status: 0,
    },
    {
      value: "Active",
      status: 1,
      text: "Active",
    },
    {
      value: "Non Active",
      status: 2,
      text: "Non Active",
    },
  ],
});
