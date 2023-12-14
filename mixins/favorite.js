import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      favorites: [],
      favorite: false
    }
  },
  computed: {
    ...mapGetters({
      FAVOURITE: 'favourites/FAVOURITES',
      DETAIL: 'product/DETAIL',
      DETAIL_ACTIVE: 'product/DETAIL_ACTIVE'
    })
  },

  watch: {
    FAVOURITE(val) {
      const getIndex = val.findIndex(i => i === this.id)
      this.favorite = getIndex >= 0
    },
  },
  mounted() {
    if(!this.favorite)  this.favorite = this.isFavorite(this.id)
  },
  methods: {
    ...mapActions({
      SET_ADD_FAVOURITE: 'favourites/SET_ADD_FAVOURITE',
    }),
    isFavorite(id) {
      const storage = localStorage.getItem('favourites') || '[]'
      if (storage) {
        const array = JSON.parse(storage)
        const getIndex = array.findIndex(i => i === id)
        return getIndex >= 0
      } else {
        return false
      }
    },
    addFavorite(id, to) {
      this.favorite = !this.favorite
      this.SET_ADD_FAVOURITE({id, to, auth: this.$auth.loggedIn})
    }
  }
}
