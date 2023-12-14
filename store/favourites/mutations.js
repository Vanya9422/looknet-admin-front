export default {
  CHANGE_FAVOURITE(state, array) {
    localStorage.setItem('favourites', JSON.stringify(array))
    state.favourites = array
  },
  CHANGE_DELETE_FAVOURITE(state, array) {
    localStorage.setItem('favourites', JSON.stringify(array))
    state.favourites = array
  },
  CHANGE_ALL_FAVOURITE(state){
    // const storage = localStorage.getItem('favourites')
    // if (storage) {
    //   state.favourites = JSON.parse(storage)
    // }
  }
}

