export default () => ({
  status: 0,
  switchers: [
    {
      value: 'On moderation',
      text: 'On moderation',
      checked: true,
      status: 0,
    },
    {
      value: 'Active',
      status: 1,
      text: 'Active'
    },
    {
      value: 'Non Active',
      status: 3,
      text: 'Non Active'
    }
  ],
  page: 1,
  last_page: 10,
  per_page: 20,
  total: 0,
  checkedAll:false,
  checkedList: [],
  advertises:[],
  banUserId:null,
  activeProductId:null,
})


