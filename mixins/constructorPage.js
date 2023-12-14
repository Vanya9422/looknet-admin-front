import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      key: 0,
      loading: false,
      id: null,
    }
  },
  computed: {
    ...mapGetters({
      PAGE: 'correctText/PAGE',
      LANG: 'correctText/LANG',
      TYPE: 'correctText/TYPE',
    })
  },
  watch: {
    async LANG(val) {
      await this.getInfo()
    }
  },
  async created() {
    await this.getInfo()
  },
  methods: {
    ...mapActions({
      SAVE_PAGE: 'correctText/SAVE_PAGE'
    }),
    changePage(data) {
      this.id = data.id
      this.content = {
        ...this.content,
        ...JSON.parse(data.content)
      };
    },
    async getInfo() {
      try {
        let page_key = this.PAGE
        if(this.type && this.type !== '') page_key += `-${this.type}`
        const url = this.$getQuery({
          page_key,
          type: this.TYPE
        })
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        const { data } = await this.$axios.$get(`${this.$api.page}?${url}`)
        this.changePage(data)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = true
        this.key++
      }
    },
    save() {
      this.$v.content.$touch()
      if (!this.$v.content.$error) {
        this.SAVE_PAGE({content: this.content, id: this.id, type: this.type || ''})
            .then(({data}) => {
              this.changePage(data)
            })
      }
    }
  }
}
