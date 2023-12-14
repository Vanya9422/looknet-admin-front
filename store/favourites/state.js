export default  () => ({
  favourites: localStorage.getItem('favourites') || '[]'
})


