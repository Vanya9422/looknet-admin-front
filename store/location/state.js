export default () => ({
  location: localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : null,
})


