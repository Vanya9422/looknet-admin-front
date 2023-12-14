export default {
  data() {
    return {
      sorts: [
        {
          text: 'Older',
          value: 'orderBy=created_at&sortedBy=asc'
        }, {
          text: 'Newest',
          value: 'orderBy=created_at&sortedBy=desc'
        }
      ],
      sort: 'Newest',
    };
  },
  methods: {
    getSort() {
      const sort = this.sorts.find(i => i.text === this.sort)
      return sort.value
    }
  }
}
